---
title: IPFS
id: ipfs
---

Before contacting support, please try to go through the list of most common support cases. Thanks a million!

## I can't upload a file to IPFS

Are you using `POST` method? IPFS add is one of not so many calls which we use `POST` for. See [IPFS usage guide](/start-building/ipfs/#usage).

## What happens to my pins when I delete my account?

Unfortunately, your pins will be [deleted and garbage collected](/overview/plans-and-billing#deleting-a-project) over time.Before deleting a project, please make sure that your data is backed up or pinned through another project.

## How long does it take before a file is pinned?

It usually takes a few minutes but can be longer during peaks. If a pin takes more than an hour and the file is not large, please, [let us know](/support#contacting-support).

## Can I assume file to be pinned if it's still just `queued`?

No. If a file is in `queued` state, we [strongly advise](/start-building/ipfs/#pinning-a-file) to wait for its state to change to `pinned` before assuming that file to be on the IPFS network.
