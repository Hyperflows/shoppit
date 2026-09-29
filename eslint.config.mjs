import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['**/node_modules/**', '**/.next/**', '**/.expo/**', '**/dist/**', '**/next-env.d.ts'] },
  ...tseslint.configs.recommended,
);
