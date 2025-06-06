export type PopupSequenceType = {
  id: string
  title: string
  content: React.ReactNode
  duration?: number // Duration in milliseconds before auto-close (0 = no auto-close)
  onClose?: () => void
  customStyles?: React.CSSProperties
}

export type PopupOptions = {
  onComplete?: () => void
  autoAdvance?: boolean // Whether to automatically advance to the next popup
}
