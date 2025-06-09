declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    res320: true
    res480: true
    res768: true
    res1024: true
    res1280: true
    res1600: true
    res1920: true
    res3440: true
  }
}

export const commonTheme = {
  typography: {
    fontFamily: 'var(--font-Roboto)'
  },
  breakpoints: {
    values: {
      res320: 320,
      res480: 480,
      res768: 768,
      res1024: 1024,
      res1280: 1280,
      res1600: 1600,
      res1920: 1920,
      res3440: 3440
    }
  }
}
