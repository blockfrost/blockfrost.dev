---
title: Personal Access Tokens
id: personal-access-tokens
---

Personal Access Tokens (PATs) authenticate requests to the [Blockfrost Dashboard API](https://docs.blockfrost.io/dashboard-api/), which exposes the same account, workspace, project, and webhook management you get in the Dashboard UI. Use a PAT to manage Blockfrost resources from Terraform, CI/CD pipelines, command-line tools, or your own backend, without anyone having to log in through a browser.

## Creating a Personal Access Token

1. Sign in to the [Blockfrost Dashboard](https://blockfrost.io/dashboard) and open **Settings → Personal Access Tokens**.
2. Click **Create token**. The dialog asks for three things: a **name**, a **permission set**, and a **workspace selector**.
3. **Name.** A free-form label such as `terraform-prod` or `ci-deploy`. It only shows up in the token list and has no effect on what the token can do. Blockfrost generates the bearer secret for you.
4. **Permissions.** Pick one of the presets (see [below](#permission-presets)) or choose **Custom** to assemble scopes yourself. The picker shows exactly which scopes the token will carry. Implied read scopes (for example `webhooks:read` when you select `webhooks:write`) are added and locked automatically.
5. **Workspaces.** Choose **All workspaces** (the token covers every workspace you belong to, including ones you join later) or **Selected only** (you pick the workspaces explicitly). See [Workspace selector](#workspace-selector) for the trade-offs.
6. Click **Create**. The dashboard generates the token and shows the bearer secret **once**, in a copy-to-clipboard dialog.

:::caution Save the secret immediately
The bearer secret is shown only when you create the token. Blockfrost stores just a hash of it, so we can't recover it or show it again. Copy it into a password manager or secrets vault before you close the dialog. If you lose it, your only option is to [rotate](#rotation) the token to a new secret.
:::

## Token format

PAT bearer secrets start with the prefix `bfm_live_`, which makes leaked tokens easy for secret-scanning tools to spot. Treat the rest of the string as opaque.

## Making a request

Send the full token as a bearer credential on every request. The API base URL is `https://dashboard.blockfrost.io/api/v1`:

```bash
curl https://dashboard.blockfrost.io/api/v1/account \
  -H "Authorization: Bearer bfm_live_..."
```

```json
{
  "id": "8a4359a3-3c53-4688-bfa9-507aaa249937",
  "email": "alice@example.com",
  "name": "Alice Doe",
  "has_pending_deletion": false
}
```

## Permissions

A PAT carries an explicit list of **scopes** that control what it can do. Scopes are grouped by resource.

### Account & billing

| Scope               | What it grants                                                                 |
| ------------------- | ------------------------------------------------------------------------------ |
| `account:read`      | View account profile, plan, and quota snapshot.                                |
| `invoices:read`     | View the unified invoice ledger (Stripe invoices and PAYG orders).             |
| `payg:read`         | View PAYG order history and individual order details.                          |
| `payg:write`        | Request order quotes, place top-up orders, cancel orders. Implies `payg:read`. |
| `workspaces:create` | Create new workspaces under this account.                                      |

### Workspaces

| Scope              | What it grants                                          |
| ------------------ | ------------------------------------------------------- |
| `workspace:read`   | View basic workspace info (name, owner, creation date). |
| `workspace:write`  | Rename a workspace. Implies `workspace:read`.           |
| `workspace:delete` | Delete an empty workspace. Implies `workspace:read`.    |
| `members:read`     | List workspace members and their roles.                 |

### Projects

| Scope                    | What it grants                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `projects:read`          | List projects, view project details, stats, and change history.                                                                     |
| `projects:write`         | Create projects and rename existing ones. Implies `projects:read`.                                                                  |
| `projects:delete`        | Delete projects. Implies `projects:read`.                                                                                           |
| `project_settings:read`  | View project IP, origin, and endpoint access filters.                                                                               |
| `project_settings:write` | Modify project access filters (requires a **DEVELOPER** or **ENTERPRISE** plan, or any PAYG account). Implies `project_settings:read`. |

### Webhooks

| Scope             | What it grants                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `webhooks:read`   | List webhooks, view webhook details, view delivery history.                                    |
| `webhooks:write`  | Create webhooks and update existing ones. Implies `webhooks:read`.                             |
| `webhooks:delete` | Delete webhooks (this also removes their conditions and delivery history). Implies `webhooks:read`. |

:::info Write and delete imply read
Selecting `webhooks:write` automatically grants `webhooks:read`; there's no useful write-without-read combination. The dashboard shows implied scopes as locked pills next to the ones you pick.
:::

## Permission presets

The create dialog offers three named presets alongside **Custom**:

| Preset          | Intended use                                                     | Roughly equivalent to                                                                                                         |
| --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Read only**   | Read-only observability: inventories, dashboards, audits.        | All `*:read` scopes across account, projects, webhooks, and billing. Can't create, modify, or delete anything.               |
| **CI / deploy** | Continuous-deployment pipelines that ship projects and webhooks. | `projects:write`, `webhooks:write`, `project_settings:write` (plus implied reads). Can't delete resources or manage workspaces. |
| **Full access** | The same reach as a dashboard owner. Use sparingly.              | Every scope: read, write, and delete on every resource.                                                                       |

Pick **Custom** if none of the presets fit. The principle of least privilege still applies: a token that only needs to refresh a webhook shouldn't also carry `projects:delete`.

## Workspace selector

Many scopes (`projects:*`, `webhooks:*`, `workspace:*`, `members:read`) act inside a workspace. The **workspace selector** decides which workspaces a token can reach:

- **All workspaces.** The token covers every workspace you currently belong to, **including any you're added or invited to later**. It's convenient for a single admin token, but its reach grows on its own.
- **Selected only.** The token is locked to a fixed list of workspace UUIDs. New workspaces don't widen its reach, and a request against a workspace outside the list fails with `403 insufficient_permission` even when the scope itself is granted.

:::info Account-tier scopes ignore the selector
The selector only narrows _workspace-scoped_ operations. Account-level scopes (`account:read`, `invoices:read`, `payg:read`, `payg:write`, `workspaces:create`) always run against the whole account, because the things they cover (your subscription, invoices, PAYG orders) don't belong to any single workspace.
:::

## How authorization is decided

For every authenticated request, the Dashboard API runs three independent checks. **All three must pass**, and any failure returns `403 insufficient_permission`:

1. **Scope.** The token carries the scope the endpoint requires (for example `webhooks:write` for `POST /v1/webhooks`).
2. **Workspace selector.** If the endpoint targets a specific workspace, that workspace is allowed by the token's selector (the `null` wildcard, or an explicit list).
3. **Workspace role.** The user behind the token still holds at least the minimum role the action requires on that workspace.

The role hierarchy is `collaborator` < `maintainer` < `administrator` < `owner`. Scopes don't override it: a PAT created by a collaborator can't create projects no matter which scopes you select, because the underlying user still lacks the `maintainer` role on the target workspace. See [Roles](/overview/workspaces/#roles) for the full role-vs-permission grid.

:::caution Tokens inherit user roles
A PAT acts on behalf of the user who created it. If your role on a workspace is downgraded, every PAT you own loses the matching authority too, even tokens created with Full access. Rotate or re-create them when your role changes.
:::

## Managing tokens

PATs don't expire. Once created, a token stays valid until you [rotate](#rotation) its secret or [revoke](#revocation) it, so rotation and revocation are your only lifecycle controls.

### Token list

**Settings → Personal Access Tokens** lists every PAT on the account by its name and a non-secret identifier (the secret itself is never shown again), along with its scopes, workspace selector, and last-used time. Use the last-used column to spot stale tokens and revoke them.

### Rotation

Use **Rotate** when you want a new secret without redoing the token's permissions, for example after a suspected leak or as part of a regular rotation policy.

Rotation issues a fresh secret for the same token. You choose how long the old secret keeps working (immediately, 1 hour, 4 hours, 12 hours, or 24 hours); anything longer than zero gives your consumers a grace window to swap secrets without downtime.

### Revocation

**Revoke** kills a token immediately. After that, any request using it returns `401 unauthorized`. Revocation can't be undone, so re-create the token if you need it back.

## Security best practices

- **Least privilege.** Pick the scopes the token actually needs, not a superset. Prefer the **Read only** or **CI / deploy** presets over **Full access**.
- **Narrow the workspace selector.** If a token only touches production resources, lock it to the production workspace instead of leaving it on **All workspaces**.
- **One token per consumer.** Give each consumer (Terraform, CI, an on-call bot, and so on) its own token, so you can revoke one without disrupting the others.
- **Treat the secret like a password.** Keep it in a secrets manager, not in a Git repo or a committed `.env` file.

## Errors

Every error response uses the same JSON envelope: a stable `error` code you can match on, a human-readable `message`, and optional `details`.

```json
{
  "error": "insufficient_permission",
  "message": "Token lacks the required scope for this action.",
  "details": { "reason": "rbac", "required": "webhooks:write" }
}
```

| Status | `error`                   | When it's returned                                                                          |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`         | The request body or query parameters failed validation.                                     |
| `401`  | `unauthorized`            | The token is missing, malformed, revoked, or rotated past its grace window.                 |
| `402`  | `quota_exceeded`          | The action would exceed your plan's quota (for example too many projects or webhooks).      |
| `403`  | `insufficient_permission` | The token lacks the required scope, or the target workspace isn't in its selector.          |
| `403`  | `ip_not_allowed`          | The request's source IP isn't on the token's IP allowlist.                                  |
| `403`  | `feature_not_available`   | The action requires a higher plan.                                                          |
| `403`  | `forbidden`               | The action is blocked, for example because the account has a pending deletion.              |
| `404`  | `not_found`               | The resource doesn't exist, or the token can't see it.                                      |
| `409`  | `conflict`                | The request conflicts with the resource's state (for example deleting a non-empty workspace). |
| `429`  | `rate_limited`            | The token exceeded its rate limit. `details.retry_after_seconds` says when to retry.        |
| `500`  | `internal_error`          | An unexpected server error. Safe to retry.                                                  |

## Rate limits

Requests are rate-limited **per token**. When a token exceeds its limit, the API returns `429 rate_limited` with a `retry_after_seconds` hint, so back off and retry after that interval. For the current limits and headers, see the [Dashboard API reference](https://docs.blockfrost.io/dashboard-api/).

## API reference

For the full list of endpoints a PAT can call, including request and response schemas, required scopes, and error codes, see the [Blockfrost Dashboard API reference](https://docs.blockfrost.io/dashboard-api/).
