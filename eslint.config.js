import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

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
        project: "./tsconfig.eslint.json",
      },
    },
  }
);
