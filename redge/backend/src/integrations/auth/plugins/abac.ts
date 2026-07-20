import type { BetterAuthPlugin } from 'better-auth';

export const abacPlugin = () =>
  ({
    id: 'abacPlugin',
  }) satisfies BetterAuthPlugin;
