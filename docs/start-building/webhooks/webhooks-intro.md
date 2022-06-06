---
title: Secure Webhooks
id: webhooks-intro
---

## What are webhooks

Webhooks enable Blockfrost to push real-time notifications to your application. Blockfrost Secure Webhooks use HTTP POST requests to send events to your application's endpoint in a JSON format. You can then use these events to execute actions in your backend systems.

## Why use webhooks over traditional API

Rather than periodically fetching for blockchain data (polling) and processing all these data, which may not be relevant for your application, you can set up Blockfrost Secure Webhooks. With Secure Webhooks you'll be notified only with the data that matters to your application making it faster and requiring less work on your end.

## Create your first Secure Webhook

Setting up a webhook is easy! Here's overview of the steps you need to take.

1. Figure out what events and under what conditions does your application need to be notified about (transactions to a specific address, transactions with a specific asset, minted blocks, delegations to a stake pool...). See [Events overview](./webhooks-events) for a breakdown of supported events and [Trigger conditions](./webhooks-conditions) for more information about trigger conditions.
2. Create a HTTP endpoint on your backend where you will process incoming events and trigger actions you want to execute. Payload structure for each event can be found in [Events overview](./webhooks-events).
3. Don't forget to verify that the event originated from Blockfrost, not a third party. See [Check signatures](./webhooks-signatures).
4. Deploy your webhook endpoint so it is accessible via HTTPS URL from the Internet.
5. Set up a new Secure Webhook in [Blockfrost Dashboard](https://blockfrost.io/dashboard). In the webhook settings select the event your app needs and create necessary [Trigger conditions](./webhooks-conditions).

To learn more, see [Using webhooks](./using-webhooks).
