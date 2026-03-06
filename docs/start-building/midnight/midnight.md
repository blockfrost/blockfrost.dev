---
title: Midnight
id: midnight
---

[Midnight](https://midnight.network/) is a data protection blockchain that enables secure and private smart contracts using zero-knowledge proofs. It allows developers to build decentralized applications that protect sensitive data while maintaining regulatory compliance.

## Concepts

The Midnight Indexer API exposes a GraphQL API that enables clients to query and subscribe to blockchain data — blocks, transactions, contracts, and wallet-related events — indexed from the Midnight blockchain.

For the raw GraphQL schema specification, see the [Midnight Indexer GraphQL Schema](https://docs.blockfrost.io/midnight-indexer-api.graphql).

To learn about Midnight's architecture, the Compact smart contract language, zero-knowledge proofs, and available SDKs, see the [Midnight developer docs](https://docs.midnight.network/).

## Quick Start

Create a Midnight project on [blockfrost.io](https://blockfrost.io) and make your first API call:

```bash
curl -X POST https://midnight-preview.blockfrost.io/api/v0 \
  -H "project_id: YOUR_PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ block { hash height timestamp } }"}'
```

Response:

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

| Service                            | URL                                                | Protocol            |
| ---------------------------------- | -------------------------------------------------- | ------------------- |
| **Midnight Indexer HTTP API**      | `https://midnight-{network}.blockfrost.io/api/v0`  | HTTP POST (GraphQL) |
| **Midnight Indexer WebSocket API** | `wss://midnight-{network}.blockfrost.io/api/v0/ws` | WebSocket           |
| **Node RPC**                       | `https://rpc.midnight-{network}.blockfrost.io`     | JSON-RPC            |

The **Node RPC** endpoint exposes direct connection to the Midnight Node RPC for low-level runtime access, wallet providers, and transaction submission — use it with libraries like [midnight.js](https://github.com/midnightntwrk/midnight-js) that need a node connection.

Currently available networks are `preview` and `preprod`. The `mainnet` network is coming soon.

## Authentication

Include your project ID as the `project_id` HTTP header.

Alternatively, you can use **HTTP Basic Auth** directly in the endpoint URL. The username is the network prefix and the password is your project ID:

**Midnight Indexer API:**

```text
https://nightpreview:YOUR_PROJECT_ID@midnight-preview.blockfrost.io/api/v0
https://nightpreprod:YOUR_PROJECT_ID@midnight-preprod.blockfrost.io/api/v0
```

**Midnight Node RPC:**

```text
https://nightpreview:YOUR_PROJECT_ID@midnight-preview.blockfrost.io/node
https://nightpreprod:YOUR_PROJECT_ID@midnight-preprod.blockfrost.io/node
```

When using WebSocket in the browser (which doesn't support custom headers), include your project ID as a subprotocol by prefixing it with `project_id_`:

```javascript
new WebSocket("wss://midnight-preview.blockfrost.io/api/v0/ws", [
  "graphql-transport-ws",
  "project_id_YOUR_PROJECT_ID",
]);
```

## Request Format

Send a POST request with a JSON body containing:

- `query` (required): The GraphQL query, mutation, or subscription string
- `variables` (optional): Variables for the GraphQL operation

Example:

```json
{
  "query": "query GetBlock($offset: BlockOffset) { block(offset: $offset) { hash height } }",
  "variables": { "offset": { "height": 100 } }
}
```

or without variables:

```json
{
  "query": "query { block(offset: { height: 100 }) { hash height } }"
}
```

## Response Format

Responses follow the standard GraphQL format:

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

On error:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Invalid value for argument \"offset.height\" expected type \"Int\"",
      "locations": [{ "line": 1, "column": 15 }],
      "path": ["block"]
    }
  ]
}
```

## Usage

This section covers using the Midnight Indexer API through Blockfrost.

:::note
Don't forget to `export` the `PROJECT_ID` first when trying examples in this guide!

```bash
# Don't forget to replace the PROJECT_ID with yours!
export PROJECT_ID=midnightEnrkKWDwlA9hV4IajI4ILrFdsHJpIqNC
```

:::

### Query the latest block

```bash
curl -X POST https://midnight-preview.blockfrost.io/api/v0 \
  -H "project_id: $PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ block { hash height timestamp author transactions { hash } } }"}'
```

### Query a block by height

```bash
curl -X POST https://midnight-preview.blockfrost.io/api/v0 \
  -H "project_id: $PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ block(offset: { height: 3 }) { hash height protocolVersion timestamp transactions { hash } } }"}'
