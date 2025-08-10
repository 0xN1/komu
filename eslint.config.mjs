import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unused variable warnings
      "@typescript-eslint/no-unused-vars": "off",
      
      // Disable prefer-const rule
      "prefer-const": "off",
      
      // Disable no-explicit-any rule
      "@typescript-eslint/no-explicit-any": "off",
      
      // Disable alt-text requirement for images
      "jsx-a11y/alt-text": "off"
    }
  }
];

export default eslintConfig;
