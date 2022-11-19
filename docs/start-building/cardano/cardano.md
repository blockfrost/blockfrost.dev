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
Mainnet and testnet addresses and stake addresses use different Bech32 prefixes. It is therefore easy to tell them apart. Pool Bech32 encoding, however, is network agnostic and therefore non distinguishable.
:::

When querying the API directly as we do in this guide, [Blockfrost.io OpenAPI documentation](https://docs.blockfrost.io/) comes very handy.

## Usage

This section covers using Cardano in Blockfrost API.

:::note
Don't forget to `export` the `PROJECT_ID` first when trying examples in this guide!

```bash
# Don't forget to replace the PROJECT_ID with yours!
export PROJECT_ID=testnetEnrkKWDwlA9hV4IajI4ILrFdsHJpIqNC
```

:::

As there is extremely long list of available methods, we will only cover few from most categories. We will use Cardano Testnet network for the purpose of this tutorial.

:::tip
During development phase, use Cardano Testnet and [get yourself some TADA](https://developers.cardano.org/docs/integrate-cardano/testnet-faucet/) to play with!
:::

### Accounts

Account are represented by a `stake_address` and usually they represent a single wallet, comprised of multiple standard [addresses](#addresses).

Let's query a Testnet stake address `stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c`.

```bash

curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/accounts/stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c"
```

```json
{
  "stake_address": "stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c",
  "active": true,
  "active_epoch": 180,
  "controlled_amount": "44935061068415",
  "rewards_sum": "22218841810",
  "withdrawals_sum": "22218841810",
  "reserves_sum": "0",
  "treasury_sum": "0",
  "withdrawable_amount": "0",
  "pool_id": "pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc"
}
```

We can see that there's a lot of TADA and that the account is participating in staking since epoch 180. It's also visible with which pool it stakes and we'll look at the pool later on.

Let's also query addresses which [made at least 1 transaction](docs/support/cardano#querying-address-returns-404-not-found-but-my-address-is-valid) on the blockchain and belong to this stake address.

```bash

curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/accounts/stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c/addresses"
```

Whoa, that's a lot of addresses! Let's take just the first three, by using query parameter `count`.

```bash

curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/accounts/stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c/addresses?count=3"
```

```json
[
  {
    "address": "addr_test1qzvduldkktan65x4dg5gkfaaehc798pjg755yckuk5tjcedre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qtweh58"
  },
  {
    "address": "addr_test1qzp9yjv9kn5d72em9rn0a9zeparfk7x00q9jemxdc3nwaedre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qdrur8p"
  },
  {
    "address": "addr_test1qzw29n4altf86nwdlft7nah5606hytg5pvdxe3rm65zzxmdre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qe60tfp"
  }
]
```

### Addresses

Let's continue where we left off and pick the first address from our account. Have you noticed that there aren't any tokens displayed? To view those, we have to query the associated addresses, as only those can hold tokens.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/addresses/addr_test1qzvduldkktan65x4dg5gkfaaehc798pjg755yckuk5tjcedre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qtweh58"
```

```json
{
  "address": "addr_test1qzvduldkktan65x4dg5gkfaaehc798pjg755yckuk5tjcedre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qtweh58",
  "amount": [
    {
      "unit": "lovelace",
      "quantity": "0"
    }
  ],
  "stake_address": "stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c",
  "type": "shelley",
  "script": false
}
```

The address is now empty but since we can see it on the blockchain and it didn't return a [404 Not Found](docs/support/cardano#querying-address-returns-404-not-found-but-my-address-is-valid) from API, it must have made some transactions. Let's confirm this by querying just the most recent transaction. We'll achieve this by using a combination of two query parameters, `count=1` and `order=desc`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/addresses/addr_test1qzvduldkktan65x4dg5gkfaaehc798pjg755yckuk5tjcedre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qtweh58/transactions?count=1&order=desc"
```

```json
[
  {
    "tx_hash": "7676e4f580e9ce94a5ce42ad53948c47fb9d2bb6ec224b24cb1439a603757472",
    "tx_index": 11,
    "block_height": 3247571,
    "block_time": 1642505606
  }
]
```

It looks like the first two addresses from the account we have started our tutorial with have 0 balance, but let's take a look at the third one.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/addresses/addr_test1qzw29n4altf86nwdlft7nah5606hytg5pvdxe3rm65zzxmdre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qe60tfp"
```

```json
{
  "address": "addr_test1qzw29n4altf86nwdlft7nah5606hytg5pvdxe3rm65zzxmdre5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qe60tfp",
  "amount": [
    {
      "unit": "lovelace",
      "quantity": "44935061068415"
    },
    {
      "unit": "476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e",
      "quantity": "1"
    },
    {
      "unit": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf391652243484f43",
      "quantity": "9994750"
    },
    {
      "unit": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54",
      "quantity": "5000000000"
    },
    {
      "unit": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522524245525259",
      "quantity": "1000000000"
    },
    {
      "unit": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522534245525259",
      "quantity": "2000000000"
    },
    {
      "unit": "57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf391652256414e494c",
      "quantity": "15000000"
    },
    {
      "unit": "6b8d07d69639e9413dd637a1a815a7323c69c86abbafb66dbfdb1aa7",
      "quantity": "2"
    }
  ],
  "stake_address": "stake_test1uz3u6x5cs388djqz6awnyuvez2f6n8jzjhqq59s4yxhm8js3nad0c",
  "type": "shelley",
  "script": false
}
```

Finally a non-empty address! And it contains ADA as well as some tokens, or as we call them, assets.

### Assets

Let's pick the first token from the previous call and query its details.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/assets/476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e"
```

```json
{
  "asset": "476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e",
  "policy_id": "476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c3",
  "asset_name": "6e7574636f696e",
  "fingerprint": "asset1jtqefvdycrenq2ly6ct8rwcu5e58va432vj586",
  "quantity": "1",
  "initial_mint_tx_hash": "e067ca567df4920f4ac3babc4d805d2afe860e21aa7f6f78dbe8538caf9d8262",
  "mint_or_burn_count": 1,
  "onchain_metadata": null,
  "metadata": {
    "name": "NUT🪙",
    "description": "The legendary Nutcoin, the first native asset minted on Cardano",
    "ticker": "NUT",
    "url": "https://fivebinaries.com/nutcoin",
    "logo": "iVBORw0KGgoAAAANSUhEUgAAAGQA...",
    "decimals": null
  }
}
```

Let's look at the first transaction which has information about this asset. We use similar approach as we used when querying latest, but we'll reverse the order. All the results are by default ordered in ascending order from the oldest transaction, so we may omit the `order` query parameter. But it won't hurt to use it explicitly, so let's do that. So again, two query parameters, `count=1` stays but the second one changes to `order=asc`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/assets/476039a0949cf0b22f6a800f56780184c44533887ca6e821007840c36e7574636f696e/transactions?count=1&order=asc"
```

```json
[
  {
    "tx_hash": "e067ca567df4920f4ac3babc4d805d2afe860e21aa7f6f78dbe8538caf9d8262",
    "tx_index": 0,
    "block_height": 2287021,
    "block_time": 1612383646
  }
]
```

Seems familiar? The `tx_hash` is matching `initial_mint_tx_hash` from the previous call! It is in fact the very first, i.e. mint, transaction of that particular asset.

### Blocks

Blocks can be queried either by their `hash` or their `height`. Let's try querying block from the previous call.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/blocks/2287021"
```

```json
{
  "time": 1612383646,
  "height": 2287021,
  "hash": "52b5c6bba3e718fdbb6b69d452bac576a904b6716e8a05c96c69c4f4aaa6bf4c",
  "slot": 18014430,
  "epoch": 112,
  "epoch_slot": 30,
  "slot_leader": "pool18ftcshq7394f88qtw8ywqu827ap0hndjznmzem0gk7d3qnzxvkk",
  "size": 438,
  "tx_count": 1,
  "output": "197800000",
  "fees": "1000000",
  "block_vrf": "vrf_vk1l8trckpdn3cysq84v5h8n2zq6dv0tl532n6p8c7053j5r9jp9d8s7452rs",
  "previous_block": "8912f576d8a9201ea6a18e883610b50a054dde214542935153c47b305189a323",
  "next_block": "50b99ecaef96d861c37d18c69bbd07db88d342e06969ff0710463c653c67be5e",
  "confirmations": 1111322
}
```

There's not much going on, seems like the only transaction in that block was the mint transaction we've already seen. So let's try another very useful call, querying the latest block, a.k.a. the tip of the blockchain.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/blocks/latest"
```

```json
{
  "time": 1647395264,
  "height": 3398333,
  "hash": "100459a94c450535dc92a5173d774455a071de2f680592c79e9d510b382af671",
  "slot": 53026048,
  "epoch": 193,
  "epoch_slot": 19648,
  "slot_leader": "pool15sfcpy4tps5073gmra0e6tm2dgtrn004yr437qmeh44sgjlg2ex",
  "size": 4,
  "tx_count": 0,
  "output": null,
  "fees": null,
  "block_vrf": "vrf_vk1deaac8se2ct0gvnmwck3zy8heantl2shwq7mvxzdvnl3vzq65kvqjgell6",
  "previous_block": "fae8102aaf0b96556091d6b926fd4cb8ad0488ea72c1f33932077397857f9d20",
  "next_block": null,
  "confirmations": 0
}
```

Huh, an empty block. There are no transactions. Well, it might happen when the blockchain is not under load, so let's try again.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/blocks/latest"
```

```json
{
  "time": 1647395574,
  "height": 3398343,
  "hash": "6eae785d52d11ae78fb5b8b619b6cf10faba2e4138884f4d7eb13fd04898ad8d",
  "slot": 53026358,
  "epoch": 193,
  "epoch_slot": 19958,
  "slot_leader": "pool13ay3pq3gz6w8candtkeytmvrftyvx2cwclcxc737wrjs6d3f84p",
  "size": 6033,
  "tx_count": 4,
  "output": 39628534791,
  "fees": 1229676,
  "block_vrf": "vrf_vk1udafvky5h2300zn2zruwvayskt3zydmuzd266lvdcyjfmvwqsdaqk44v70",
  "previous_block": "290622d5b585b643c220842b73b2c3887050a167f656f82ed5b6096204c70d7c",
  "next_block": null,
  "confirmations": 0
}
```

Excellent. Notice how `confirmations` and `next_block` are always null. That's because we're looking at the tip of the blockchain.

We can also look at the transactions in a block.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/blocks/6eae785d52d11ae78fb5b8b619b6cf10faba2e4138884f4d7eb13fd04898ad8d/txs"
```

```json
[
  "dcace43b3d9e67089567ce62b82a99a5d0749022d9f1cc151de60ea9e470bdd6",
  "9b89ad15816599769852c17b299a8ac380987a9ef408cce3eb941a37f637cf31",
  "d074abe19600a57b13ef087d600d335c9be149a15d61e7262c78e7379227152f",
  "e1963c8d8e963c5641ec23360265ed0d0e9a019403afc726b23c1bbd3c72fec0"
]
```

Let's keep these for later.

### Epochs

Let's look at some epoch stats. We'll query the epoch from the previous call. There are two ways of making the call. Either query a specific epoch or query the latest epoch. Since we're now in the latest epoch, both calls will return the same output.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/epochs/latest"
```

```json
{
  "epoch": 193,
  "start_time": 1647375616,
  "end_time": 1647807616,
  "first_block_time": 1647375616,
  "last_block_time": 1647396210,
  "block_count": 680,
  "tx_count": 1362,
  "output": "148408860733944",
  "fees": "319247432",
  "active_stake": "15034077847652956"
}
```

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/epochs/193"
```

```json
{
  "epoch": 193,
  "start_time": 1647375616,
  "end_time": 1647807616,
  "first_block_time": 1647375616,
  "last_block_time": 1647396230,
  "block_count": 681,
  "tx_count": 1364,
  "output": "148448017069678",
  "fees": "319621158",
  "active_stake": "15034077847652956"
}
```

Wait, what? The numbers differ! That's because a new block has been generated between the two calls, as you can see from the `block_count` and other properties being updated. When a new epoch starts, calling a specific epoch number will produce static results, unlike now, when it's still active.

### Pools

Let's take a look a the pool from the very beginning, the pool at which the account is currently staking.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/pools/pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc"
```

```json
{
  "pool_id": "pool1y6chk7x7fup4ms9leesdr57r4qy9cwxuee0msan72x976a6u0nc",
  "hex": "26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed",
  "vrf_key": "db61b20aeb616dbc39ca36194e7a54d5cef5464c6e6d0d420cfa551f7dc43d64",
  "blocks_minted": 12008,
  "blocks_epoch": 0,
  "live_stake": "96826997791137",
  "live_size": 0.0061337967517105015,
  "live_saturation": 1.1496553345812115,
  "live_delegators": 95,
  "active_stake": "96827046049060",
  "active_size": 0.006440504501190683,
  "declared_pledge": "100000000000",
  "live_pledge": "50755268168750",
  "margin_cost": 0.05,
  "fixed_cost": "340000000",
  "reward_account": "stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27",
  "owners": [
    "stake_test1uqfu74w3wh4gfzu8m6e7j987h4lq9r3t7ef5gaw497uu85qsqfy27"
  ],
  "registration": [
    "05102775ac07354e7247c55f8b7e1b2d5ada1c32fdc363d1782b5d77da23354a"
  ],
  "retirement": []
}
```

There are many information which we can query about a pool, such as history, updates or info about is delegators.

### Transactions

Ah, transactions. The life and soul of every blockchain. Nearly everything is a transaction of some sort.

Let's look at the transactions we found when we were querying the latest block.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/txs/dcace43b3d9e67089567ce62b82a99a5d0749022d9f1cc151de60ea9e470bdd6"
```

```json
{
  "hash": "dcace43b3d9e67089567ce62b82a99a5d0749022d9f1cc151de60ea9e470bdd6",
  "block": "6eae785d52d11ae78fb5b8b619b6cf10faba2e4138884f4d7eb13fd04898ad8d",
  "block_height": 3398343,
  "block_time": 1647395574,
  "slot": 53026358,
  "index": 0,
  "output_amount": [
    {
      "unit": "lovelace",
      "quantity": "39148935993"
    }
  ],
  "fees": "171397",
  "deposit": "0",
  "size": 364,
  "invalid_before": null,
  "invalid_hereafter": null,
  "utxo_count": 2,
  "withdrawal_count": 0,
  "mir_cert_count": 0,
  "delegation_count": 0,
  "stake_cert_count": 0,
  "pool_update_count": 0,
  "pool_retire_count": 0,
  "asset_mint_or_burn_count": 0,
  "redeemer_count": 0,
  "valid_contract": true
}
```

Looks like an ordinary transaction, let's check if it has any metadata.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/txs/dcace43b3d9e67089567ce62b82a99a5d0749022d9f1cc151de60ea9e470bdd6/metadata"
```

```json
[
  {
    "label": "1985",
    "json_metadata": {
      "co2": [
        {
          "value": "1241",
          "source": "MHZ019"
        }
      ],
      "humidity": [
        {
          "value": "93.2",
          "source": "SHT31"
        }
      ],
      "temperature": [
        {
          "value": "6.9",
          "source": "SHT31"
        }
      ]
    }
  }
]
```

It does! Looks like somebody is recording data of some sort of sensors, though the CO2 seems to be broken (let's hope)!

### Metadata

We can also query metadata having the same label as our previous transaction. Let's see how was that CO2 sensor 100 transactions before. We'll make use of 3 query parameters in this case: `count`, `page` and `order`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/metadata/txs/labels/1985?count=1&&page=100&order=desc"
```

```json
[
  {
    "tx_hash": "44e4e8c639a31ab7d7489dcb9945bf1a4b8f7d52c563c6d7da70837ed6a018bb",
    "json_metadata": {
      "humidity": [
        {
          "value": "93.3",
          "source": "SHT31"
        }
      ],
      "temperature": [
        {
          "value": "6.9",
          "source": "SHT31"
        }
      ]
    }
  }
]
```

The data is completely missing, so let's assume it's a faulty piece of hardware.

If we wanted to, we could query this transaction and look at the `block_time` to approximate when this data was recorded.

Let's call the curl with `-s` parameter and use `jq` to pick just the `block_time` and pipe it to `date` to tell us the time in human readable form

```bash
curl -s -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/txs/44e4e8c639a31ab7d7489dcb9945bf1a4b8f7d52c563c6d7da70837ed6a018bb" \
| jq .block_time | date -u
```

```json
Wed Mar 16 02:57:41 AM UTC 2022
```

:::tip
[jq](https://stedolan.github.io/jq/) is a really useful tool. When used without any arguments, it will format the JSON. Just pipe any output from `curl` to `jq`.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/blocks/latest" | jq
```

:::


### Mempool

The mempool in Cardano is not global, which means, different block producing nodes can have different state of the network and it includes the pending transaction in the mempool. However, if you application is using Blockfrost's submit endpoint, you can verify if you transaction is in our mempools.

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

:::

### Network

To finish our Cardano adventure, let's look at the Testnet stats at the time of writing this guide. You can also use `jq`, if you happen to have it.

```bash
curl -H "project_id: $PROJECT_ID" \
"https://cardano-testnet.blockfrost.io/api/v0/network"
```

```json
{
  "supply": {
    "max": "45000000000000000",
    "total": "40373226600586997",
    "circulating": "42111315822758815",
    "locked": "43599739364651",
    "treasury": "201142519024751",
    "reserves": "4626773399413003"
  },
  "stake": {
    "live": "15785822774958932",
    "active": "15034077847652956"
  }
}
```

:::tip
Although it is perfectly possible to create your apps directly through the API, you will probably save a lot of time and nerves by using [one of our many SDKs](/docs/sdks).
:::

## FAQ

For more information related to Cardano in Blockfrost, please see our [Cardano FAQ](/docs/support/cardano).
