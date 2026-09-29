# Shoppit Engineering Rules

1. Implement only the requested build phase. Do not add speculative features.
2. Mobile-first, production-shaped code. TypeScript everywhere practical.
3. Preserve working behavior. Refactor only when required for the task.
4. Never hardcode secrets, credentials or production IDs.
5. Database changes require migrations.
6. Enforce authorization server-side, not only in UI.
7. Tracking and billing writes must be idempotent and auditable.
8. Ranking weights must be configurable server-side.
9. Run lint, typecheck and tests before declaring a task complete.
10. For UI changes, verify iPhone-sized and Android-sized layouts.
11. Do not implement paid ranking in MVP.
12. Do not add native checkout. Shoppit remains discovery/referral.
13. If a requirement conflicts with BUILD.md, stop and explain the conflict before changing scope.
14. Prefer small, reviewable commits and document architectural decisions.
