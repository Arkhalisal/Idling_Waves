'use client'

import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#262525'
    },
    text: {
      primary: '#ffffff'
    },
    primary: {
      main: '#d43e26'
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
