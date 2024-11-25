import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';


export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs['recommended-flat'],
  tseslint.configs.base,

  {
    name:     'general',
    files:    ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-prototype-builtins': ['off'],
      'no-useless-escape':     ['off'],
      'no-unused-vars':        ['error', {
        'destructuredArrayIgnorePattern': '^_',
      }],

      'react/react-in-jsx-scope': ['off'],
      'react/prop-types':         ['off'],

      '@stylistic/semi':                    ['error', 'always'],
      '@stylistic/key-spacing':             ['error', { align: 'value', mode: 'minimum' }],
      '@stylistic/quote-props':             ['error', 'consistent'],
      '@stylistic/brace-style':             ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/no-multi-spaces':         ['off'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    },
  },

  {
    name:  'typescript',
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      ...tseslint.configs.eslintRecommended.rules,
      '@typescript-eslint/ban-ts-comment':                      'error',
      'no-array-constructor':                                   'off',
      '@typescript-eslint/no-array-constructor':                'error',
      '@typescript-eslint/no-duplicate-enum-values':            'error',
      '@typescript-eslint/no-empty-object-type':                'error',
      '@typescript-eslint/no-explicit-any':                     'off',
      '@typescript-eslint/no-extra-non-null-assertion':         'error',
      '@typescript-eslint/no-misused-new':                      'error',
      '@typescript-eslint/no-namespace':                        'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-require-imports':                  'error',
      '@typescript-eslint/no-this-alias':                       'error',
      '@typescript-eslint/no-unnecessary-type-constraint':      'error',
      '@typescript-eslint/no-unsafe-declaration-merging':       'error',
      '@typescript-eslint/no-unsafe-function-type':             'error',
      'no-unused-expressions':                                  'off',
      '@typescript-eslint/no-unused-expressions':               'error',
      'no-unused-vars':                                         'off',
      '@typescript-eslint/no-unused-vars':                      'error',
      '@typescript-eslint/no-wrapper-object-types':             'error',
      '@typescript-eslint/prefer-as-const':                     'error',
      '@typescript-eslint/prefer-namespace-keyword':            'error',
      '@typescript-eslint/triple-slash-reference':              'error',
    },
  },
];


