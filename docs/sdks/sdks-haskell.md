---
title: Haskell
id: haskell
slug: /sdks-haskell
---

## About

Our Haskell SDK, [blockfrost-haskell](https://github.com/blockfrost/blockfrost-haskell) comprises of API definition, data types, client and utilities for working with Blockfrost.

- [`blockfrost-api`](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-api/#readme)
  Types, sample data, API definition and tests. See the [`README.md`](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-api/#readme)
  for quick tutorial
- [`blockfrost-client-core`](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-client-core/#readme)
  Instances and helpers shared by all clients.
- [`blockfrost-client`](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-client/#readme)
  Blockfrost client for use with `mtl`. Its [`README.md`](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-api/#readme)
  contains an introduction and usage examples.
- [`blockfrost-pretty`](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-pretty/#readme)
  Pretty printing utilities for pretty printing Ada values
  and various Blockfrost types.

## Installation

Packages are available on Hackage, you only need to add blockfrost-client to your package dependencies.

Haddocks available on Hackage:

- [![Hackage blockfrost-api](https://img.shields.io/hackage/v/blockfrost-api.svg?logo=haskell&style=flat-square&label=blockfrost-api)](https://hackage.haskell.org/package/blockfrost-api)
- [![Hackage blockfrost-client](https://img.shields.io/hackage/v/blockfrost-client.svg?logo=haskell&style=flat-square&label=blockfrost-client)](https://hackage.haskell.org/package/blockfrost-client)
- [![Hackage blockfrost-pretty](https://img.shields.io/hackage/v/blockfrost-pretty.svg?logo=haskell&style=flat-square&label=blockfrost-pretty)](https://hackage.haskell.org/package/blockfrost-pretty)

## Development setup

You can either work within this repository using plain `cabal` or in combination
with `nix`.

### `cabal`

If you already have `GHC` and `cabal` installed:

```bash
git clone https://github.com/blockfrost/blockfrost-haskell
cd blockfrost-haskell
cabal update
cabal build all
cabal repl blockfrost-client
```

Note: Due to TLS support, you might need to
provide `zlib` headers if compilation
of `http-client-tls` fails. (On NixOS this is `nix-shell -p zlib.dev`).

### `nix`

Using `nix-shell`, you can obtain a preconfigured environment
with `GHC` and `cabal`:

```bash
git clone https://github.com/blockfrost/blockfrost-haskell
cd blockfrost-haskell
nix-shell
cabal build all
cabal repl blockfrost-client
```

## Usage

See [blockfrost-client](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-client/#readme) for a tutorial and usage examples.

Readme of [blockfrost-api](https://github.com/blockfrost/blockfrost-haskell/blob/master/blockfrost-api/#readme) contains a short primer for working with Blockfrost types, data samples and monetary values.
