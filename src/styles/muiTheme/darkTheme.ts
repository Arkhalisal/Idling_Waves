'use client'

import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#262525',
      paper: '#323030'
    },
    text: {
      primary: '#ffffff'
    },
    primary: {
      main: '#d43e26'
    },
    custom: {
      active: '#050101',
      background: '#262525' // Optional background color for custom elements
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#cccccc'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #d43e26',
          ':hover': {
            backgroundColor: '#323030'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #d43e26',
          borderRight: '1px solid #d43e26',
          ':hover': {
            backgroundColor: '#323030'
          }
        }
      }
    }
  }
})

export default darkTheme
