import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "path";

const eslintTsconfigDir = path.resolve(
  import.meta.dirname,
  "tsconfig.eslint.json"
);

export default tseslint.config(
  {files: ["src/**/*.{js,jsx}"]},
  eslint.configs.recommended,
  {files: ["src/**/*.{ts,tsx}"]},
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: eslintTsconfigDir,
        tsconfigRootDir: eslintTsconfigDir,
      },
    },
  }
);
