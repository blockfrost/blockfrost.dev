---
title: Tor hidden service
id: tor
---

Tor hidden service routes requests to Blockfrost's API, acting as a privacy-respecting bridge. This allows anonymous, secure access to Cardano services.

By utilizing Tor hidden services, you can mask you online identity and anonymize your connection to Blockfrost and Blockfrost API. This added layer of privacy ensures that sensitive information, such as transaction details or account information, remains confidential.

For those of you extra concerned about privacy.

:::note
To access Tor hidden address, you have to use [Tor service](https://www.torproject.org/download/tor/) or [Tor browser](https://www.torproject.org/download/)
:::

## Dashboard

The dashboard onion address is <http://blockfrostvb56g4cy6horwhgkle36z3yn5knk4cirg64pwhrm6xefad.onion>

## Networks - API

All Cardano network (including testnet) are currently supported.

| _Name_            | _API Endpoint (network + version)_                |
| ----------------- | ------------------------------------------------- |
| Cardano mainnet   | <http://cardano-mainnet.blockfrostvb56g4cy6horwhgkle36z3yn5knk4cirg64pwhrm6xefad.onion/api/v0/>   |
| Cardano preprod   | <http://cardano-preprod.blockfrostvb56g4cy6horwhgkle36z3yn5knk4cirg64pwhrm6xefad.onion/api/v0/>   |
| Cardano preview   | <http://cardano-preview.blockfrostvb56g4cy6horwhgkle36z3yn5knk4cirg64pwhrm6xefad.onion/api/v0/>   |
| IPFS              | <http://ipfs.blockfrostvb56g4cy6horwhgkle36z3yn5knk4cirg64pwhrm6xefad.onion/api/v0/>              |


:::note
Please remember to use HTTP instead of HTTPS when accessing Blockfrost through Tor.
:::

## Troubleshooting

Have a look at the notes above or check out the [our Tor support page](/support/tor).

