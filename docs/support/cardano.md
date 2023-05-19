---
title: Cardano
id: cardano
---

Before contacting support, please try to go through the list of most common support cases. Thanks a million!

## Querying address returns 404 Not Found, but my address is valid!

Our API returns `404 Not Found` for any resource that does not exist on chain at the moment, even when in theory, it could exist. These are typically addresses that haven't been used yet. We can't know that someone has generated a new address unless we see it on blockchain. Once someone makes a transaction, it will appear on blockchain and hence in our API. And it'll stay there forever, even with 0 balance. The thing is, there's an infinite number of addresses which can be generated. And unless they make a transaction of some sort, they are basically "non-existent".

Some platforms (such as Cardanoscan) simply check the address for a valid checksum and if the check passes, they'll display it with 0 balance, even though there haven't been any transactions (and may not ever be).

We have decided that returning `404 Not Found` is a better and more correct way. In case you ask for a non-valid (non valid checksum) address, we will let you know in form of `400 Bad Request` with message: "Invalid address for this network or malformed address format."

This way, we leave it up to the user to decide how to handle it. And if you decide you don't want to deal with it, we got you covered, as our SDK handles it for you.

:::info
TL;DR:
404 - valid addresses not seen on the blockchain yet (no txs)

400 - non-valid (incorrect or malformed) addresses
:::

## Pool.pm is able to display all my assets from a single address, but you only display assets on that address!

This can be a little bit confusing, but there's a fundamental difference between an address and an account (i.e. wallet), that some tools such as pool.pm cover up.

What these tools do, is that they take an address and extract the stake portion of it. Then, they query this stake portion, basically the account / wallet and come up with all associated addresses and hence also assets. This has some limitations/consequences such as inclusion of mangled addresses.

Technical details have been described by our founder, Marek, [here](https://cardano.stackexchange.com/questions/2003/extract-the-bech32-stake-address-from-a-shelly-address-in-javascript).

However, since we don't know what may your intentions be, we allow you to both query an address and query an account:

single address: https://docs.blockfrost.io/#tag/Cardano-Addresses/paths/~1addresses~1{address}/get

whole account: https://docs.blockfrost.io/#tag/Cardano-Accounts/paths/~1accounts~1{stake_address}~1addresses~1assets/get (read the caution!)

:::caution
Be careful, as an account could be part of a mangled address, but that does not necessarily mean the addresses are owned by the same user as the account.
:::

:::info
TL;DR:

We don't do any automagical detections and conversions, we let you decide, what you want to do.

If you query an address and its assets, we will display just those assets that are associated with that particular address.

If you want to list all assets of an account, use call in the accounts category, just read the sidenote.
:::

## Pool.pm uses fingerprints for querying assets, why don't you too?

That's right, we currently only allow only `policy_id+hex_encoded_asset_name` as valid input. Why?

TL;DR: It's the safest option.

`Fingerprint`, introduced in [CIP-14](https://cips.cardano.org/cips/cip14/), is a tradeoff between readability and security.
Fingerprints are shorter hashes. By definition, hashes are not unique. Therefore, it is possible to create two different assets with the same hash (`fingerprint`).
Although time-consuming and expensive (2^80 operations), it is not impossible for a malicious attacker to forge an asset with identical fingerprint to some other asset. It's only a matter of price and/or determination. At this moment, the risk of exploiting this property is substantially low, but may increase with the wider adoption of Cardano.

Therefore, we do not encourage usage of fingerprints and only allow the whole policy+name as input.

:::caution
For more information about security considerations, please see [CIP-14](https://cips.cardano.org/cips/cip14/).
:::

## I've seen some sites determine a stake key from an unused address. This doesn't seem possible through the your API!

That's correct, as stated previously, we only display addresses that are present on the blockchain. If you want to determine the stake key from an address, feel free to give [this](https://cardano.stackexchange.com/questions/2003/extract-the-bech32-stake-address-from-a-shelly-address-in-javascript) a go.

## It seems that your API is stuck, the list of the results has stopped growing!

You're most likely missing the pagination parameter. We [use pagination](/docs/start-building#key-concepts).

We display 100 items per default and just keep in mind that pagination starts from page 1, unlike traditional indexing.

Just append `?page=2` or appropriate page number right at the end of your call, e.g.:

`https://cardano-mainnet.blockfrost.io/api/v0/pools/pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy/history?page=2`

:::tip
You can also use `?order=desc` in most calls to get the latest results first.

It is also possible to combine more query parameters, e.g. `?page=2&count=1&order=desc`
:::
