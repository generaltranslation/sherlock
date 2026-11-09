import { readFile } from "node:fs/promises"
import { getOIDCCredential } from "@vscode/vsce/out/oidc.js"

const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"))
if (`${manifest.publisher}.${manifest.name}` !== "inlang.vs-code-extension") {
	throw new Error("Publishing identity must remain inlang.vs-code-extension")
}

// Reuse the pinned publishing client's real exchange, without uploading a VSIX.
// The short-lived credential stays in memory and is never printed or stored.
await getOIDCCredential(manifest.publisher)
console.log("Marketplace trusted-publishing token exchange passed for inlang.vs-code-extension; no extension was published.")
