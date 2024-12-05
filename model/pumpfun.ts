import {
  Commitment,
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from '@solana/web3.js'
import { Program, Provider } from '@coral-xyz/anchor'
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import { BN } from 'bn.js'
import {
  calculateWithSlippageBuy,
  DEFAULT_COMMITMENT,
  GlobalAccount,
} from 'pumpdotfun-sdk'

import { CreateTokenMetadata, PriorityFee } from './types'
import { IDL, PumpFun } from './IDL'

import { FEE_PERCENT, FEE_RECIPIENT } from '@/constants/fee'
import { applyPercent } from '@/utils/bigint'

const PROGRAM_ID = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
const MPL_TOKEN_METADATA_PROGRAM_ID =
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'

export const GLOBAL_ACCOUNT_SEED = 'global'
export const BONDING_CURVE_SEED = 'bonding-curve'
export const METADATA_SEED = 'metadata'

export class PumpFunSDK {
  public program: Program<PumpFun>
  public connection: Connection
  constructor(provider?: Provider) {
    this.program = new Program<PumpFun>(IDL as PumpFun, provider)
    this.connection = this.program.provider.connection
  }

  async createAndBuy(
    creator: PublicKey,
    mint: Keypair,
    createTokenMetadata: CreateTokenMetadata,
    buyAmountSol: bigint,
    slippageBasisPoints: bigint = 500n,
    priorityFees?: PriorityFee,
    commitment: Commitment = DEFAULT_COMMITMENT,
    feePercent: number = FEE_PERCENT,
  ): Promise<Transaction> {
    const tokenMetadata = await this.createTokenMetadata(createTokenMetadata)
    const createTx = await this.getCreateInstructions(
      creator,
      createTokenMetadata.name,
      createTokenMetadata.symbol,
      tokenMetadata.metadataUri,
      mint,
    )

    const newTx = new Transaction().add(createTx)
    if (buyAmountSol > 0) {
      const globalAccount = await this.getGlobalAccount(commitment)
      const buyAmount = globalAccount.getInitialBuyPrice(buyAmountSol)
      const buyAmountWithSlippage = calculateWithSlippageBuy(
        buyAmountSol,
        slippageBasisPoints,
      )
      const buyTx = await this.getBuyInstructions(
        creator,
        mint.publicKey,
        globalAccount.feeRecipient,
        buyAmount,
        buyAmountWithSlippage,
      )
      newTx.add(buyTx)

      const feeAmount = applyPercent(buyAmount, feePercent)
      if (feeAmount > 0n) {
        const [associatedSender, associatedReceiver] = await Promise.all([
          getAssociatedTokenAddress(mint.publicKey, creator, false),
          getAssociatedTokenAddress(
            mint.publicKey,
            new PublicKey(FEE_RECIPIENT),
            false,
          ),
        ])

        newTx.add(
          createAssociatedTokenAccountInstruction(
            creator,
            associatedReceiver,
            new PublicKey(FEE_RECIPIENT),
            mint.publicKey,
          ),
        )
        newTx.add(
          createTransferInstruction(
            associatedSender,
            associatedReceiver,
            creator,
            feeAmount,
          ),
        )
      }
    }

    newTx.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 30000000,
      }),
    )

    return newTx
  }

  //create token instructions
  async getCreateInstructions(
    creator: PublicKey,
    name: string,
    symbol: string,
    uri: string,
    mint: Keypair,
  ) {
    const mplTokenMetadata = new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)

    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(METADATA_SEED),
        mplTokenMetadata.toBuffer(),
        mint.publicKey.toBuffer(),
      ],
      mplTokenMetadata,
    )

    const associatedBondingCurve = await getAssociatedTokenAddress(
      mint.publicKey,
      this.getBondingCurvePDA(mint.publicKey),
      true,
    )

    return this.program.methods
      .create(name, symbol, uri)
      .accounts({
        mint: mint.publicKey,
        associatedBondingCurve: associatedBondingCurve,
        metadata: metadataPDA,
        user: creator,
      })
      .signers([mint])
      .transaction()
  }

  //buy
  async getBuyInstructions(
    buyer: PublicKey,
    mint: PublicKey,
    feeRecipient: PublicKey,
    amount: bigint,
    solAmount: bigint,
    commitment: Commitment = DEFAULT_COMMITMENT,
  ) {
    const associatedBondingCurve = await getAssociatedTokenAddress(
      mint,
      this.getBondingCurvePDA(mint),
      true,
    )

    const associatedUser = await getAssociatedTokenAddress(mint, buyer, false)

    const transaction = new Transaction()

    try {
      await getAccount(this.connection, associatedUser, commitment)
    } catch (e) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          buyer,
          associatedUser,
          buyer,
          mint,
        ),
      )
    }

    transaction.add(
      await this.program.methods
        .buy(new BN(amount.toString()), new BN(solAmount.toString()))
        .accounts({
          feeRecipient: feeRecipient,
          mint: mint,
          associatedBondingCurve: associatedBondingCurve,
          associatedUser: associatedUser,
          user: buyer,
        })
        .transaction(),
    )

    return transaction
  }

  async getGlobalAccount(commitment: Commitment = DEFAULT_COMMITMENT) {
    const [globalAccountPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from(GLOBAL_ACCOUNT_SEED)],
      new PublicKey(PROGRAM_ID),
    )

    const tokenAccount = await this.connection.getAccountInfo(
      globalAccountPDA,
      commitment,
    )

    return GlobalAccount.fromBuffer(tokenAccount!.data as Buffer)
  }

  getBondingCurvePDA(mint: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(BONDING_CURVE_SEED), mint.toBuffer()],
      this.program.programId,
    )[0]
  }

  async createTokenMetadata(create: CreateTokenMetadata) {
    const formData = new FormData()
    formData.append('file', create.file)
    formData.append('name', create.name)
    formData.append('symbol', create.symbol)
    formData.append('description', create.description)
    formData.append('twitter', create.twitter || '')
    formData.append('telegram', create.telegram || '')
    formData.append('website', create.website || '')
    formData.append('showName', 'true')
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const { data } = (await response.json()) as {
      data: {
        metadataUri: string
        metadata: {
          createdOn: string
          description: string
          image: string
          name: string
          showName: boolean
          symbol: string
        }
      }
    }
    return data
  }
}
