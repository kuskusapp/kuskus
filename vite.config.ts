import solid from "solid-start/vite"
import { defineConfig } from "vite"
import devtools from "solid-devtools/vite"

export default defineConfig({
  plugins: [
    solid(),
    devtools({
      /* additional options */
      autoname: true, // e.g. enable autoname
      locator: {
        targetIDE: "vscode",
        componentLocation: true,
        jsxLocation: true,
      },
    }),
  ],
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 3000,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})
