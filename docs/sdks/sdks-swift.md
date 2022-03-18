---
title: Swift
id: swift
slug: /sdks-swift
---

## About

Our Swift SDK, [blockfrost-swift](https://github.com/blockfrost/blockfrost-swift) requires at least Swift 5 in order to work.

## Installation

### Swift package manager

```
dependencies: [
    .package(url: "https://github.com/blockfrost/blockfrost-swift.git", from: "0.0.6"),
],

targets: [
    .executableTarget(
        name: "Example",
        dependencies: [
            .product(name: "BlockfrostSwiftSDK", package: "blockfrost-swift"),
        ]),
]
```

### Carthage

Run `carthage update`

Cartfile

```
github "blockfrost/blockfrost-swift" ~> 0.0.6
```

### CocoaPods

Minimal pod version: 1.10+
Run `pod install`

Podfile:

```
pod 'BlockfrostSwiftSDK', '~> 0.0.6'
```

Or use GitHub, by tag:

```
pod 'BlockfrostSwiftSDK', :git => 'https://github.com/blockfrost/blockfrost-swift.git', :tag => '0.0.6'
```

or by branch:

```
pod 'BlockfrostSwiftSDK', :git => 'https://github.com/blockfrost/blockfrost-swift.git', :branch => 'master'
```

## Usage

API uses a simple completion callbacks, returning `Swift.Result<R, Error>`, where `R` is defined by the particular API call.

```swift
// import the SDK on the beginning of the file
import BlockfrostSwiftSDK

// define project-wide settings
BlockfrostStaticConfig.basePath = "https://cardano-mainnet.blockfrost.io/api/v0"  // or leave default
BlockfrostStaticConfig.projectId = "your-project-id"
let api = CardanoAddressesAPI()

_ = api.getAddressDetails(address: "addr1q8zu4smzyf2r2mfqjd6tc6vxf2p8rccdfk82ye3eut2udkw9etpkygj5x4kjpym5h35cvj5zw83s6nvw5fnrnck4cmvshkfm4y") { resp in
    switch (resp) {
    case let .failure(err):
        // TODO: handle error here, `err` contains the error
        break
    case let .success(r):
        // `r` contains result of the call, here, it is of type `AddressContentTotal`
        break
    }
}
```

Project ID can be loaded from env

```swift
BlockfrostStaticConfig.projectId = BlockfrostConfig.getEnvProjectId()  // BF_PROJECT_ID
BlockfrostStaticConfig.projectId = BlockfrostConfig.getEnvProjectIdMainnet()  // BF_MAINNET_PROJECT_ID
BlockfrostStaticConfig.projectId = BlockfrostConfig.getEnvProjectIdTestnet()  // BF_TESTNET_PROJECT_ID
BlockfrostStaticConfig.projectId = BlockfrostConfig.getEnvIpfsProjectId()  // BF_IPFS_PROJECT_ID
```

Default configuration for testnet, project ID is loaded from env var `BF_TESTNET_PROJECT_ID`

```swift
let apiAdd = CardanoAddressesAPI(config: BlockfrostConfig.testnetDefault())
```

Default configuration for IPFS, project ID is loaded from env var `BF_IPFS_PROJECT_ID`

```swift
let ipfsAdd = IPFSAddAPI(config: BlockfrostConfig.ipfsDefault())
```

You can also define API-specific configuration

```swift
let config = BlockfrostConfig()
config.basePath = BlockfrostConfig.URL_IPFS
config.projectId = BlockfrostConfig.getEnvIpfsProjectId()
config.retryPolicy = BlockfrostRetryPolicy(retryLimit: 10)    // specify custom retry policy

let ipfsAdd = apiAdd = IPFSAddAPI(config: cfg)
```

Check out [Example application](https://github.com/blockfrost/blockfrost-swift/tree/master/Example) or [integration tests](https://github.com/blockfrost/blockfrost-swift/tree/master/Tests/blockfrost-tests) for more usage examples.

### Fetch All methods

Methods with paging parameters (count, page, order) have paging methods enabling to load all results, iterating over all pages in the background.
The method returns list of all results once all pages have been downloaded.

```swift
let _ = api.getAssetHistoryAll(asset: "d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a07370616365636f696e73") { resp in
    switch (resp) {
    case let .failure(err):
        // TODO: handle error here, `err` contains the error
        break
    case let .success(r):
        // `r` contains result of the call, here, it is of type `AddressContentTotal`
        break
    }
}
```

### Advanced Fetch all

To use more advanced load-all-pages technique, you can use [PageLoader](https://github.com/blockfrost/blockfrost-swift/blob/master/BlockfrostSwiftSDK/Classes/OpenAPIs/PageLoader.swift) class.

```swift
let loader = PageLoader<AssetHistory>(batchSize: 10)
loader.loadAll({ count, page, compl in
    // PageLoader uses lambda to load particular page
    _ = api.getAssetHistory(asset: asset, count: count, page: page, order: order, apiResponseQueue: apiResponseQueue, completion: compl)
}, completion: { compl in
    // Completion handler once all pages are loaded
    // TODO: handle the results
})
```

You can handle event handler to get new page results as they are loaded:

```swift
loader.progressHandler = { event in
    switch(event){
    case .started: break
    case let .pageLoaded(page):
        print(page)  // new page loaded, type: (Int, [T]) ~ page ID and list of results
        break
    case .completed(_):
        break
    }
}
```

You can also cancel further loading:

```swift
DispatchQueue.global().async { loader.cancel() }
```

## Pod development

Lint before publishing:

```bash
pod spec lint --no-clean --verbose --use-modular-headers --allow-warnings

# or alternatively: (use_frameworks!)
pod spec lint --no-clean --verbose --use-modular-headers --use-libraries --allow-warnings
```

Publishing new version:

```bash
pod trunk push BlockfrostSwiftSDK.podspec --verbose --allow-warnings
```

Note that this pod requires CocoaPod 1.10+.
