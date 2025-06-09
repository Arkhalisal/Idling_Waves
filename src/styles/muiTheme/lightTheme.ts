'use client'

import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#000000'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #1976d2',
          ':hover': {
            backgroundColor: '#e3f2fd'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1976d2',
          borderRight: '1px solid #1976d2',
          ':hover': {
            backgroundColor: '#e3f2fd'
          }
        }
      }
    }
  }
})

export default lightTheme
