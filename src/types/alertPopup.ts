import { AlertColor } from '@mui/material'
import { ReactNode } from 'react'

export type AlertInputType = {
  content: ReactNode
  variant?: AlertColor
  timeout?: number
}

export type AlertItemType = {
  id: string
  content: ReactNode
  variant?: AlertColor
  timeout?: number
}
