---
title: Tips and tricks
id: tips-tricks
---

Using Blockfrost strongly depends on your project and its use cases.

## Caching

It might be a good idea to add an HTTP caching layer between your application and Blockfrost. While doing this, keep in mind that Blockfrost rate limiting is tied to the specific IP address, so you might want to increase the number of your backends or [upgrade](/docs/overview/plans-and-billing#upgrading-plan) to an enterprise plan to whitelist your IP addresses. Learn more about this in the [handling common errors](/docs/start-building#handling-common-errors) section.

There are two hard problems in computer science: cache invalidation, naming things, and off-by-1 errors. Which means, the cache invalidation is very specific to your use case. You might want to invalidate your cache when a new block arrives or only when a new block consumes an UTxO you care about.
