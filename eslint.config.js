import expoConfig from "eslint-config-expo/flat";
import { defineConfig } from "eslint/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  ...expoConfig,
  {
    ignores: ["dist/*"],
    plugins: ["import"],
    rules: {
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", path.resolve(__dirname, "src")],
            ["@app", path.resolve(__dirname, "app")],
            ["@assets", path.resolve(__dirname, "assets")],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {},
      },
    },
  },
]);
