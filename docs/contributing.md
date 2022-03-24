---
title: Contributing
id: contributing
slug: /contributing
---

Blockfrost Developer Hub is open for community contributions. We were inspired by [the Cardano Developers portal](https://developers.cardano.org/) which is one of the most comprehensive information source within the Cardano ecosystem.

We strive to provide the same quality of content for the Blockfrost ecosystem.

## Bounties 💰

Not only we welcome community contributions, we do incentivize them via Blockfrost bounty program. There are several bounty levels depending on the complexity of the contribution ranging from 5 to 50 ADA.

### Process

- Blockfrost will publish bounties, in form of [GitHub issues](https://github.com/blockfrost/blockfrost.dev/issues?q=is%3Aopen+is%3Aissue+label%3ABounty%21), which are then up for grabs
- Before creating a PR, make sure that the issue is clear enough to be addressed, if not, open up a discussion in the issue
- Fork the repository, open a draft pull request and link it to the issue you are addressing
- Please adhere to [Contribution Rules](/docs/contributing#contribution-rules)
- Once you are ready, mark the pull request as ready and someone from the Blockfrost team will review it
- When the Blockfrost team is happy with the end result, we will merge the pull request and release it to the public
- After your change is released, post a comment with your Cardano mainnet address in the GitHub issue to claim your bounty

:::note
Please keep in mind, it is ultimately up to the Blockfrost team to decide if they want to accept the change or not.
:::

### Contribution Rules

If you are new to Git and GitHub ecosystem, please follow the [Make your first open source contribution in 5 minutes guide](https://github.com/firstcontributions/first-contributions/blob/master/README.md).

Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Style guide

For consistency, we are using the [Cardano's Developer Portal Style Guide](https://developers.cardano.org/docs/portal-style-guide).

## Local development

To get a local development environment, clone the forked repository, install dependencies, and start the development server. Most changes are reflected live without having to restart the server. By default, a browser window will open at `http://localhost:3000`.

```console
cd blockfrost.dev
yarn install
yarn start
```

:::tip
If you are using NixOS, just run `nix-shell` in the cloned repository to install the dependencies.
:::
