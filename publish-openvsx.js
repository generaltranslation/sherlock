/* eslint-disable */
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const packageJson = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))
if (`${packageJson.publisher}.${packageJson.name}` !== "inlang.vs-code-extension") {
	throw new Error("Publishing identity must remain inlang.vs-code-extension")
}
if (process.env.OPEN_VSX_TOKEN || process.env.OVSX_PAT) {
	throw new Error("Remove legacy Open VSX tokens; this workflow requires trusted publishing.")
}
const vsixFileName = `vs-code-extension-${packageJson.version}.vsix`
const vsixFilePath = fileURLToPath(new URL(vsixFileName, import.meta.url))

// Require the buyer workflow identity, with no stored-token fallback.
execFileSync("pnpm", ["exec", "ovsx", "publish", vsixFilePath, "--trusted-publishing"], {
	stdio: "inherit",
})
console.log(`Successfully published ${vsixFileName} to Open VSX Registry.`)
