export const CARD_STATUS = {
  CLOSED: 'closed',
  OPENED: 'opened',
  MATCHED: 'matched',
} as const

export type CardStatus = (typeof CARD_STATUS)[keyof typeof CARD_STATUS]