```

### Query transactions by hash

```bash
curl -X POST https://midnight-preview.blockfrost.io/api/v0 \
  -H "project_id: $PROJECT_ID" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ transactions(offset: { hash: \"YOUR_TX_HASH\" }) { hash protocolVersion block { height hash } } }"}'
```

## WebSocket Subscriptions

Subscriptions use a WebSocket connection following the GraphQL over WebSocket protocol.

**Connecting with `websocat`:**

```bash
websocat wss://midnight-preview.blockfrost.io/api/v0/ws \
  --protocol "graphql-transport-ws" \
  -H "project_id: YOUR_PROJECT_ID"
```

**Step 1 — Initialize the connection:**

After connecting, send a `connection_init` message:

```json
{ "type": "connection_init" }
```

The server responds with:

```json
{ "type": "connection_ack" }
```

**Step 2 — Send a subscription:**

Once acknowledged, send a `subscribe` message with your GraphQL subscription query:

```json
{
  "id": "1",
  "type": "subscribe",
  "payload": {
    "query": "subscription { blocks { hash height timestamp transactions { hash } } }"
  }
}
```

**Step 3 — Receive events:**

The server pushes `next` messages whenever new data is available:

```json
{
  "id": "1",
  "type": "next",
  "payload": {
    "data": {
      "blocks": {
        "hash": "d193b2686197789ace64962eb3049c5b94c4bbf9b07da04bef034cd75d83afc4",
        "height": 192998,
        "timestamp": 1770787800000,
        "transactions": []
      }
    }
  }
}
```

**Connecting from JavaScript:**

```javascript
const ws = new WebSocket("wss://midnight-preview.blockfrost.io/api/v0/ws", [
  "graphql-transport-ws",
  "project_id_YOUR_PROJECT_ID",
]);

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "connection_init" }));
};

ws.onmessage = event => {
  const msg = JSON.parse(event.data);
  if (msg.type === "connection_ack") {
    ws.send(
      JSON.stringify({
        id: "1",
        type: "subscribe",
        payload: {
          query: "subscription { blocks { hash height timestamp } }",
        },
      })
    );
  }
  if (msg.type === "next") {
    console.log("New block:", msg.payload.data);
  }
};
```

## Query Limits

The server may apply limitations to queries:

- `max-depth`: Maximum nesting depth
- `max-fields`: Maximum number of fields
- `timeout`: Query execution timeout
- `complexity`: Query complexity cost

Requests exceeding limits return errors:

```json
{
  "data": null,
  "errors": [{ "message": "Query has too many fields: 20. Max fields: 10." }]
}
```

## Pagination with Offsets

Many queries support offsets for pagination:

**BlockOffset** (oneOf — provide exactly one):

- `hash`: Hex-encoded block hash
- `height`: Block height number

**TransactionOffset** (oneOf — provide exactly one):

- `hash`: Hex-encoded transaction hash
- `identifier`: Hex-encoded transaction identifier

**ContractActionOffset** (oneOf — provide exactly one):

- `blockOffset`: A BlockOffset
- `transactionOffset`: A TransactionOffset

If no offset is provided, the latest result is returned.

## Scalar Types

The API uses custom scalar types:

| Scalar                 | Description                                        | Example                  |
| ---------------------- | -------------------------------------------------- | ------------------------ |
| `HexEncoded`           | Hex-encoded bytes (hashes, addresses, session IDs) | `"d193b268..."`          |
| `ViewingKey`           | Wallet viewing key in Bech32m or hex format        | `"mn_shield-esk1abc..."` |
| `CardanoRewardAddress` | Bech32-encoded Cardano reward address              | `"stake_test1..."`       |
| `UnshieldedAddress`    | Bech32m-encoded Midnight unshielded address        | `"midnight1..."`         |
| `DustAddress`          | Bech32m-encoded DUST address                       | `"midnight1..."`         |
| `Unit`                 | Empty return type for mutations with no data       | `null`                   |
