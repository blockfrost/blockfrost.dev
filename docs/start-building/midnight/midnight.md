---
title: Midnight
id: midnight
---

The Midnight Indexer API exposes a GraphQL API that enables clients to query and subscribe to blockchain data — blocks, transactions, contracts, and wallet-related events — indexed from the Midnight blockchain.

## Quick Start

1. Create a Midnight project on [blockfrost.io](https://blockfrost.io)
2. Grab your `project_id` from the dashboard
3. Make your first query:

```bash
curl -X POST https://midnight-mainnet.blockfrost.io/api/v0 \
  -H "project_id: YOUR_PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ block { hash height timestamp } }"}'
```

```json
{
  "data": {
    "block": {
      "hash": "d193b2686197789ace64962eb3049c5b94c4bbf9b07da04bef034cd75d83afc4",
      "height": 192998,
      "timestamp": 1770787800000
    }
  }
}
```

## Endpoints

Blockfrost exposes three Midnight services:

| Service              | URL                                                  |
| -------------------- | ---------------------------------------------------- |
| **Indexer API**      | `https://midnight-mainnet.blockfrost.io/api/v0`      |
| **Indexer WebSocket**| `wss://midnight-mainnet.blockfrost.io/api/v0/ws`     |
| **Node RPC**         | `https://rpc.midnight-mainnet.blockfrost.io`         |

**Indexer API** — Send GraphQL queries and mutations over HTTP POST. This is the main entry point for fetching blockchain data (blocks, transactions, contracts, DUST status).

**Indexer WebSocket** — Subscribe to real-time events using the `graphql-transport-ws` protocol. Supports block streaming, contract actions, shielded/unshielded transactions, and ledger events.

**Node RPC** — Direct JSON-RPC connection to the Midnight Node for low-level runtime access, wallet providers, and transaction submission. Use it with libraries like [midnight.js](https://github.com/midnightntwrk/midnight-js) that need a node connection.

## Authentication

All requests require a valid project ID. There are two ways to pass it:

**HTTP header**

Include `project_id` as a request header.

```bash
curl -X POST https://midnight-mainnet.blockfrost.io/api/v0 \
  -H "project_id: YOUR_PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ block { hash height } }"}'
```

**Query parameter**

Append `?project_id=YOUR_PROJECT_ID` to the endpoint URL. Use this when your client doesn't support setting custom headers (e.g. Midnight.js SDK).

```text
https://midnight-mainnet.blockfrost.io/api/v0?project_id=YOUR_PROJECT_ID
wss://midnight-mainnet.blockfrost.io/api/v0/ws?project_id=YOUR_PROJECT_ID
https://rpc.midnight-mainnet.blockfrost.io?project_id=YOUR_PROJECT_ID
```

## Full API Reference

For the complete GraphQL schema documentation, query examples, WebSocket subscriptions, and more, see the [Blockfrost Midnight API docs](https://docs.blockfrost.io/midnight).

## Learn More

To learn about Midnight's architecture, the Compact smart contract language, zero-knowledge proofs, and available SDKs, see the official [Midnight developer documentation](https://docs.midnight.network/).
