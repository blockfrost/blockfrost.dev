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

We recommend verifying that the event you received has not been rolled back or increasing the number of required confirmations before the event is sent to your endpoint.

## Retries

In case of your Webhook endpoint is responding with one of following error status codes 400, 408, 413, 429, 500, 502, 503, 504, 521, 522 or 524 Blockfrost will resend the request 2 more times with few seconds delay between each request. Body of the request is the same between retries, the ID of the retried request will be the same as the ID of the original request that have failed.

:::tip
To help you with troubleshooting problems with your endpoint check the list of recent failed requests in Secure Webhook settings in [Blockfrost Dashboard](https://blockfrost.io/dashboard).
:::

If your webhook endpoint doesn't quickly respond with a status code `200 OK` then the request will time out.

:::caution
To prevent unexpected problems your application should be prepared for a scenario in which the webhook request never arrives.
To keep your app fully functioning and still provide a good user experience you can manually fetch the data via traditional [Blockfrost API](https://docs.blockfrost.io).
:::
