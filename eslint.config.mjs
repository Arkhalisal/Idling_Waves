import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'no-console': [
        'warn',
        { allow: ['error', 'group', 'groupEnd', 'info', 'table', 'warn'] }
      ],
      'no-debugger': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
    plugins: ['simple-import-sort']
  })
]

export default eslintConfig
