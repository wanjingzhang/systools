import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { readFileSync } from "fs";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript";
import pkg from "./package.json";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));
const pkgName = packageJson.umdModuleName;

export default [
  // UMD for browser-friendly build
  {
    input: "src/index.ts",
    output: {
      name: "ktools",
      file: pkg.browser,
      format: "umd",
      exports: "auto",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: "src/index.ts",
    external: ["ms"],
    plugins: [typescript()],
    output: [
      { file: pkg.main, format: "cjs", exports: "auto" },
      { file: pkg.module, format: "es", exports: "auto" },
    ],
  },
];
