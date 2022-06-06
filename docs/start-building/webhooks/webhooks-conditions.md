---
title: Trigger conditions
id: webhooks-conditions
---

Optionally you can create up to 5 trigger conditions for the webhook. Only events that met all of the conditions will be sent to your endpoint. Condition rule consist of a field, a value and an operator. You can choose from predefined conditions fields or create a custom JSONPath query extracting the field you want to match.

## Predefined conditions

The easiest way to create a condition is to select a field from a list of predefined fields for each event type.

For example, if you want to be notified when a payment is received on an address, then after selecting trigger type "Transaction" you will be able to create a rule for a field "Receiver", paste the address to the input and you are all set.

### Transaction event

<table>
  <tr>
    <th>Field</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>recipient</td>
    <td>Bech32 encoded address or stake address of the recipient (entry in transaction's outputs)</td>
    <td>addr1q8q8gdh8j229a683ghk4rd5u5tj2mmq9gh2fk3cxe8c20gjk4gdu3...<br />stake1u9t25x7gs7rzxnstrvqdc7qzkt7c95mcus52tsfmazsem6q8xwujq</td>
  </tr>
  <tr>
    <td>sender</td>
    <td>Bech32 encoded address or stake address (entry in transaction's inputs)</td>
    <td>addr1q8q8gdh8j229a683ghk4rd5u5tj2mmq9gh2fk3cxe8c20gjk4gdu3...<br />stake1u9t25x7gs7rzxnstrvqdc7qzkt7c95mcus52tsfmazsem6q8xwujq</td>
  </tr>
  <tr>
    <td>policy id</td>
    <td>Asset policy id</td>
    <td>00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae</td>
  </tr>
  <tr>
    <td>asset hex</td>
    <td>Concatenation of policy id and hex-encoded asset name</td>
    <td>00000002df633853f6a47465c9496721d2d5b1291b8398016c0e87ae6e7574636f696e</td>
  </tr>
  <tr>
    <td>fingerprint</td>
    <td>CIP14 based user-facing fingerprint</td>
    <td>asset12h3p5l3nd5y26lr22am7y7ga3vxghkhf57zkhd</td>
  </tr>
  <tr>
    <td>quantity</td>
    <td>Quantity of the asset in Lovelaces</td>
    <td>10</td>
  </tr>
</table>

:::tip
Blockfrost Webhooks support stake a addresses as a receiver or a sender. All addresses belonging the same account will match the account's stake address.
:::

### Block event

<table>
  <tr>
    <th>Field</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>pool id</td>
    <td>Bech32 encoded pool id</td>
    <td>pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy</td>
  </tr>
  <tr>
    <td>tx count</td>
    <td>Number of transactions in the block</td>
    <td>1</td>
  </tr>
  <tr>
    <td>size</td>
    <td>Block size in bytes</td>
    <td>12000</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Block number</td>
    <td>15243593</td>
  </tr>
  <tr>
    <td>total fees</td>
    <td>Total fees within the block in Lovelaces</td>
    <td>592661</td>
  </tr>
  <tr>
    <td>total output</td>
    <td>Total output within the block in Lovelaces</td>
    <td>128314491794</td>
  </tr>

</table>

### Delegation event

<table>
  <tr>
    <th>Field</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>pool id</td>
    <td>Bech32 encoded pool id of delegated stake pool</td>
    <td>pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy</td>
  </tr>
</table>

## JSONPath query

[JSONPath](https://goessner.net/articles/JsonPath/) is a query language for JSON, similar to XPath for XML. JSONPath defines a string syntax for selecting and extracting values within a JSON.
You can make use of JSONPath query to specify the JSON field that should be extracted and matched against a specified value.

:::tip
To help you prepare the query use built-in JSONPath Query editor. The editor is preloaded with a sample data. It matches your JSONPath query and shows the extracted field value in real time.
:::

You can match all types of values: strings, numbers, booleans, floats and null. Numeric values are automatically detected making use of operators such as <, <=, >, >= possible.
If the extracted value is an array then only one of the array's items needs to match the specified value in order to satisfy the condition.

<!-- To match null type "null" in the input. -->

:::note
Note that evaluation expressions are disabled.
:::

### Examples

#### Transaction minting new assets

Sends a request to the endpoint every time a new asset is minted or burned.

- Trigger event: Transaction
- JSONPath Query: `$.tx.asset_mint_or_burn_count`
- Operator: `>`
- Value to match: `0`

<img src={require('@site/static/img/webhooks/conditions-example-mint.png').default} />

#### Transaction consumed specific UTXO

Sends a request to the endpoint once the UTXO (transaction's hash) is used as an input in another transaction.

- Trigger event: Transaction
- JSONPath Query: `$.inputs..tx_hash`
- Operator: `=`
- Value to match: `<TX-HASH>`

<img src={require('@site/static/img/webhooks/conditions-example-utxo.png').default} />

#### Stake Pool saturation over 90%

Sends a request for every delegation which results in stake pool saturation being above 90 %.

- Trigger event: Delegation
- JSONPath Query: `$.pool.live_saturation `
- Operator: `>`
- Value to match: `0.9`

<img src={require('@site/static/img/webhooks/conditions-example-pool-saturation.png').default} />
