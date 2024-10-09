import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs.customize({
    '@stylistic/indent': ['warn', 4],
    '@stylistic/comma-dangle': ['error', 'only-multiline'],
    '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'jsx': true,
  }),
]
