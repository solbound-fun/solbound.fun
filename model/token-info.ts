export type TokenInfo = {
  prefix: string
  name: string
  ticker: string
  description: string
  uri: string
  twitter: string
  telegram: string
  website: string
  buyAmount: string
  privateKey: string
}

export const DEFAULT_TOKEN_INFO: TokenInfo = {
  prefix: '',
  name: '',
  ticker: '',
  description: '',
  uri: '',
  twitter: '',
  telegram: '',
  website: '',
  buyAmount: '0.0',
  privateKey: '',
}
