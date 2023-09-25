---
title: IPFS (InterPlanetary File System)
id: ipfs
---

[IPFS](https://ipfs.io/) content addressing enables you to store large files off-chain and put immutable, permanent links in transactions — timestamping and securing content without having to put the data itself on-chain.

## Concepts

For a detailed overview of IPFS, please visit their fantastic [docs](https://docs.ipfs.io/concepts/).

**CID** - content identifier (CID), is a self-describing content-addressed identifier. It identifies a resource on IPFS network. We sometime refer to the `CID` as `IPFS_HASH`.

**Adding** a file - When you add a file to IPFS, your file is split into smaller chunks, cryptographically hashed, and given a unique fingerprint, the CID.

**Pinning** a file - Pinning is the mechanism that allows you to tell IPFS to always keep a given object somewhere. By default, IPFS has a fairly aggressive caching mechanism that will keep an object local for a short time after you perform any IPFS operation on it, but these objects get garbage-collected regularly. To prevent that garbage collection, simply pin the CID you care about.

## Usage

This section covers using IPFS in Blockfrost.

:::note
Don't forget to `export` the `PROJECT_ID` first when trying examples in this guide!

```bash
# Don't forget to replace the PROJECT_ID with yours!
export PROJECT_ID=ipfsEnrkKWDwlA9hV4IajI4ILrFdsHJpIqNC
```

:::

### Adding a file

Navigate to the folder where the file you want to upload resides. In this case, we're in root of [this repository](https://github.com/blockfrost/blockfrost.dev) this repository and the file we're uploading is Blockfrost logo, located at `static/img/logo.svg`.

```bash

curl "https://ipfs.blockfrost.io/api/v0/ipfs/add" \
  -X POST \
  -H "project_id: $PROJECT_ID" \
  -F "file=@./static/img/logo.svg"

{"name":"logo.svg","ipfs_hash":"QmUCXMTcvuJpwHF3gABRr69ceQR2uEG2Fsik9CyWh8MUoQ","size":"5617"}

```

Once we have uploaded the file, we get back the `name`, `ipfs_hash` (CID) and its `size` in Bytes. The most important part, of course, is the `ipfs_hash` or CID, however you want to call it. We'll be using this in all our other calls.

:::warning
Added files which are not pinned will be garbage collected. If you wish them to persist, always pin them immediately after the upload and verify that they've been successfully pinned after a few minutes.
:::

### Pinning a file

We can check the list of currently pinned files by running the following command:

```bash

curl "https://ipfs.blockfrost.io/api/v0/ipfs/pin/list" \
  -H "project_id: $PROJECT_ID"

[]

```

The list is empty, since we haven't pinned anything yet. Let's pin the file we've just uploaded and list the pins. We will have to use the `ipfs_hash` from the add command when pinning.

```bash

curl "https://ipfs.blockfrost.io/api/v0/ipfs/pin/add/QmUCXMTcvuJpwHF3gABRr69ceQR2uEG2Fsik9CyWh8MUoQ" \
  -X POST \
  -H "project_id: $PROJECT_ID" \

{
  "ipfs_hash": "QmUCXMTcvuJpwHF3gABRr69ceQR2uEG2Fsik9CyWh8MUoQ",
  "state": "queued"
}

curl "https://ipfs.blockfrost.io/api/v0/ipfs/pin/list" \
  -H "project_id: $PROJECT_ID"

[
  {
    "time_created": 1647366126469,
    "time_pinned": 1647366147642,
    "ipfs_hash": "QmUCXMTcvuJpwHF3gABRr69ceQR2uEG2Fsik9CyWh8MUoQ",
    "size": "5617",
    "state": "queued"
  }
]

```

Pinning will take some time and until it's finished, the file will be `queued` at first.

:::caution
Files queued for pinning may be garbage collected. It's best practice to wait a while and verify the status will change to `pinned` before assuming the resource is persistently stored on IPFS.
:::

After a while, we may see that the resource has been properly pinned.

```bash
curl "https://ipfs.blockfrost.io/api/v0/ipfs/pin/list" \
  -H "project_id: $PROJECT_ID"

[
  {
    "time_created": 1647366126469,
    "time_pinned": 1647366147642,
    "ipfs_hash": "QmUCXMTcvuJpwHF3gABRr69ceQR2uEG2Fsik9CyWh8MUoQ",
    "size": "5617",
    "state": "pinned"
  }
]

```

### Unpinning a file

If you want to reclaim space or don't care about the files being garbage collected anymore, you can remove them.

```bash
curl "https://ipfs.blockfrost.io/api/v0/ipfs/pin/remove/QmUCXMTcvuJpwHF3gABRr69ceQR2uEG2Fsik9CyWh8MUoQ" \
  -X POST \
  -H "project_id: $PROJECT_ID" \

[]

```

## Use cases

### NFTs

IPFS is great for NFTs as it provides a way of storing and serving off-chain, immutable data in a decentralized way.

A typical workflow would be something like this:

- [Upload](/start-building/ipfs/#adding-a-file) your image to IPFS and save your `ipfs_hash`
- [Pin](/start-building/ipfs/#pinning-a-file) your image and ake sure it's pinned
- [Create an NFT](https://developers.cardano.org/docs/native-tokens/minting-nfts) with IPFS data in its metadata file

### Decentralized everything

We suggest reading [this](https://docs.ipfs.io/concepts/usage-ideas-examples/) IPFS docs article on more ideas and examples of how IPFS can help creating a more decentralized world. Add blockchain and you also get immutability.

A typical way of approaching this would be putting IPFS links in metadata of transactions on blockchain.

## FAQ

For more information related to IPFS in Blockfrost, please see our [IPFS FAQ](/support/ipfs).
