---
title: JavaScript (Node.js)
id: js
slug: /sdks-js
---

## About

Our JavaScript SDK, [blockfrost-js](https://github.com/blockfrost/blockfrost-js) is a [Node.js](https://nodejs.org) application and therefore typically [requires a backend](https://nodejs.org/en/docs/guides/getting-started-guide/).

## Installation

[![npm version](https://badge.fury.io/js/%40blockfrost%2Fblockfrost-js.svg)](https://badge.fury.io/js/%40blockfrost%2Fblockfrost-js)

To run the SDK you need Node.js version 14 and higher.

:::caution
We recommend setting up your own Node.js backend. Exposing your API keys in a frontend application is almost always a bad idea.
:::

The SDK is hosted on [npmjs.com](https://www.npmjs.com/package/@blockfrost/blockfrost-js), so you can directly import it using your favorite package manager.

```console
npm i @blockfrost/blockfrost-js
```

```console
yarn add @blockfrost/blockfrost-js
```

:::note
While you may find a way to run it directly in a browser, we don't actively support it or provide any type of assistance with such integrations.
:::

## Usage

Using the SDK is pretty straight-forward!

### Cardano

```typescript
const Blockfrost = require("@blockfrost/blockfrost-js");
// import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; // using import syntax

const API = new Blockfrost.BlockFrostAPI({
  projectId: "YOUR API KEY HERE", // see: https://blockfrost.io
});

async function runExample() {
  try {
    const latestBlock = await API.blocksLatest();
    const networkInfo = await API.network();
    const latestEpoch = await API.epochsLatest();
    const health = await API.health();
    const address = await API.addresses(
      "addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz"
    );
    const pools = await API.pools({ page: 1, count: 10, order: "asc" });

    console.log("pools", pools);
    console.log("address", address);
    console.log("networkInfo", networkInfo);
    console.log("latestEpoch", latestEpoch);
    console.log("latestBlock", latestBlock);
    console.log("health", health);
  } catch (err) {
    console.log("error", err);
  }
}

runExample();
```

### IPFS

```typescript
const Blockfrost = require("@blockfrost/blockfrost-js");
// import { BlockFrostIPFS } from '@blockfrost/blockfrost-js'; // using import syntax

const IPFS = new Blockfrost.BlockFrostIPFS({
  projectId: "YOUR IPFS KEY HERE", // see: https://blockfrost.io
});

async function runExample() {
  try {
    const added = await IPFS.add(`${__dirname}/img.svg`);
    console.log("added", added);

    const pinned = await IPFS.pin(added.ipfs_hash);
    console.log("pinned", pinned);
  } catch (err) {
    console.log("error", err);
  }
}

runExample();
```
