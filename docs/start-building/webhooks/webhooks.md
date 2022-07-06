---
title: Secure Webhooks
id: webhooks
---

## What are webhooks

Webhooks enable Blockfrost to push real-time notifications to your application. Blockfrost Secure Webhooks use HTTP POST requests to send events to your application endpoint in a JSON format. You can then use these events to execute actions in your backend systems.

## Why use webhooks over traditional API

Rather than periodically fetching a blockchain data (polling) and processing all the data, which may not be relevant to your application, you can set up Blockfrost Secure Webhooks. With Secure Webhooks, you will only be notified when an event that matters to your application occurs, making it faster and requiring less effort on your end.

## Create your first Secure Webhook

Setting up a webhook is easy! Here's an overview of the steps you need to take:

1. Figure out what events and under what conditions your application needs to be notified about (transactions to a specific address, transactions with a specific asset, minted blocks, delegations to a stake pool...). See [Events overview](./webhooks-events) for a breakdown of supported events and [Trigger conditions](./webhooks-conditions) for more information about trigger conditions.
2. Create an HTTP endpoint on your backend where you will process incoming events and trigger actions you want to execute. Payload structure for each event can be found in [Events overview](./webhooks-events).
3. Don't forget to verify that the event originated from Blockfrost, not a third party. See [Check signatures](./webhooks-signatures).
4. Deploy your webhook endpoint so it becomes accessible via HTTPS URL from the Internet.
5. Set up a new Secure Webhook in [Blockfrost Dashboard](https://blockfrost.io/dashboard). In the webhook settings select the event you are interested in and create the necessary [Trigger conditions](./webhooks-conditions).

To learn more, see [Using webhooks](./using-webhooks).
