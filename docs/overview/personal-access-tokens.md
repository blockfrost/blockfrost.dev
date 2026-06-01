---
title: Personal Access Tokens
id: personal-access-tokens
---

Personal Access Tokens (PATs) authenticate requests to the [Blockfrost Dashboard API](https://docs.blockfrost.io/dashboard-api), which exposes the same account, workspace, project, and webhook management capabilities available through the Dashboard UI. Use a PAT to automate Blockfrost resource management from Terraform, CI/CD pipelines, command-line tools, internal platforms, or backend services—without requiring interactive access through a browser.

## Creating a Personal Access Token

1. Sign in to the dashboard at https://blockfrost.io/dashboard and open **Settings → Personal Access Tokens**.
2. Click **Create token**. The create dialog asks for three things: a **name**, a **permission set**, and a **workspace selector**.
3. **Name** — a free-form label (e.g. `terraform-prod`, `ci-deploy`). It's shown only in the token list; it doesn't affect what the token can do. The actual bearer secret is generated for you.
4. **Permissions** — pick one of the presets (covered [below](#permission-presets)) or **Custom** to assemble scopes individually. The picker shows you exactly which scopes the token will carry; implied read-scopes (e.g. `webhooks:read` when you select `webhooks:write`) are auto-added and locked.
5. **Workspaces** — choose **All workspaces** (the token applies to every workspace you're a member of, including ones added later) or **Selected only** (pick the workspaces explicitly). See [Workspace selector](#workspace-selector) for the trade-offs.
6. Click **Create**. The dashboard mints the token and shows the bearer secret **exactly once** in a copy-to-clipboard dialog.

:::caution Save the secret immediately
The bearer secret is shown only at creation time. Blockfrost stores only a hash, so we cannot recover or re-display the original — store it in a password manager or secrets vault before closing the dialog. If you lose it, the only recovery is to [rotate](#rotation) the token to a new secret.
:::

## Token format

PAT bearer secrets start with the prefix `bfm_live_`. Treat the rest of the string as opaque.

Send the full string as a bearer token on every request:

```bash
curl https://dashboard.blockfrost.io/api/v1/account \
  -H "Authorization: Bearer bfm_live_..."
```

## Permissions

A PAT carries an explicit list of **scopes** that gate what it can do. Scopes are grouped by resource:

### Account & billing

| Scope               | What it grants                                                                 |
| ------------------- | ------------------------------------------------------------------------------ |
| `account:read`      | View account profile, plan, and quota snapshot.                                |
| `invoices:read`     | View the unified invoice ledger (Stripe invoices + PAYG orders).               |
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
| `project_settings:write` | Modify project access filters (requires **DEVELOPER** / **ENTERPRISE** plan, or any PAYG account). Implies `project_settings:read`. |

### Webhooks

| Scope             | What it grants                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `webhooks:read`   | List webhooks, view webhook details, view delivery history.                                    |
| `webhooks:write`  | Create webhooks and update existing ones. Implies `webhooks:read`.                             |
| `webhooks:delete` | Delete webhooks (also removes their conditions and delivery history). Implies `webhooks:read`. |

:::info Write/delete imply read
Selecting `webhooks:write` automatically grants `webhooks:read` — there is no useful "write without read" combination. The dashboard UI shows implied scopes as locked pills next to the ones you actively pick.
:::

## Permission presets

The create dialog offers three named presets in addition to **Custom**:

| Preset          | Intended use                                                     | Roughly equivalent to                                                                                                         |
| --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Read only**   | Read-only observability — inventories, dashboards, audits.       | All `*:read` scopes across account, projects, webhooks, billing. Cannot create, modify, or delete anything.                   |
| **CI / deploy** | Continuous-deployment pipelines that ship projects and webhooks. | `projects:write`, `webhooks:write`, `project_settings:write` (+ implied reads). Cannot delete resources or manage workspaces. |
| **Full access** | Equivalent to dashboard-owner permissions. Use sparingly.        | Every scope — read, write, and delete on every resource.                                                                      |

Pick **Custom** if none of the presets fit. The principle of least privilege still applies — a token that only needs to refresh a webhook should not also carry `projects:delete`.

## Workspace selector

Many scopes (`projects:*`, `webhooks:*`, `workspace:*`, `members:read`) act within a workspace. The **workspace selector** decides which workspaces a token can target:

- **All workspaces** — the token applies to every workspace the user is currently a member of, **including ones added or invited later**. Convenient for a single admin token, but the surface area grows automatically.
- **Selected only** — the token is locked to an explicit list of workspace UUIDs. New workspaces don't extend its reach; a request against a workspace outside the list fails with `403 insufficient_permission` even if the scope itself is granted.

:::info Account-tier scopes ignore the selector
The selector only narrows _workspace-scoped_ operations. Account-level scopes — `account:read`, `invoices:read`, `payg:read`, `payg:write`, `workspaces:create` — always run against the whole account regardless of the selector, because the resources they cover (your subscription, invoices, PAYG orders) don't belong to any single workspace.
:::

## How authorization is decided

For every authenticated request, the Dashboard API runs three independent checks. **All three must pass**; any failure returns `403 insufficient_permission`:

1. **Scope** — the token carries the scope required by the endpoint (e.g. `webhooks:write` for `POST /v1/webhooks`).
2. **Workspace selector** — if the endpoint targets a specific workspace, that workspace's UUID is allowed by the token's selector (`null` wildcard, or explicit list).
3. **Workspace role** — the user behind the token still has at least the minimum role required for the action on that workspace.

The role hierarchy is `collaborator` < `maintainer` < `administrator` < `owner`. Token scopes do not bypass the role hierarchy — a PAT minted by a `collaborator` cannot create projects no matter what scopes you select, because the underlying user still lacks `maintainer` on the target workspace. See [Roles](/overview/workspaces/workspaces#roles) for the full role-vs-permission grid.

:::caution Tokens inherit user roles
A PAT acts on behalf of the user who created it. If your role on a workspace is downgraded, every PAT you own loses the matching authority too — even tokens minted with "Full access". Rotate or re-mint when role changes.
:::

## Managing tokens

### Token list

**Settings → Personal Access Tokens** shows every PAT on the account with its `key_id` prefix (the bearer secret is never re-shown), name, scopes, workspace selector, and last-used timestamp. Use the last-used column to find tokens that have gone stale and revoke them.

### Rotation

Use **Rotate** when you need to change the secret without redoing the token's permissions — for example, after a suspected leak, or as part of a periodic rotation policy.

Rotation issues a fresh bearer secret for the same logical token. You can choose how long the old secret stays valid (immediately, 1 hour, 4 hours, 12 hours, or 24 hours) — anything longer than zero gives consumers a grace window to swap secrets without downtime.

### Revocation

**Revoke** kills a token immediately. After revocation any request bearing that token returns `401 unauthorized`. Revocation is irreversible — recreate the token if you need it back.

## Security best practices

- **Least privilege.** Pick scopes the token actually needs, not a superset. Prefer the **Read only** or **CI / deploy** presets over **Full access**.
- **Narrow the workspace selector.** If a token only manages production resources, lock it to the production workspace — don't leave it on **All workspaces**.
- **One token per consumer.** Mint a separate token per consumer (Terraform, CI, on-call bot, …) so you can revoke individually without disrupting others.
- **Treat the secret like a password.** Store it in a secrets manager, not in a Git repo or `.env` committed file.
