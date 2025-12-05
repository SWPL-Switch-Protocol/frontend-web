import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars from .env files (uses dotenv internally)
  const env = loadEnv(mode, process.cwd(), "");

  const base = env.BASE_PATH || "/";
  const isPreview = env.IS_PREVIEW ? true : false;

  return {
    define: {
      __BASE_PATH__: JSON.stringify(base),
      __IS_PREVIEW__: JSON.stringify(isPreview),
      __READDY_PROJECT_ID__: JSON.stringify(env.PROJECT_ID || ""),
      __READDY_VERSION_ID__: JSON.stringify(env.VERSION_ID || ""),
      // Expose WEB3AUTH_CLIENT_ID to client code
      "import.meta.env.WEB3AUTH_CLIENT_ID": JSON.stringify(
        env.WEB3AUTH_CLIENT_ID || ""
      ),
    },
    plugins: [
      react(),
      nodePolyfills({
        // polyfill Node globals & modules used by web3auth deps (bn.js, elliptic, etc.)
        globals: {
          Buffer: true,
          process: true,
        },
        protocolImports: true,
      }),
      AutoImport({
        imports: [
          {
            react: [
              "React",
              "useState",
              "useEffect",
              "useContext",
              "useReducer",
              "useCallback",
              "useMemo",
              "useRef",
              "useImperativeHandle",
              "useLayoutEffect",
              "useDebugValue",
              "useDeferredValue",
              "useId",
              "useInsertionEffect",
              "useSyncExternalStore",
              "useTransition",
              "startTransition",
              "lazy",
              "memo",
              "forwardRef",
              "createContext",
              "createElement",
              "cloneElement",
              "isValidElement",
            ],
          },
          {
            "react-router-dom": [
              "useNavigate",
              "useLocation",
              "useParams",
              "useSearchParams",
              "Link",
              "NavLink",
              "Navigate",
              "Outlet",
            ],
          },
          // React i18n
          {
            "react-i18next": ["useTranslation", "Trans"],
          },
        ],
        dts: true,
      }),
    ],
    base,
    build: {
      sourcemap: true,
      outDir: "out",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        // Ensure a single React instance is used everywhere (avoid invalid hook call)
        react: resolve(__dirname, "node_modules/react"),
        "react-dom": resolve(__dirname, "node_modules/react-dom"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});
