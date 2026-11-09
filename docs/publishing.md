# Publishing Sherlock

The extension identity remains `inlang.vs-code-extension`. Do not change the
`publisher` or `name` in `package.json`, or create a replacement extension.

## Visual Studio Marketplace

General Translation owns the repository and Ernest McCarter is an Owner of the
existing `inlang` publisher. Marketplace trusted publishing is registered for:

- Repository: `generaltranslation/sherlock`
- Workflow: `publish-ide-extension.yml`
- GitHub environment: `publishing` (deployment branches restricted to `main`)

The workflow requests GitHub OIDC credentials with `id-token: write` and uses the
lockfile-pinned `@vscode/vsce` 4.1.0 with `--oidc`. A Marketplace PAT is not needed.
The script `scripts/verify-marketplace-publishing.mjs` reuses that client's token
exchange without publishing, storing, or printing the returned credential.

Run the workflow manually with its default `publish=false` to verify authentication,
build, test, and package without releasing. Set `publish=true` only when an actual
release to both registries is intended. Existing automatic publishing on a push
changing `package.json` on `main` is retained.

## Open VSX — ownership migration pending

The existing Open VSX publishing path still uses `OPEN_VSX_TOKEN`. Its value is
passed only through the child process environment; it is never interpolated into
commands or logged. This credential is not confirmed as General Translation-owned.

Before migrating to trusted publishing, an existing `inlang` namespace Owner must
add `eoinest` as Owner, and `eoinest` must complete the Eclipse Publisher Agreement.
Then register the existing extension with the same repository/workflow/environment
above, replace the PAT path with `ovsx publish --trusted-publishing` using a pinned
compatible ovsx release, verify its exchange, and remove the old repository secret.
Remove `samuelstroschein` from the namespace only after buyer Owner access is verified.
The existing extension stays available while this work is pending.
