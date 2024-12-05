export type TokenInfo = {
  postfix: string
  name: string
  ticker: string
  description: string
  uri: string
  twitter: string
  telegram: string
  website: string
  buyAmount: string
  privateKey?: string
}

export const DEFAULT_TOKEN_INFO: TokenInfo = {
  postfix: '',
  name: '',
  ticker: '',
  description: '',
  uri: '',
  twitter: '',
  telegram: '',
  website: '',
  buyAmount: '0.0',
}