// recommended format rules from eslint "stylistic" plugin is added to main config above (stylistic.configs['recommended-flat'])
// and printed below just to make it easier to understand what rules are currently in use and how to override them
// severities: off | warning | error
/*
{
  '@stylistic/indent': [
    'error',
    2,
    {
      ArrayExpression:        1,
      CallExpression:         { arguments: 1 },
      flatTernaryExpressions: false,
      FunctionDeclaration:    { body: 1, parameters: 1 },
      FunctionExpression:     { body: 1, parameters: 1 },
      ignoreComments:         false,
      ignoredNodes:           [
        'TSUnionType',
        'TSIntersectionType',
        'TSTypeParameterInstantiation',
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
      ],
      ImportDeclaration:        1,
      MemberExpression:         1,
      ObjectExpression:         1,
      offsetTernaryExpressions: true,
      outerIIFEBody:            1,
      SwitchCase:               1,
      VariableDeclarator:       1,
    },
  ],
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline:          { delimiter: 'none', requireLast: false },
      multilineDetection: 'brackets',
      overrides:          { interface: { multiline: { delimiter: 'none', requireLast: false } } },
      singleline:         { delimiter: 'comma' },
    },
  ],
  '@stylistic/no-mixed-operators': [
    'error',
    {
      allowSamePrecedence: true,
      groups:              [
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof'],
      ],
    },
  ],
  '@stylistic/spaced-comment': [
    'error',
    'always',
    {
      block: { balanced: true, exceptions: ['*'], markers: ['!'] },
      line:  { exceptions: ['/', '#'], markers: ['/'] },
    },
  ],
  '@stylistic/array-bracket-spacing':         ['error', 'never'],
  '@stylistic/arrow-parens':                  ['error', 'as-needed', { requireForBlockBody: true }],
  '@stylistic/arrow-spacing':                 ['error', { after: true, before: true }],
  '@stylistic/block-spacing':                 ['error', 'always'],
  '@stylistic/brace-style':                   ['error', 'stroustrup', { allowSingleLine: true }],
  '@stylistic/comma-dangle':                  ['error', 'always-multiline'],
  '@stylistic/comma-spacing':                 ['error', { after: true, before: false }],
  '@stylistic/comma-style':                   ['error', 'last'],
  '@stylistic/computed-property-spacing':     ['error', 'never', { enforceForClassMembers: true }],
  '@stylistic/dot-location':                  ['error', 'property'],
  '@stylistic/eol-last':                      ['error'],
  '@stylistic/indent-binary-ops':             ['error', 2],
  '@stylistic/key-spacing':                   ['error', { afterColon: true, beforeColon: false }],
  '@stylistic/keyword-spacing':               ['error', { after: true, before: true }],
  '@stylistic/lines-between-class-members':   ['error', 'always', { exceptAfterSingleLine: true }],
  '@stylistic/max-statements-per-line':       ['error', { max: 1 }],
  '@stylistic/multiline-ternary':             ['error', 'always-multiline'],
  '@stylistic/new-parens':                    ['error'],
  '@stylistic/no-extra-parens':               ['error', 'functions'],
  '@stylistic/no-floating-decimal':           ['error'],
  '@stylistic/no-mixed-spaces-and-tabs':      ['error'],
  '@stylistic/no-multi-spaces':               ['error'],
  '@stylistic/no-multiple-empty-lines':       ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
  '@stylistic/no-tabs':                       ['error'],
  '@stylistic/no-trailing-spaces':            ['error'],
  '@stylistic/no-whitespace-before-property': ['error'],
  '@stylistic/object-curly-spacing':          ['error', 'always'],
  '@stylistic/operator-linebreak':            ['error', 'before'],
  '@stylistic/padded-blocks':                 ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
  '@stylistic/quote-props':                   ['error', 'consistent-as-needed'],
  '@stylistic/quotes':                        ['error', 'single', { allowTemplateLiterals: true, avoidEscape: false }],
  '@stylistic/rest-spread-spacing':           ['error', 'never'],
  '@stylistic/semi':                          ['error', 'never'],
  '@stylistic/semi-spacing':                  ['error', { after: true, before: false }],
  '@stylistic/space-before-blocks':           ['error', 'always'],
  '@stylistic/space-before-function-paren':   ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
  '@stylistic/space-in-parens':               ['error', 'never'],
  '@stylistic/space-infix-ops':               ['error'],
  '@stylistic/space-unary-ops':               ['error', { nonwords: false, words: true }],
  '@stylistic/template-curly-spacing':        ['error'],
  '@stylistic/template-tag-spacing':          ['error', 'never'],
  '@stylistic/type-annotation-spacing':       ['error', {}],
  '@stylistic/type-generic-spacing':          ['error'],
  '@stylistic/type-named-tuple-spacing':      ['error'],
  '@stylistic/wrap-iife':                     ['error', 'any', { functionPrototypeMethods: true }],
  '@stylistic/yield-star-spacing':            ['error', 'both'],
  '@stylistic/jsx-closing-bracket-location':  ['error'],
  '@stylistic/jsx-closing-tag-location':      ['error'],
  '@stylistic/jsx-curly-brace-presence':      ['error', { propElementValues: 'always' }],
  '@stylistic/jsx-curly-newline':             ['error'],
  '@stylistic/jsx-curly-spacing':             ['error', 'never'],
  '@stylistic/jsx-equals-spacing':            ['error'],
  '@stylistic/jsx-first-prop-new-line':       ['error'],
  '@stylistic/jsx-function-call-newline':     ['error', 'multiline'],
  '@stylistic/jsx-indent-props':              ['error', 2],
  '@stylistic/jsx-max-props-per-line':        ['error', { maximum: 1, when: 'multiline' }],
  '@stylistic/jsx-one-expression-per-line':   ['error', { allow: 'single-child' }],
  '@stylistic/jsx-quotes':                    ['error'],
  '@stylistic/jsx-tag-spacing':               ['error', { afterOpening: 'never', beforeClosing: 'never', beforeSelfClosing: 'always', closingSlash: 'never' }],
  '@stylistic/jsx-wrap-multilines':           [
    'error',
    {
      arrow:         'parens-new-line',
      assignment:    'parens-new-line',
      condition:     'parens-new-line',
      declaration:   'parens-new-line',
      logical:       'parens-new-line',
      prop:          'parens-new-line',
      propertyValue: 'parens-new-line',
      return:        'parens-new-line',
    },
  ],
}
*/
