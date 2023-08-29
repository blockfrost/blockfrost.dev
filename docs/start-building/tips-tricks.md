---
title: Tips and tricks
id: tips-tricks
---

Using Blockfrost strongly depends on your project and its use cases.

## Securing the API key

The best course of action is to set up an application backend. With this architecture, your `project_id` is stored privately on your backend. This also allows you to introduce another layer of protection in your backend/app, that you fully control, such a domain validation, user login, endpoint restriction, rate limiting on per-user basis and more.

We don't recommend running an app without an app backend as this will most likely leak your `project_id`.

## Caching

It might be a good idea to add an HTTP caching layer between your application and Blockfrost. While doing this, keep in mind that Blockfrost rate limiting is tied to the specific IP address, so you might want to increase the number of your backends or [upgrade](/overview/plans-and-billing#upgrading-plan) to an enterprise plan to whitelist your IP addresses. Learn more about this in the [handling common errors](/start-building#handling-common-errors) section.

There are two hard problems in computer science: cache invalidation, naming things, and off-by-1 errors. Which means, the cache invalidation is very specific to your use case. You might want to invalidate your cache when a new block arrives or only when a new block consumes an UTxO you care about.
