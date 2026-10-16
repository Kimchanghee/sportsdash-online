# Isolated publisher rehearsal

Run `node --test tests/dryrun-stage.test.mjs` for the positive, source-invalid, and built-output-invalid cases. The existing marked `_examples/pass-example.md` and its evidence/image are reused, not presented as eligible real products.

`scripts/dryrun-fixture.ps1` stages in a unique OS temporary directory. Direct `publish.ps1 -DryRun` also delegates to isolated staging. No cleanup rebuild runs in the real checkout. Source/public/dist/ops/content are SHA-256 compared before and after both success and failure; the sandbox is deleted in `finally`. Existing production and dryrun logs remain unchanged. Test receipts exist only inside the disposable sandbox and are explicitly not publication evidence.

No `.git`, `.env`, Wrangler config, production dist, or account credentials are copied. A NONDEPLOYABLE directory name, marker and warning file identify staged output. The publisher refuses deployment from a marked sandbox even with `-AllowDeploy`; the harness tests that denial. Production deploy remains opt-in and rejects fixture markers in any top-level buildable post. The fixture runner does not invoke accounts, remote URLs, IndexNow, deployment, or scheduling. Local preview requests use loopback only. Installed node_modules are shared through a junction; source/release trees are copied, never linked.

This verifies local publisher mechanics, not commercial eligibility. A schema-valid evidence note and caller-asserted image rights do not independently establish exact product/option/link identity, affiliate destination approval, license/rights, editorial approval, or public publication. Those remain manual production gates. This change does not add trusted approvals or relax existing source/built gates. A local successful receipt must never be reported as public publishing readiness.

The sandbox is an accidental-deployment guard for these scripts, not an OS security boundary against a hostile operator who manually copies output or bypasses the publisher. No fixture output is retained as a release artifact.
