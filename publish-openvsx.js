/* eslint-disable */
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const packageJson = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))
if (!process.env.OPEN_VSX_TOKEN) {
	throw new Error("OPEN_VSX_TOKEN is not defined.")
}
const vsixFileName = `vs-code-extension-${packageJson.version}.vsix`
const vsixFilePath = fileURLToPath(new URL(vsixFileName, import.meta.url))

// Pass the existing token through the environment, never command arguments or logs.
execFileSync("pnpm", ["exec", "ovsx", "publish", vsixFilePath], {
	stdio: "inherit",
	env: { ...process.env, OVSX_PAT: process.env.OPEN_VSX_TOKEN },
})
console.log(`Successfully published ${vsixFileName} to Open VSX Registry.`)
