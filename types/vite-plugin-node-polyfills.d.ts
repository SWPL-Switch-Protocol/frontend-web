declare module "vite-plugin-node-polyfills" {
  import type { Plugin } from "vite";

  interface NodePolyfillsOptions {
    globals?: {
      Buffer?: boolean;
      process?: boolean;
    };
    protocolImports?: boolean;
  }

  export function nodePolyfills(options?: NodePolyfillsOptions): Plugin;
}


