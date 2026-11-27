// Provided at build time by scripts/vite-content-plugin.mjs; typed in lib/content.ts.
declare module 'virtual:content' {
  export const notes: unknown[];
  export const problems: unknown[];
  export const noteLoaders: Record<string, () => Promise<{ default: unknown }>>;
  export const problemLoaders: Record<string, () => Promise<{ default: unknown }>>;
  export const pageLoaders: Record<string, () => Promise<{ default: unknown }>>;
}
