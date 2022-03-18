---
title: Kotlin
id: kotlin
slug: /sdks-kotlin
---

## About

Our Kotlin SDK, [blockfrost-kotlin](https://github.com/blockfrost/blockfrost-kotlin) requires at least Kotlin 1.5.30 and Gradle 7.2 in order to work.

## Installation

[![](https://jitpack.io/v/blockfrost/blockfrost-kotlin.svg)](https://jitpack.io/#blockfrost/blockfrost-kotlin)

Currently, Kotlin SDK is distributed via [JitPack](https://jitpack.io/#blockfrost/blockfrost-kotlin):

Step 1. Add the JitPack repository to your build file

```groovy
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

Step 2. Add the dependency to your module `build.gradle`

```groovy
dependencies {
    implementation 'com.github.blockfrost:blockfrost-kotlin:0.0.4'
}
```

For usage with Maven and other tools, check out the [JitPack page](https://jitpack.io/#blockfrost/blockfrost-kotlin).

Check out [build.gradle](https://github.com/blockfrost/blockfrost-kotlin/blob/master/example/app/build.gradle) of an Example application using Kotlin SDK library.

## Usage

API is asynchronous, coroutine based.

```kotlin
import io.blockfrost.sdk_kotlin.api.CardanoAddressesApi
import io.blockfrost.sdk_kotlin.infrastructure.BlockfrostConfig

// Use default configuration, mainnet, project_id loaded from BF_PROJECT_ID env var
val api = CardanoAddressesApi(config = BlockfrostConfig.defaulMainNetConfig)

// coroutine call, returns model object
val details = api.getAddressDetails("addr1q8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkw9etpkygj5x4kjpym5h35cvj5zw83s6nvw5fnrnck4cmvshkfm4y")
```

Default configuration for IPFS, project ID is loaded from env var `BF_IPFS_PROJECT_ID`

```kotlin
val apiIpfsAdd = IPFSAddAPI(config = BlockfrostConfig.defaultIpfsConfig)
```

You can also define API-specific configuration

```kotlin
val config = BlockfrostConfig(
    baseUrl = BlockfrostConfig.UrlIpfs,
    projectId = BlockfrostConfig.getEnvProjectIdIpfs(),
    socketTimeoutMilli = 90_000,
)
val apiIpfsAdd = IPFSAddAPI(config = config)
```

Check out [Example application](https://github.com/blockfrost/blockfrost-kotlin/tree/master/example) or [integration tests](https://github.com/blockfrost/blockfrost-kotlin/tree/master/sdk/src/integration-test/kotlin/io/blockfrost/sdk_kotlin/itests) for more usage examples.

### Fetch All methods

Methods with paging parameters (count, page, order) have paging methods enabling to load all results, iterating over all pages in the background.
For example

```kotlin
val api = CardanoAddressesApi(config = BlockfrostConfig.defaulMainNetConfig)
val flow: Flow<AddressTransactionsContent> = api.getAddressTransactionsAll(address = "addr1q8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkw9etpkygj5x4kjpym5h35cvj5zw83s6nvw5fnrnck4cmvshkfm4y")
flow.collect {
    println("Transaction: $it")
}
```

OperationAll methods return a [Flow](https://kotlinlang.org/docs/flow.html) object enabling processing of individual results as they are produced by the loading method.
I.e., once first page is loaded with results, consumer can immediately start processing the results form the flow without need to wait for downloading all pages.
It is also possible to stop page download on a consumer side.

### Fetch AllList methods

Alternative to fetch All methods are fetch AllList methods. E.g.,

```kotlin
val api = CardanoAddressesApi(config = BlockfrostConfig.defaulMainNetConfig)
val res: List<AddressTransactionsContent> = api.getAddressTransactionsAllList(address = "addr1q8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkw9etpkygj5x4kjpym5h35cvj5zw83s6nvw5fnrnck4cmvshkfm4y")
```

The method returns list once all pages are downloaded.

## Build

First, create the gradle wrapper script:

```
gradle wrapper
```

Then, run:

```
./gradlew check assemble
```

This runs all tests and packages the library.

## Features/Implementation Notes

- Supports JSON inputs/outputs, File inputs, and Form inputs.
- Supports collection formats for query parameters: csv, tsv, ssv, pipes.
- Some Kotlin and Java types are fully qualified to avoid conflicts with types defined in OpenAPI definitions.
- Implementation of ApiClient is intended to reduce method counts, specifically to benefit Android targets.
