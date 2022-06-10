---
title: Using Webhooks
id: using-webhooks
---

## Set up your first Secure Webhook

### Create new Secure Webhook

Set up a new Secure Webhook in [Blockfrost Dashboard](https://blockfrost.io/dashboard). In the webhook settings select the event your app needs and create necessary [Trigger conditions](./webhooks-conditions).

The webhook's endpoint should be set to an URL where you will process the events sent via webhook request. If you do not have your backend exposed to the web follow steps in [Test your webhook](using-webhooks#test-your-webhook) to test with a web server running on your local machine.

### Process a webhook request

Create a HTTP endpoint on your backend where you will process incoming events and trigger actions you want to execute.
The endpoint must accept `POST` requests with a data in JSON format and return a successful status code (`2xx`).

Each request's body is an object with several fields. The event type is stored in `type` field. The event itself is included in `payload` field. For the complete structure of a webhook request see [Events overview](./webhooks-events).

### Check signatures

Don't forget to verify that the event originated from Blockfrost, not a third party just pretending to be Blockfrost. See [Check signatures](./webhooks-signatures).

### Test your webhook

#### Webhook.site

The easiest way to explore the data sent via a webhook is to point it to a service such as [Webhook.site](https://webhook.site).
It generates a random URL and shows every request sent to this address along with the request's body.

#### Local web server

In order to test Secure Webhooks with your endpoint implementation running on your local HTTP dev server you need to expose it to the web. Fortunately a service like [Loophole.cloud](https://loophole.cloud/) will set it up for you.

Follow [Loophole documentation](https://loophole.cloud/docs) to download the CLI or the Desktop GUI app, create an account and expose your local HTTP server.

:::note Example
To expose local web server running on port 3000 via CLI run command `loophole http 3000`.
In the Webhook settings set the webhook's endpoint to the URL you will see in the output.

```
$ loophole http 3000
Loophole - End to end TLS encrypted TCP communication between you and your clients
Registering your domain... Success!
Starting local proxy server...  Success!
Initializing secure tunnel...  Success!

Forwarding https://1a4ab363d5cfd01cccc9fba73777770c.loophole.site -> http://127.0.0.1:3000
```

:::

## Rollbacks and a required number of confirmations

Events are send to your webhook endpoint after reaching the number of confirmations you specified in Secure Webhook Settings.

It may happen that Cardano network rollbacks few blocks, invalidating the event that has been sent. Due to rollbacks you may receive the same event multiple times.

:::note Example
Let's say you set up a Secure Webhook for a transaction event with the number of required confirmations set to 0. The transaction you are interested in gets included in a block, thus you will be notified about the transaction. Then the block is rolled back and the same transaction is included in a new block. You will receive another transaction event with the same transaction hash, but the hash of the block in which the transaction was included will differ from the first event).
:::

We recommend verifying that the event you received has not been rolled back or increasing the number of required confirmations before the event is sent to your endpoint.

## Retries

In case of your webhook endpoint is responding with one of following error status codes 400, 408, 413, 429, 500, 502, 503, 504, 521, 522 or 524 Blockfrost will resend the request 2 more times with few seconds delay between each request. Body of the request is the same between retries, the ID of the retried request will be the same as the ID of the original request that have failed.

:::tip
To help you with troubleshooting problems with your endpoint check the list of recent failed requests in Secure Webhook settings in [Blockfrost Dashboard](https://blockfrost.io/dashboard).
:::

If your webhook endpoint doesn't respond with a successful status code (`2xx`) within few seconds then the request will time out.

:::caution
To prevent unexpected problems your application should be prepared for a scenario in which the webhook request never arrives.
To keep your app fully functioning and still provide a good user experience you can manually fetch the data via traditional [Blockfrost API](https://docs.blockfrost.io).
:::
