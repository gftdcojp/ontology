# Independent CI adoption

This repository is registered with Mithril's organization-owned CI controller.
The immutable controller revision, verification scope, runtime readiness and
publication gates are recorded in [independent-actions.json](independent-actions.json).

Use the [organization adoption guide](https://github.com/mithril-lang/.github/blob/cbc4c165c464c8aa7e986b52a87de5df03739f5b/INDEPENDENT_ACTIONS.md).
Check out `mithril-lang/.github` at `cbc4c165c464c8aa7e986b52a87de5df03739f5b` in a separate trusted checkout, then run:

```sh
node /path/to/org-policy/tools/independent-actions/cli.mjs plan --checkout /path/to/this-repo
node /path/to/org-policy/tools/independent-actions/cli.mjs check-adapter --checkout /path/to/this-repo
```

The adapter cannot provide executable shell commands. Review the shared policy
before upgrading its pin. A prepared source profile is limited to its stated
coverage. Runtime-required profiles fail closed until their listed dependencies
and native environments have been qualified. Fund delegates to its existing
signed scheduler and dedicated publishers.

This initial registration does not retire existing workflows or qualify a
production release. Repository-specific signing, native validation, owner,
credentials, rollback and live/installed-client verification remain required.
Adapter validation is not full application CI.
