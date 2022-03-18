---
title: Milkomeda
id: milkomeda
---

[Milkomeda](https://dcspark.gitbook.io/milkomeda-getting-started/) is a groundbreaking new protocol that brings EVM capabilities to non-EVM blockchains.

:::tip
Some Web3 tools require basic authentication to connect to the Milkomeda network. For these, use the following single-line network endpoints.

Mainnet: <br/> `https://milkmainnet:YOUR_PROJECT_ID@milkomeda-mainnet.blockfrost.io/api/v0/`

Testnet: <br/> `https://milktestnet:YOUR_PROJECT_ID@milkomeda-testnet.blockfrost.io/api/v0/`
:::

## MetaMask support for Milkomeda

To access the Milkomeda network, you need a light wallet, such as [MetaMask](https://metamask.io/). After [creating your project](https://staging.blockfrost.dev/docs/overview/getting-started#creating-first-project), click on **Setup MetaMask**.

![MetaMask Setup](/img/metamask_setup.png)

You will then be prompted to a add a new network.

![MetaMask](/img/metamask_milkomeda_new_network.png)

## Supported JSON-RPC API calls

Blockfrost supports the following Milkomeda API calls.

* [net_version](https://api.besu.hyperledger.org/#bf00af3b-bb91-4815-9961-08b09d19a155)
* [eth_chainId](https://api.besu.hyperledger.org/#89f85555-c02a-4702-8870-5fecf7e43b02)
* [eth_blockNumber](https://api.besu.hyperledger.org/#430adfad-37c0-495d-a40b-b0aea8952bcd)
* [eth_call](https://api.besu.hyperledger.org/#58725cac-c843-4004-9804-9ab9f75ed923)
* [eth_estimateGas](https://api.besu.hyperledger.org/#a7cca1bb-eca0-4077-8fdc-06cc4a15f8c7)
* [eth_getBalance](https://api.besu.hyperledger.org/#42fdb197-1c46-42c7-9430-68c51371c465)
* [eth_gasPrice](https://api.besu.hyperledger.org/#f152af78-0fcf-473a-8c2f-43c34db5eba8)
* [eth_getBlockByHash](https://api.besu.hyperledger.org/#f439903b-1a62-4b73-81de-0dc6927f0589)
* [eth_getBlockByNumber](https://api.besu.hyperledger.org/#0617c456-f749-445b-bd38-b77257beaf6e)
* [eth_getBlockTransactionCountByHash](https://api.besu.hyperledger.org/#5f0e8868-c7cd-40e4-88fd-0630a0c5514e)
* [eth_getBlockTransactionCountByNumber](https://api.besu.hyperledger.org/#a2eb6351-6aa2-4c2f-a358-a7eb4855e2cc)
* [eth_getCode](https://api.besu.hyperledger.org/#32aef9e5-ff54-43d1-aec6-3274e80e9166)
* [eth_getTransactionByHash](https://api.besu.hyperledger.org/#2aa081c0-fe5d-4908-8a92-8134b5b8074d)
* [eth_getTransactionByBlockHashAndIndex](https://api.besu.hyperledger.org/#cfb08c06-a8fc-49d5-b235-fa764460bc25)
* [eth_getTransactionByBlockNumberAndIndex](https://api.besu.hyperledger.org/#f74a9db0-03d7-497c-9fcb-af38617eb624)
* [eth_getTransactionCount](https://api.besu.hyperledger.org/#2df1b99d-e494-4a15-82b9-ac99b7a9866e)
* [eth_getTransactionReceipt](https://api.besu.hyperledger.org/#6ab70994-8256-4c01-9919-83dbc71d7ed2)
* [eth_getWork](https://api.besu.hyperledger.org/#9e45de26-e025-424c-8d5e-f9c58e30ca51)
* [eth_protocolVersion](https://api.besu.hyperledger.org/#e3b47513-906a-4c63-b278-d210e5e2fe53)
* [eth_sendRawTransaction](https://api.besu.hyperledger.org/#e66f00d1-f13a-4756-b55c-8cc72e62dcd6)

:::note
If you are missing a call that your project requires, reach out to [our support](/docs/support).
:::

:::caution
Multicalls are not supported by Milkomeda integration at this moment.
:::
