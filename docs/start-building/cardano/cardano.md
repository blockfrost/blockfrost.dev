---
title: Cardano
id: cardano
---

[Cardano](https://cardano.org/) is a collection of open-source, patent-free protocols. It's a platform that enables you to store, transform, and manage value, identity, and governance. Cardano follows research not opinions or bias.

## Concepts

For a detailed overview of Cardano basic concepts, please consult [Cardano developer docs](https://developers.cardano.org/docs/get-started/technical-concepts).

In Blockfrost, we use two main types of encoding when querying resources on the network:

**Bech32** - we use Bech32 when querying addresses, stake addresses and pools(also queryable through hex due to historical reasons)

**hex** - we use lowercase hex when querying assets, asset policies, scripts, transactions and blocks (also queryable through block number, with the exception of boundary blocks)

:::info
Mainnet and Testnet (preview and preprod) addresses and stake addresses use different Bech32 prefixes. It is therefore easy to tell them apart. Pool Bech32 encoding, however, is network agnostic and therefore non distinguishable.
:::

When querying the API directly as we do in this guide, [Blockfrost.io OpenAPI documentation](https://docs.blockfrost.io/) comes very handy.

## Usage

This section covers using Cardano in Blockfrost API.

:::note
Don't forget to `export` the `PROJECT_ID` first when trying examples in this guide!

```bash
# Don't forget to replace the PROJECT_ID with yours!
export PROJECT_ID=mainnetEnrkKWDwlA9hV4IajI4ILrFdsHJpIqNC
```

:::

As there is extremely long list of available methods, we will only cover few from most categories. We will use Cardano Mainnet network for the purpose of this tutorial.

:::tip
During development phase, use Cardano Testnet (preview or preprod) and [get yourself some TADA](https://developers.cardano.org/docs/integrate-cardano/testnet-faucet/) to play with!
:::

### Accounts

Accounts are represented by a `stake_address` and usually they represent a single wallet, comprised of multiple standard [addresses](#addresses).

Let's query a Mainnet stake address `stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v`.

```bash

curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/accounts/stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v"
```

```json
{
  "stake_address": "stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v",
  "active": true,
  "active_epoch": 385,
  "controlled_amount": "3932327",
  "rewards_sum": "0",
  "withdrawals_sum": "0",
  "reserves_sum": "0",
  "treasury_sum": "0",
  "withdrawable_amount": "0",
  "pool_id": "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"
}
```

We can see that there's something below 4 ADA (3 932 327 / 1 000 000) and that the account is participating in staking since epoch 385. It's also visible which pool it stakes with and we'll look at the pool later on.

Let's also query addresses which [made at least 1 transaction](/support/cardano#querying-address-returns-404-not-found-but-my-address-is-valid) on the blockchain and belong to this stake address.

```bash

curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/accounts/stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v/addresses"
```

```json
[
  {
    "address": "addr1q8zsjx7vxkl4esfejafhxthyew8c54c9ch95gkv3nz37sxrc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq3jd3w2"
  },
  {
    "address": "addr1qxrrzqsqnzqx3p8sxxsry936h6c78ml4rdl224f33l7pmcnc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgqr735lq"
  },
  {
    "address": "addr1q9x625ny9y42s5z8n78afjg9meyeknvt5kwm3y6sdlrz66tc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgqsyx3uz"
  },
  {
    "address": "addr1qy6qvd3szupa7ayqf6zw7cd0ple7w3yg5f3xh5gkkc4q9zmc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq52e2en"
  }
]
```

Let's focus just on the last one at the moment, by using query parameters `count` and `order`.

```bash

curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/accounts/stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v/addresses?count=1&order=desc"
```

```json
[
  {
    "address": "addr1qy6qvd3szupa7ayqf6zw7cd0ple7w3yg5f3xh5gkkc4q9zmc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq52e2en"
  }
]
```

### Addresses

Let's continue where we left off and pick the last known address from our account. Have you noticed that there aren't any tokens displayed? To view those, we have to query the associated addresses, as only those can hold tokens.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qy6qvd3szupa7ayqf6zw7cd0ple7w3yg5f3xh5gkkc4q9zmc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq52e2en"
```

```json
{
  "address": "addr1qy6qvd3szupa7ayqf6zw7cd0ple7w3yg5f3xh5gkkc4q9zmc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq52e2en",
  "amount": [
    {
      "unit": "lovelace",
      "quantity": "0"
    }
  ],
  "stake_address": "stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v",
  "type": "shelley",
  "script": false
}
```

It seems that the queried address is now empty but since we can see it on the blockchain and it didn't return a [404 Not Found](/support/cardano#querying-address-returns-404-not-found-but-my-address-is-valid) from API, it must have made some transactions. Let's confirm this by querying just the most recent transaction. We'll achieve this by using a combination of two query parameters, `count=1` and `order=desc`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qy6qvd3szupa7ayqf6zw7cd0ple7w3yg5f3xh5gkkc4q9zmc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq52e2en/transactions?count=1&order=desc"
```

```json
[
  {
    "tx_hash": "c34c232d6574d35a92f3bdcc6159b6d0b04f98de9f311db629f8973ac66dec10",
    "tx_index": 9,
    "block_height": 8223596,
    "block_time": 1672766667
  }
]
```

Ok, let's try querying the first address from the account instead:

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1q8zsjx7vxkl4esfejafhxthyew8c54c9ch95gkv3nz37sxrc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq3jd3w2"
```

```json
{
  "address": "addr1q8zsjx7vxkl4esfejafhxthyew8c54c9ch95gkv3nz37sxrc9ty742qncmffaesxqarvqjmxmy36d9aht2duhmhvekgq3jd3w2",
  "amount": [
    {
      "unit": "lovelace",
      "quantity": "3932327"
    },
    {
      "unit": "d436d9f6b754582f798fe33f4bed12133d47493f78b944b9cc55fd1853756d6d69744c6f64676534393539",
      "quantity": "1"
    }
  ],
  "stake_address": "stake1u9uz4j024qfud557ucrqw3kqfdndjgaxj7m44x7tamkvmyqzdwe7v",
  "type": "shelley",
  "script": false
}
```

Finally a non-empty address! And it contains ADA as well as a single token, or as we call it, asset.

### Assets

Let's pick the first asset from the previous call and query its details.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/assets/d436d9f6b754582f798fe33f4bed12133d47493f78b944b9cc55fd1853756d6d69744c6f64676534393539"
```

```json
{
  "asset": "d436d9f6b754582f798fe33f4bed12133d47493f78b944b9cc55fd1853756d6d69744c6f64676534393539",
  "policy_id": "d436d9f6b754582f798fe33f4bed12133d47493f78b944b9cc55fd18",
  "asset_name": "53756d6d69744c6f64676534393539",
  "fingerprint": "asset1smjzaahccwjrmqx5nslm5ph7egfkh3guta5wfn",
  "quantity": "1",
  "initial_mint_tx_hash": "72c014fccc4c02ed8993087ae0faddd2517d6ed2060173ba6154fb476615a512",
  "mint_or_burn_count": 1,
  "onchain_metadata": {
    "city": "Summit Lodge",
    "date": "November 19-21, 2022",
    "name": "Cardano Summit 2022 | Summit Lodge",
    "files": [
      {
        "src": "ipfs://QmU1BETyTqbvQQThwGiWTENWxbsuzNgiJYnwe9xJxbGahD",
        "name": "Cardano Summit 2022 | Summit Lodge",
        "mediaType": "text/html"
      },
      {
        "src": "ipfs://QmetCTi9y1Yr85rrR5fdHxaMmZ5zQZznzZqtge9H1a6HRm",
        "name": "Cardano Summit 2022 | Summit Lodge",
        "mediaType": "image/jpeg"
      }
    ],
    "image": "ipfs://QmVGuPgXg2qXfv4YUdw5Y4QyK8eJhQzGVenV9p8feraqMH",
    "author": "TURF",
    "country": "Cardano",
    "variety": "Common",
    "website": "https://www.turfnft.com",
    "mediaType": "image/gif",
    "event type": "Virtual",
    "location code": "00000000+00",
    "cardano summit 2022 organizer": "Cardano Foundation"
  },
  "onchain_metadata_standard": "CIP25v1",
  "metadata": null
}
```

Let's look at the first transaction which has information about this asset. We use similar approach as we used when querying latest, but we'll reverse the order. All the results are by default ordered in ascending order from the oldest transaction, so we may omit the `order` query parameter. But it won't hurt to use it explicitly, so let's do that. So again, two query parameters, `count=1` stays but the second one changes to `order=asc`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/assets/d436d9f6b754582f798fe33f4bed12133d47493f78b944b9cc55fd1853756d6d69744c6f64676534393539/transactions?count=1&order=asc"
```

```json
[
  {
    "tx_hash": "72c014fccc4c02ed8993087ae0faddd2517d6ed2060173ba6154fb476615a512",
    "tx_index": 22,
    "block_height": 8038275,
    "block_time": 1668961302
  }
]
```

Seems familiar? The `tx_hash` is matching `initial_mint_tx_hash` from the previous call! It is in fact the very first, i.e. mint, transaction of that particular asset.

### Blocks

Blocks can be queried either by their `hash` or their `height`. Let's try querying block from the previous call.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/blocks/8038275"
```

```json
{
  "time": 1668961302,
  "height": 8038275,
  "hash": "4660d994f9099cbe9bf980f10e2dc02902505cbeadcff10b21b819d61076a93c",
  "slot": 77395011,
  "epoch": 376,
  "epoch_slot": 326211,
  "slot_leader": "pool1jgwu8lq3dqddnnx7prymcgcyrqy0fdlghg33he2hmw9t2gma3zd",
  "size": 88725,
  "tx_count": 70,
  "output": "663048152642",
  "fees": "15583364",
  "block_vrf": "vrf_vk1ga52prse4ws509nah3p9d9l6nf5jurkx8j2g7fh8ljwtaj9t9ysqt9g0ku",
  "op_cert": "04f80395f8f1876c393b725fd5d633739591dde72ae136a9042aab0ada0d393e",
  "op_cert_counter": "9",
  "previous_block": "89a1f73719fc29810dc540bea103fd4454679f16201e2d541eef44a10d3421ab",
  "next_block": "4e5d4fc281d43fc85921dd002357b4785fb0692d0a66df56a59da81fb3f0a760",
  "confirmations": 185374
}
```

There's a lot of going on, 70 txs in the block where that asset was minted! Ok, let's try another very useful call, querying the latest block, a.k.a. the tip of the blockchain.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest"
```

```json
{
  "time": 1672766054,
  "height": 8223577,
  "hash": "4f07277d9b5f5141cc27bcb469682f4010439f0725e870862622f569a7c86222",
  "slot": 81199763,
  "epoch": 385,
  "epoch_slot": 242963,
  "slot_leader": "pool17taqml487n9t4r9a6ppvf9qv0qlw2lu4zcrzwfdsfcv6xp7uqym",
  "size": 4,
  "tx_count": 0,
  "output": null,
  "fees": null,
  "block_vrf": "vrf_vk1w064pps8jkpee8hs6szluyv7smksch0v4adzja03wepfdw0jxs6q9lh8kg",
  "op_cert": "aed510b38a5d4cf76a5165b3ef46538788bf0f62d7e07988b31e99a8d7ba96c4",
  "op_cert_counter": "8",
  "previous_block": "84ffff75fde7898b71acf777e85d8e8c3fcd64708ac845a92429cb9b023894a4",
  "next_block": null,
  "confirmations": 0
}
```

Huh, an empty block. There are no transactions. Well, it might happen when the blockchain is not under load, so let's try again.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest"
```

```json
{
  "time": 1672766182,
  "height": 8223582,
  "hash": "eb625cdac8f97791b2fc7d86057b26179e2c08f772411e43809afc6d997f900a",
  "slot": 81199891,
  "epoch": 385,
  "epoch_slot": 243091,
  "slot_leader": "pool1wf7wk3802jxtkmek6uprm77cgqx53t4qep9kwkl078w3yw0ff69",
  "size": 11714,
  "tx_count": 5,
  "output": "251134283914",
  "fees": "2201272",
  "block_vrf": "vrf_vk1hpnf7ytfvtq7h5ns5zcqg6yxrjg34kkfj5njmgs8hjxtfle6qrnsash3xy",
  "op_cert": "6e965ee09632519948258f8ba7a2e8fbd84db91ede232ef85046ccf61988bd58",
  "op_cert_counter": "9",
  "previous_block": "972d5f7142ed5fc7339bce36d15813554403780db61b87b6a5441033fa8a53d1",
  "next_block": null,
  "confirmations": 0
}
```

Excellent. Notice how `confirmations` and `next_block` are always null. That's because we're looking at the tip of the blockchain.

We can also look at the transactions in a block.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/blocks/eb625cdac8f97791b2fc7d86057b26179e2c08f772411e43809afc6d997f900a/txs"
```

```json
[
  "f1c24763f4ddca8a8b0dcc91ea76a1a9657cfe1615c72a459f5f370069a28874",
  "0eb9596a8234e8f797640fc890d8888ba30040983665d4689d016033f2d73031",
  "66d8e7046fb30b5645b31e65be0b27d17af9111936ffb25414fd933af4f6d2bb",
  "df10b32aea46240d0ca240a83eac5f5b1e9790dada14b0772066e008ad3ddac1",
  "080877b20e5fcbc0d3d3bd56bb875dac5ef03b7541c79f2c81bb2552ac628f0e"
]
```

### Transactions

Ah, transactions. The life and soul of every blockchain. Nearly everything is a transaction of some sort.

Let's look at the first transaction we found when we were querying the latest block.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/txs/f1c24763f4ddca8a8b0dcc91ea76a1a9657cfe1615c72a459f5f370069a28874"
```

```json
{
  "hash": "f1c24763f4ddca8a8b0dcc91ea76a1a9657cfe1615c72a459f5f370069a28874",
  "block": "eb625cdac8f97791b2fc7d86057b26179e2c08f772411e43809afc6d997f900a",
  "block_height": 8223582,
  "block_time": 1672766182,
  "slot": 81199891,
  "index": 0,
  "output_amount": [
    {
      "unit": "lovelace",
      "quantity": "337920356"
    },
    {
      "unit": "8e0556c569082f195b406737647765ed6b05d27dcb2c65319b7ce39154434332393239",
      "quantity": "1"
    }
  ],
  "fees": "440501",
  "deposit": "0",
  "size": 1379,
  "invalid_before": null,
  "invalid_hereafter": "81201678",
  "utxo_count": 12,
  "withdrawal_count": 0,
  "mir_cert_count": 0,
  "delegation_count": 0,
  "stake_cert_count": 0,
  "pool_update_count": 0,
  "pool_retire_count": 0,
  "asset_mint_or_burn_count": 0,
  "redeemer_count": 1,
  "valid_contract": true
}
```

We can inspect transactions further by querying them and then using sub-queries to get even more info. For example, querying this transaction, we see that `redeemer_count` is non-zero, so we could then fetch additional info by using `/redeemers` call. i.e.:

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/txs/f1c24763f4ddca8a8b0dcc91ea76a1a9657cfe1615c72a459f5f370069a28874/redeemers"
```

```json
[
  {
    "tx_index": 1,
    "purpose": "spend",
    "script_hash": "9068a7a3f008803edac87af1619860f2cdcde40c26987325ace138ad",
    "redeemer_data_hash": "e5ee0cfe4d99494b8022f26e0cefd24fc78b23f798d59886eba97f9f6475648f",
    "datum_hash": "e5ee0cfe4d99494b8022f26e0cefd24fc78b23f798d59886eba97f9f6475648f",
    "unit_mem": "2858646",
    "unit_steps": "824631790",
    "fee": "224400"
  }
]
```

and even query the script involved!

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/scripts/9068a7a3f008803edac87af1619860f2cdcde40c26987325ace138ad"
```

```json
{
  "script_hash": "9068a7a3f008803edac87af1619860f2cdcde40c26987325ace138ad",
  "type": "plutusV2",
  "serialised_size": 2561
}
```

### Epochs

Let's look at some epoch stats. We'll query the epoch from the previous call. There are two ways of making the call. Either query a specific epoch or query the latest epoch. Since we're now in the latest epoch, both calls will return the same output.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest"
```

```json
{
  "epoch": 385,
  "start_time": 1672523091,
  "end_time": 1672955091,
  "first_block_time": 1672523095,
  "last_block_time": 1672767811,
  "block_count": 11993,
  "tx_count": 203952,
  "output": "27826751355072919",
  "fees": "71879981640",
  "active_stake": "25388654503848140"
}
```

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/epochs/385"
```

```json
{
  "epoch": 385,
  "start_time": 1672523091,
  "end_time": 1672955091,
  "first_block_time": 1672523095,
  "last_block_time": 1672767836,
  "block_count": 11994,
  "tx_count": 203983,
  "output": "27846411264491280",
  "fees": "71891439390",
  "active_stake": "25388654503848140"
}
```

Wait, what? The numbers differ! That's because a new block has been generated between the two calls, as you can see from the `block_count` and other properties being updated. When a new epoch starts, calling a specific epoch number will produce static results, unlike now, when it's still active.

### Pools

Let's take a look a the pool from the very beginning, the pool at which the account is currently staking.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"
```

```json
{
  "pool_id": "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy",
  "hex": "0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735",
  "vrf_key": "b512cc7c1a8ba689c2d8fd27adfdbac2049a3f8f95c8b85e8298f14d7d8dc4e6",
  "blocks_minted": 2068,
  "blocks_epoch": 1,
  "live_stake": "5174880859704",
  "live_size": 0.00020379184476411696,
  "live_saturation": 0.07495042680626458,
  "live_delegators": 177,
  "active_stake": "5327138850257",
  "active_size": 0.0002098235985467276,
  "declared_pledge": "510000000000",
  "live_pledge": "515645620665",
  "margin_cost": 0.049,
  "fixed_cost": "340000000",
  "reward_account": "stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v",
  "owners": ["stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v"],
  "registration": [
    "a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e"
  ],
  "retirement": []
}
```

There are many information which we can query about a pool, such as history, updates or info about its delegators.

### Mempool

The mempool in Cardano is not global, which means that different block producing nodes can have different state of the network, including pending transactions in the mempool. However, if your application is using Blockfrost submit endpoint, you can verify whether your transaction is present in our mempools.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/mempool"
```

```json
[
  {
    "tx_hash": "edb1c7fab58d94b6b402686956391a366548696431387d24e214c228ce7311eb"
  },
  {
    "tx_hash": "68757830e3eb8ac6b79169734310e624c9c7c18c92c0b1d32d392124ad34a17e"
  },
  {
    "tx_hash": "ce2e9ce0c5ef2701f083b005529b2fd2e47acc48e3aff9e60bc96e970306d087"
  },
  {
    "tx_hash": "33b78c1b3dfca35854bd236143f49d1aacbe2003ad21d13f5018009a002da65c"
  },
  {
    "tx_hash": "ad5b4f7c394782593f750124c9917c53336a1623ae5d58523e83257c6080c5d6"
  }
]
```

### Network

To finish our Cardano adventure, let's look at the Mainnet stats at the time of writing this guide. You can also use `jq`, if you happen to have it.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/network"
```

```json
{
  "supply": {
    "max": "45000000000000000",
    "total": "35322101769949668",
    "circulating": "34522023957783973",
    "locked": "147932183023929",
    "treasury": "1113894699593937",
    "reserves": "9677898230050332"
  },
  "stake": {
    "live": "25392973235478445",
    "active": "25388654503848140"
  }
}
```

:::tip
[jq](https://stedolan.github.io/jq/) is a really useful tool. When used without any arguments, it will format the JSON. Just pipe any output from `curl` to `jq`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-mainnet.blockfrost.io/api/v0/network" | jq
```

:::

## FAQ

For more information related to Cardano in Blockfrost, please see our [Cardano FAQ](/support/cardano).

:::tip
Although it is perfectly possible to create your apps directly through the API, you will probably save a lot of time and nerves by using [one of our many SDKs](/sdks).
:::
