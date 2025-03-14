import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "@tanstack/react-start/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
    ],
  },
  react: {
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
          {
            target: "19",
          },
        ],
      ],
    },
  },
  tsr: {
    // https://github.com/TanStack/router/discussions/2863#discussioncomment-12458714
    appDirectory: "./src",
    customScaffolding: {
      routeTemplate: [
        "%%tsrImports%%",
        "\n\n",
        "function RouteComponent() { return <></> };\n\n",
        "%%tsrExportStart%%{\n component: RouteComponent\n }%%tsrExportEnd%%\n",
      ].join(""),
    },
  },
  server: {
    // https://tanstack.com/start/latest/docs/framework/react/hosting#deployment
    preset: "vercel",
  },
})
