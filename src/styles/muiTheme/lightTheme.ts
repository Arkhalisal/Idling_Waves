'use client'

import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff', // Default background color
      paper: '#f5f5f5' // Paper background color
    },
    text: {
      primary: '#000000'
    },
    primary: {
      main: '#1976d2' // Primary color for buttons and links
    },
    custom: {
      active: '#c8faf7', // Active color for custom elements
      background: '#ffffff' // Background color for custom elements
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
