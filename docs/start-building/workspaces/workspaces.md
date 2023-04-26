---
title: Workspaces
id: workspaces
---

Blockfrost Workspaces enable users to create collaborative spaces for sharing projects with other team members. Set up a workspace for your organization, streamline billing management, and allow developers to concentrate on what matters most - building your application.

## Using workspaces

:::info Your first workspace
Upon logging in, you'll discover that we've conveniently set up your first workspace, containing all your existing projects. Access to inviting new members or setting up additional workspaces is available for **DEVELOPER** or **ENTERPRISE** subscribers.
:::

### Add members
1. Navigate to the dropdown menu and select "Manage workspace," or alternatively, access the workspace settings directly from the dashboard using the available shortcut.
![Workspace settings](/img/workspaces/dashboard-workspace-settings-shortcut.png)

2. Generate a new invitation link, and upon acceptance, the new member will appear in your workspace. By default, every new member is assigned the "collaborator" role. To modify a member's role, simply click on the role dropdown menu and make your selection. See [Roles](#roles) for a description of available roles.
![Workspace members](/img/workspaces/members.png)

### Share projects
Sharing projects is a breeze with workspaces. Simply choose the desired workspace for your project, then follow the steps to [Create your first project](/docs/overview/getting-started#creating-first-project). All workspace members will have access to projects within the shared workspace.


### Manage billing

Billing within a workspace is streamlined, with all workspaces sharing the subscription and allocated quota of their creator.
Workspace members can track the quota usage for individual workspaces as well as monitor the overall consumption for the entire subscription.

Workspace owners can delegate billing management to other members by assigning them the Administrator role. Administrators can then log into the billing portal on behalf of the owner to manage subscription and billing information, ensuring a smooth and efficient billing process while allowing developers to focus on building your application.

:::info Workspace subscription
Subscription changes will affect all workspaces created by the same owner, as workspace subscriptions are tied to the owner rather than the individual workspace.
:::

After a member is assigned the appropriate role, they can access the Billing portal by clicking the "Workspace Billing" button found within the workspace settings.
![Workspace members](/img/workspaces/billing.png)

## Roles
Blockfrost Workspaces offer four distinct roles, providing a well-organized and efficient collaboration experience:

- **Owner** - The workspace owner has full permissions, including managing billing, projects, and members. Automatically assigned upon workspace creation, this role cannot be changed or removed by other members.
- **Administrator** - Administrators possess nearly the same permissions as the Owner. They can manage billing, workspace projects, and members, as well as generate new invites. However, they lack the ability to delete the workspace.
- **Maintainer** - Maintainers have the ability to create new projects and update or delete existing ones, ensuring efficient project management.
- **Collaborator** - With read-only access to all workspace projects, Collaborators can review project information without making modifications.
