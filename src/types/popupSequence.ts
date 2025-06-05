export type PopupSequenceType = {
  id: string
  title?: string
  content: React.ReactNode
  duration?: number // Duration in milliseconds before auto-close (0 = no auto-close)
  showCloseButton?: boolean
  onClose?: () => void
  customStyles?: React.CSSProperties
}
