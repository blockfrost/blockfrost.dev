---
title: Using Webhooks
id: using-webhooks
---

## Rollbacks and a required number of confirmations

Events are send to your webhook endpoint after reaching the number of confirmations you specified in Secure Webhook Settings.

It may happen that Cardano network rollbacks few blocks, invalidating the event that has been sent. Due to rollbacks you may receive the same event multiple times.

:::note Example
Let's say you set up a Secure Webhook for a transaction event with the number of required confirmations set to 0. The transaction you are interested in gets included in a block, thus you will be notified about the transaction. Then the block is rolled back and the same transaction is included in a new block. You will receive another transaction event with the same transaction hash, but the hash of the block in which the transaction was included will differ from the first event).
:::

We recommend verifying that the event you received have not been rolled back or increasing the number of required confirmations before the event is send to your endpoint.

## Retry on failed request
