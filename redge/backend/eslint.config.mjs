import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...nx.configs['typescript'],
  ...baseConfig,
  {
    // Override or add rules here
    rules: {},
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  },
];
