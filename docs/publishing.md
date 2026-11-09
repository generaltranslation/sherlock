# Publishing Sherlock

The extension identity remains `inlang.vs-code-extension`. Do not change the
`publisher` or `name` in `package.json`, or create a replacement extension.

General Translation owns the repository. Ernest McCarter owns the existing
Marketplace publisher and GitHub user `eoinest` owns the verified Open VSX
`inlang` namespace, with the Eclipse Publisher Agreement signed.

Both registries trust this exact GitHub Actions identity:

- Repository: `generaltranslation/sherlock`
- Workflow: `publish-ide-extension.yml`
- GitHub environment: `publishing` (deployment branches restricted to `main`)
- Extension: `inlang.vs-code-extension`

The workflow requests GitHub OIDC credentials with `id-token: write`. Marketplace
uses the lockfile-pinned `@vscode/vsce` 4.1.0 and `--oidc`. Open VSX uses pinned
`ovsx` 1.4.0 and `--trusted-publishing`. Neither registry requires a stored PAT.
The Open VSX wrapper rejects legacy token environment variables so they cannot
override trusted publishing.

`scripts/verify-publishing.mjs` reuses the pinned clients' token exchanges without
uploading a VSIX, storing credentials, or printing their values. Run the workflow
manually with its default `publish=false` to verify both registry identities,
build, test, and package without releasing. Set `publish=true` only when an actual
release to both registries is intended. Existing automatic publishing on a push
changing `package.json` on `main` is retained.

Marketplace trusted-publishing policies are managed by the publisher's Owners.
Open VSX registrations are tied to their creator's namespace Owner role. Retain
`eoinest` as an Owner or recreate its registration under a replacement buyer Owner
before removing that account. Workflow, repository, or environment renames require
updating registry trust settings.
