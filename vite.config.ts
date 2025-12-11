import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars from .env files (uses dotenv internally)
  const env = loadEnv(mode, process.cwd(), "");

  const base = env.BASE_PATH || "/";
  const isPreview = env.IS_PREVIEW ? true : false;

  return {
    define: {
      global: "globalThis",
      __BASE_PATH__: JSON.stringify(base),
      __IS_PREVIEW__: JSON.stringify(isPreview),
      __READDY_PROJECT_ID__: JSON.stringify(env.PROJECT_ID || ""),
      __READDY_VERSION_ID__: JSON.stringify(env.VERSION_ID || ""),
      // Expose WEB3AUTH_CLIENT_ID to client code
      "import.meta.env.WEB3AUTH_CLIENT_ID": JSON.stringify(
        env.WEB3AUTH_CLIENT_ID || ""
      ),
      // Expose SCAN_URL to client code
      "import.meta.env.SCAN_URL": JSON.stringify(env.SCAN_URL || ""),
    },
    plugins: [react()],
    base,
    build: {
      sourcemap: true,
      outDir: "out",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      allowedHosts: ["dev.switchprotocol.io"],
      proxy: {
        "/api": {
          target: env.SBT_API_URL || "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
