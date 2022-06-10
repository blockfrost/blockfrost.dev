---
title: Events overview
id: webhooks-events
---

Blockfrost Secure Webhooks support various events such as Transaction, Block, Epoch and Delegation. Data for each event are sent in `payload` field of the webhook request's JSON body.

Each request's body has following fields:

`id` - Unique identifier of the webhook request. Each request, even coming from the same webhook, will have distinct ID. However, requests that fail are retried multiple times with the same ID. To learn more, see [Retries](./using-webhooks#retries).

`created` - Unix timestamp (in seconds) with a time when our system detected the event.

`webhook_id` - Identifier of the Webhook, matching ID you see in [Blockfrost Dashboard](https://blockfrost.io/dashboard).

`api_version` - Version of Event objects (current version is `1`) affecting a schema of a webhook's payload.

`type` - Type of the event.

`payload` - Event data. For the exact format of each event's payload see breakdown below.

:::caution
It may happen that Cardano network rollbacks few blocks, invalidating the event that has been sent. Due to rollbacks you may receive the same event multiple times. To learn more see [Rollbacks](./using-webhooks#rollbacks-and-a-required-number-of-confirmations).
:::

## Transaction

Transaction event is dispatched every time new block is minted.

Transaction event contains an array of transactions matching your conditions. Every transaction object contains 3 fields: `tx`, `inputs` and `outputs`.

:::tip
Fields `tx`, `inputs` and `outputs` match the same schema as one returned by Blockfrost API.
For detailed description of each field check Blockfrost API documentation for [Transaction](https://docs.blockfrost.io/#tag/Cardano-Transactions/paths/~1txs~1{hash}/get) and [transaction's inputs and outputs](https://docs.blockfrost.io/#tag/Cardano-Transactions/paths/~1txs~1{hash}~1utxos/get).
:::

#### Example of a webhook request with a transaction event

```json
{
  "id": "cd153e0a-2561-4761-9fa1-98b62937438e",
  "webhook_id": "cf68eb9c-635f-415e-a5a8-6233638f28d6",
  "created": 1647611209,
  "api_version": 1,
  "type": "transaction",
  "payload": [
    {
      "tx": {
        "hash": "9358fccf785f40d5507ed81b38f16b03148baf341e1de4d511689eebb436dd4b",
        "block": "3e0f394b2601b99b26761bbceab1063bc7fa29578165cd840c3dee6d286e98be",
        "block_height": 7012249,
        "block_time": 1647611205,
        "slot": 56044914,
        "index": 0,
        "output_amount": [{ "unit": "lovelace", "quantity": "1664454750" }],
        "fees": "174345",
        "deposit": "0",
        "size": 426,
        "invalid_before": null,
        "invalid_hereafter": "56051594",
        "utxo_count": 4,
        "withdrawal_count": 0,
        "mir_cert_count": 0,
        "delegation_count": 0,
        "stake_cert_count": 0,
        "pool_update_count": 0,
        "pool_retire_count": 0,
        "asset_mint_or_burn_count": 0,
        "redeemer_count": 0,
        "valid_contract": true
      },
      "inputs": [
        {
          "address": "addr1q8suxg555ynm66ykapc2999hzyxnmre70xf6p20pa2z269agynrj803a45k5zqg2usxju3wk5gywqjdtd59salr9mpzq9g4r8a",
          "amount": [{ "unit": "lovelace", "quantity": "556360000" }],
          "tx_hash": "c4ca612037927bb6276a3742ce7ecadbaa18c91f1c756563f63dc10c8d03ef75",
          "output_index": 0,
          "collateral": false,
          "data_hash": null
        },
        {
          "address": "addr1qxz6gjjj5n6e0ydp2ma7nmqe6x99pskx8l6s3wuqgshmdt4gynrj803a45k5zqg2usxju3wk5gywqjdtd59salr9mpzqfxstv6",
          "amount": [{ "unit": "lovelace", "quantity": "1108269095" }],
          "tx_hash": "c69a4bbdc761ac7400c477d3d47a600abd450d108195c9f4e8ac462995668ea1",
          "output_index": 1,
          "collateral": false,
          "data_hash": null
        }
      ],
      "outputs": [
        {
          "address": "addr1q9zyjm3lkfjhgt2g6cyqts8kpwppl3l5ud8afpgqxzygrhgv45sex0xp482gdrnnkzdlajwc9zalzx8zvcvum2qvkqzsln7sdv",
          "amount": [{ "unit": "lovelace", "quantity": "1368000000" }],
          "output_index": 0,
          "data_hash": null
        },
        {
          "address": "addr1q9f2ky7363su6wajkzgavp85hsp6h8664wgf07tcskrslz9gynrj803a45k5zqg2usxju3wk5gywqjdtd59salr9mpzq27asdl",
          "amount": [{ "unit": "lovelace", "quantity": "296454750" }],
          "output_index": 1,
          "data_hash": null
        }
      ]
    }
  ]
}
```

## Block

Block event is dispatched every time a new block is minted.

Block event payload consist of [Block](https://docs.blockfrost.io/#tag/Cardano-Blocks/paths/~1blocks~1{hash_or_number}/get) data.

:::tip
Schema of the payload data is the same as returned by Blockfrost API.
For a detailed description check Blockfrost API documentation for [Block](https://docs.blockfrost.io/#tag/Cardano-Blocks/paths/~1blocks~1{hash_or_number}/get).
:::

#### Example of a webhook request with a block event

```json
{
  "id": "47668401-c3a4-42d4-bac1-ad46515924a3",
  "webhook_id": "cf68eb9c-635f-415e-a5a8-6233638f28d7",
  "created": 1650013856,
  "api_version": 1,
  "type": "block",
  "payload": {
    "time": 1650013853,
    "height": 7126256,
    "hash": "f49521b67b440e5030adf124aee8f88881b7682ba07acf06c2781405b0f806a4",
    "slot": 58447562,
    "epoch": 332,
    "epoch_slot": 386762,
    "slot_leader": "pool1njjr0zn7uvydjy8067nprgwlyxqnznp9wgllfnag24nycgkda25",
    "size": 34617,
    "tx_count": 13,
    "output": "13403118309871",
    "fees": "4986390",
    "block_vrf": "vrf_vk197w95j9alkwt8l4g7xkccknhn4pqwx65c5saxnn5ej3cpmps72msgpw69d",
    "previous_block": "9e3f5bfc9f0be44cf6e14db9ed5f1efb6b637baff0ea1740bb6711786c724915",
    "next_block": null,
    "confirmations": 0
  }
}
```

## Epoch

Epoch event is dispatched on epoch switch. The event's payload contains information about a current epoch that has just started and a previous epoch that has ended.

:::tip
Event payload consist of an object with two fields `current_epoch` and `previous_epoch`.
`previous_epoch` contains [full Epoch data](https://docs.blockfrost.io/#tag/Cardano-Epochs/paths/~1epochs~1latest/get), while `current_epoch` contains only `epoch`, `start_time` and `end_time` fields.
:::

#### Example of a webhook request with an epoch event

```json
{
  "id": "47668401-c3a4-42d4-bac1-ad46515924a3",
  "webhook_id": "cf68eb9c-635f-415e-a5a8-6233638f28d7",
  "created": 1650013856,
  "api_version": 1,
  "type": "epoch",
  "payload": {
    "previous_epoch": {
      "epoch": 342,
      "start_time": 1653947091,
      "end_time": 1654379091,
      "first_block_time": 1653947172,
      "last_block_time": 1654379048,
      "block_count": 20990,
      "tx_count": 470464,
      "output": "117853542835571922",
      "fees": "163696811862",
      "active_stake": "24660991673767486"
    },
    "current_epoch": {
      "epoch": 343,
      "start_time": 1654379091,
      "end_time": 1654811091
    }
  }
}
```

## Delegation

Delegation event is dispatched every time new block is minted.

Delegations are part of a transactions, which is why they are grouped by a transaction where they are included.
Delegation event payload is an array of objects where each object consist of `tx` field with [a transaction data](https://docs.blockfrost.io/#tag/Cardano-Transactions/paths/~1txs~1{hash}/get) and `delegations` field with a list of [delegations](https://docs.blockfrost.io/#tag/Cardano-Transactions/paths/~1txs~1{hash}~1delegations/get) that match the conditions for given transaction. List of delegations is expanded with pool data.

:::tip
Field `tx` matches the same schema as [Transaction](https://docs.blockfrost.io/#tag/Cardano-Transactions/paths/~1txs~1{hash}/get) returned by Blockfrost API.
List of `delegations` matches [Transaction delegations certificates](https://docs.blockfrost.io/#tag/Cardano-Transactions/paths/~1txs~1{hash}~1delegations/get) with one enhancement. Each delegation includes `pool` field containing [a stake pool data](https://docs.blockfrost.io/#tag/Cardano-Pools/paths/~1pools~1{pool_id}/get).

Note that the original `pool_id` field is removed from the delegation object.
:::

#### Example of a webhook request with a delegation event

```json
{
  "id": "275d9b57-2605-4b89-b1cc-ab53a1b4f063",
  "created": 1647541011,
  "webhook_id": "cf68eb9c-635f-415e-a5a8-6233638f28d6",
  "api_version": 1,
  "type": "delegation",
  "payload": [
    {
      "tx": {
        "hash": "09fc6c0b11f457e79a35b41d2678915320b6ba7c285ac44e52d1bb5844e6c71c",
        "block": "821218c845a7bd83ed216662b0dad08f8344383b0549169cfd93b5bd33279a03",
        "block_height": 7008789,
        "block_time": 1647540996,
        "slot": 55974705,
        "index": 19,
        "output_amount": [
          {
            "unit": "lovelace",
            "quantity": "37733348"
          }
        ],
        "fees": "172805",
        "deposit": "0",
        "size": 391,
        "invalid_before": null,
        "invalid_hereafter": "55988479",
        "utxo_count": 2,
        "withdrawal_count": 0,
        "mir_cert_count": 0,
        "delegation_count": 1,
        "stake_cert_count": 0,
        "pool_update_count": 0,
        "pool_retire_count": 0,
        "asset_mint_or_burn_count": 0,
        "redeemer_count": 0,
        "valid_contract": true
      },
      "delegations": [
        {
          "index": 0,
          "cert_index": 0,
          "address": "stake1uyhxaawwu3cnmuun5j4jzz8scxg3a6svnmcpuszg8leqqsgkcjlea",
          "active_epoch": 329,
          "pool": {
            "pool_id": "pool1df9rj4n0t3zlpak7xnh4ue6t3yh9zlw7a02w4l8askp77up25rt",
            "hex": "6a4a39566f5c45f0f6de34ef5e674b892e517ddeebd4eafcfd8583ef",
            "vrf_key": "c89955b3d37abfdc4eb0afba63392acbdb5f270ebf94dfabd7a26ae2b270bc7e",
            "blocks_minted": 389,
            "blocks_epoch": 1,
            "live_stake": "5408747245727",
            "live_size": 0.00023293805381289983,
            "live_saturation": 0.08024733395935683,
            "live_delegators": 1013,
            "active_stake": "5781876450231",
            "active_size": 0.0002485887153677961,
            "declared_pledge": "50000000000",
            "live_pledge": "61116592101",
            "margin_cost": 0.02,
            "fixed_cost": "340000000",
            "reward_account": "stake1u9zzujspwtxg03d4wrnwn49fxzj4c9qqw7dwfqygjmpxsyqqe2m5j",
            "owners": [
              "stake1u9zzujspwtxg03d4wrnwn49fxzj4c9qqw7dwfqygjmpxsyqqe2m5j"
            ],
            "registration": [
              "7f6ad53328939498abb67344492f21d24bf2b18e9b084831576c4f2840b373d6",
              "14640889489c8d4c381f005d9911c0f0898b2c2c1e51c4f499e5293166ef9fb8",
              "007f6c6130470083b4a77f8c06a8bac3ef343c070fe7fd77e0d6911dc691e5bc",
              "4c0d483da1198a41dc26595d146ced4e952f5a26533279464b384dddb463596f",
              "2e45dd8b494b37f8b5ba6e44a2836cd80c4031dec65afcee831a1b2e57384aea",
              "a35f9197cb5052675c4a7d20b388f1bea9de169ed32c12ee28801f2ef2c5d56c",
              "c71a91e340055ec5f6e1c0f8a3f76fc91985fb5a95d00dc02d4b26ab583116d9",
              "eff5e6744e826e3bdf930525c6b70f31ffa73c72d1176e43acf76c6bf60acc66",
              "82ec1668a5769c6b4561ff3e75320e506cbd84261d401e8995c146a8d285c518",
              "1beae5d09a17d6d0d11be2ef0bfa44c09bfe0015b15b922dc4398bf98da58edf",
              "3dc21a55d9f4cf18d82aa9f130dd131aaef1a2c1dff24e24bfc0963657a05332",
              "fc0b0ed216662d83e51bace470291de85e766ee4e9adcb4f6f2922c0f96aec6e",
              "cba71ab591f7400650ed657c2341a7b0a54524a3b24a69154e438d0a0c97b9b8",
              "09892faa9635ae10122b3e93b18d061627b4828d77b1412dcc387fc7ca96335f"
            ],
            "retirement": []
          }
        }
      ]
    }
  ]
}
```
