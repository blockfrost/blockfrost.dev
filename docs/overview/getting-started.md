---
title: Getting started
id: getting-started
---

In order to use Blockfrost hosted API, you need to create an account first.

## Log in / Sign up

![Blockfrost.io landing page](/img/frontend_landing.png)

When [creating a Blockfrost.io account](https://blockfrost.io/auth/signin) you can use your email or single sing-on through Google, GitHub and GitLab. With an account, you can start building your apps.

:::info
We use password-less login. No need to worry about losing or storing any passwords!
:::

## Creating first project

Once you have your account ready, you can create your first project. Click on **+ ADD PROJECT**, pick up a name, and most importantly, select the right [network](/docs/start-building#available-networks). Click **SAVE PROJECT** and a new secret API KEY, called `project_id`, is automatically generated.

![Blockfrost.io creating project](/img/frontend_create_project.png)

:::tip
After creating the project, you can click on the arrow to expand the view. There will be project statistics and also few ready-to-go `curl` samples that change with each refresh.
:::

Project within Blockfrost represents API access to a specific [network](/docs/start-building#available-networks). Each project is associated with a secret token called `project_id`, which you have to use in order to access the API.

:::warning
Always keep your secrets secret! `project_id` is a secret, so make sure you don't commit it to a public repository or include it in your code. When possible, use environment variables and avoid exposing `project_id`. Otherwise, someone else could piggyback on your token.
:::
