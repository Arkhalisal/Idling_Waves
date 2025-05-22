import { Roboto } from 'next/font/google'

const roboto = Roboto({
  display: 'swap',
  fallback: ['Arial'],
  preload: true,
  subsets: ['latin'],
  variable: '--font-Roboto',
  weight: ['300', '400', '500', '700']
})

export { roboto }
