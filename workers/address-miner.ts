import { Keypair } from '@solana/web3.js'

self.onmessage = (e: MessageEvent) => {
  const { postfix } = e.data

  while (true) {
    const keypair = Keypair.generate()
    const address = keypair.publicKey.toBase58()

    if (address.endsWith(postfix)) {
      self.postMessage({
        privateKey: Array.from(keypair.secretKey),
        publicKey: address
      })
      break
    }
  }
}