import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { ThemeType } from '@/constants/theme'
import darkTheme from '@/styles/muiTheme/darkTheme'
import lightTheme from '@/styles/muiTheme/lightTheme'
import { createStrictContext } from '@/util/context/createStrictContext'

const [ContextProvider, useThemeSettingContext] =
  createStrictContext<ThemeSettingContextProps>('ThemeSettingContext')

export { useThemeSettingContext }

const ThemeSettingProvider = ({ children }: ThemeSettingProviderProps) => {
  const [theme, setTheme] = useState(lightTheme)

  const getThemeByType = useCallback((themeType: string): Theme => {
    switch (themeType) {
      case ThemeType.LIGHT:
        return lightTheme
      case ThemeType.DARK:
        return darkTheme
      default:
        console.warn(`Theme "${themeType}" not recognized, using light theme.`)
        return lightTheme
    }
  }, [])

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || ThemeType.LIGHT
    const initialTheme = getThemeByType(storedTheme)
    setTheme(initialTheme)
  }, [getThemeByType])

  const handleThemeChange = (incomeTheme: string) => {
    const theme = getThemeByType(incomeTheme)

    localStorage.setItem('theme', incomeTheme)

    setTheme(theme)
  }

  return (
    <ContextProvider value={{ theme, handleThemeChange }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ContextProvider>
  )
}

type ThemeSettingContextProps = {
  theme: Theme
  handleThemeChange: (incomeTheme: string) => void
}

type ThemeSettingProviderProps = {
  children: React.ReactNode
}

export default ThemeSettingProvider
