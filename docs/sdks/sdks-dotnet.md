---
title: .NET
id: dotnet
slug: /sdks-dotnet
---

## About

Our .NET SDK, [blockfrost-dotnet](https://github.com/blockfrost/blockfrost-dotnet) requires at least .NET 5.0 in order to work.

## Installation

The SDK is hosted on [nuget.org](https://www.nuget.org/packages/Blockfrost.Api/latest), so you can directly import it using your favorite package manager.

```console
$ dotnet new console -n blockfrost-client
$ cd blockfrost-client
$ dotnet add package Blockfrost.Api --version 0.0.4
```

### Command line tool

Before you install the command line tool, make sure the environment variables `BFCLI_API_KEY` and `BFCLI_NETWORK` exist.

```ps
$> $env:BFCLI_NETWORK
testnet

$> $env:BFCLI_API_KEY
yourawesomeapikeyforblockfrostio
```

#### Install the command line tool

```ps
$> pwd
{$SolutionDir}\src\Blockfrost.Cli

$> dotnet tool install bfcli --add-source nupkg --version 0.0.xyz
<!-- $> dotnet tool install bfcli --version 0.0.4 -->
Tool 'bfcli' (version '0.0.xyz') was successfully installed.

$> dotnet bfcli -v
bfcli v0.0.xyz
A .NET Cross Platform Tool / Console App for interacting with Blockfrost API.

USAGE: bfcli (OPTION | COMMAND)

Available options:
    -v, --version   Show the bfcli version
    -h, --help      Show this help text

Available commands:
    health

$> dotnet bfcli health | ConvertFrom-Json

is_healthy
----------
      True
```

## Usage

Using the SDK is pretty straight-forward as you can see from the following example.

### Cardano

```cs
using System.IO;
using Blockfrost.Api;
using Blockfrost.Api.Extensions;
using Microsoft.Extensions.DependencyInjection;

var apiKey = "YOUR_BLOCKFROST_PROJECT_ID";
var network = "NETWORK_OF_THE_PROJECT_ID";
var sender_address = "SENDER_ADDR";
var receiver_address = "RECEIVER_ADDR";
var signedTx = File.ReadAllText("path/to/your/signed/transaction");

var provider = new ServiceCollection().AddBlockfrost(network, apiKey).BuildServiceProvider();
var blockService = provider.GetRequiredService<IBlockService>();
var addressService = provider.GetRequiredService<IAddressService>();
var transactionService = provider.GetRequiredService<ITransactionService>();

var utxoSender = await addressService.UtxosAllAsync(sender_address,100,0,ESortOrder.Asc).ConfigureAwait(false);
int totalSender = utxoSender.Sum(m => m.Amount.Sum(a => int.Parse(a.Quantity)));
System.Console.WriteLine($"Sender Total: {totalSender} lovelace");

var utxoReceiver = await addressService.UtxosAllAsync(receiver_address,100,0,ESortOrder.Asc).ConfigureAwait(false);
int totalReceiver = utxoReceiver.Sum(m => m.Amount.Sum(a => int.Parse(a.Quantity)));
System.Console.WriteLine($"Receiver Total: {totalReceiver} lovelace");

var tip = await blockService.GetLatestBlockAsync();
int? slot = tip.Slot;

Console.WriteLine($"Tip now at Epoch {tip.Epoch} Slot {tip.Slot} Block {tip.Height}");
Console.WriteLine(signedTx);

var txid = await transactionService.SubmitAsync(signedTx);

Console.WriteLine($"Your Transaction was transmitted to the {network}");
Console.WriteLine($"https://explorer.cardano-{network}.iohkdev.io/en/transaction?id={txid}");

while(slot == tip.Slot)
{
    Console.WriteLine("Waiting for next block...");
    await Task.Delay(TimeSpan.FromSeconds(3));
    tip = await blockService.GetLatestBlockAsync();
}

Console.WriteLine($"Tip now at Epoch {tip.Epoch} Slot {tip.Slot} Block {tip.Height}");
```

```sh
$ dotnet run
Sender Total: 988258310 lovelace
Receiver Total: 10000000 lovelace
Tip now at Epoch 152 Slot 35399692 Block 2855047
{
    "type": "Tx MaryEra",
    "description": "",
    "cborHex": "83a3008182582002ffae369...c14003ce7b54b487197c40df6"
}
Your Transaction was transmitted to the testnet
https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=2b1ca81b94c5dd737fe939444264046c6fbbe96ff403e49ee99e8022b0e512bb
Waiting for next block...
Waiting for next block...
Waiting for next block...
Tip now at Epoch 152 Slot 35399711 Block 2855048
```
