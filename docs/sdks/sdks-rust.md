---
title: Rust
id: rust
slug: /sdks-rust
---

## About

Our Rust SDK is available here [blockfrost-rust](https://github.com/blockfrost/blockfrost-rust).

## Installation

[![Rust Latest Release](https://img.shields.io/crates/v/blockfrost?color=2E83FA)](https://crates.io/crates/blockfrost)

Add to your project's `Cargo.toml`:

```toml
blockfrost = "0.2.0"
```

## Usage

All the examples are located at the [`examples/`] folder.

You might want to check [`all_requests.rs`] and [`ipfs.rs`].

Here is [`simple_request.rs`] with the basic setup necessary and no settings
customization:

```rust
use blockfrost::{load, BlockFrostApi};

fn build_api() -> blockfrost::Result<BlockFrostApi> {
    let configurations = load::configurations_from_env()?;
    let project_id = configurations["project_id"].as_str().unwrap();
    let api = BlockFrostApi::new(project_id, Default::default());
    Ok(api)
}

#[tokio::main]
async fn main() -> blockfrost::Result<()> {
    let api = build_api()?;
    let genesis = api.genesis().await?;

    println!("{:#?}", genesis);
    Ok(())
}
```

[`examples/`]: https://github.com/blockfrost/blockfrost-rust/tree/master/examples
[`all_requests.rs`]: https://github.com/blockfrost/blockfrost-rust/blob/master/examples/all_requests.rs
[`ipfs.rs`]: https://github.com/blockfrost/blockfrost-rust/blob/master/examples/ipfs.rs
[`simple_request.rs`]: https://github.com/blockfrost/blockfrost-rust/blob/master/examples/simple_request.rs
