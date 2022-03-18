---
title: Go
id: golang
slug: /sdks-golang
---

## About

Our Go SDK, [blockfrost-go](https://github.com/blockfrost/blockfrost-go) requires at least Go 1.17 in order to work.

## Installation

[![GoDoc](https://godoc.org/github.com/blockfrost/blockfrost-go?status.svg)](https://godoc.org/github.com/blockfrost/blockfrost-go)

`blockfrost-go` can be installed through go get

```console
$ go get https://github.com/blockfrost/blockfrost-go
```

## Usage

### Cardano API

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/blockfrost/blockfrost-go"
)

func main() {
	api, err := blockfrost.NewAPIClient(
		blockfrost.APIClientOptions{
            ProjectID: "YOUR_PROJECT_ID_HERE", // Exclude to load from env:BLOCKFROST_PROJECT_ID
        },
	)
	if err != nil {
		log.Fatal(err)
	}

	info, err := api.Info(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("API Info:\n\tUrl: %s\n\tVersion: %s", info.Url, info.Version)
}
```

### IPFS

```go
package main

import (
	"context"
	"flag"
	"fmt"
	"log"

	"github.com/blockfrost/blockfrost-go"
)

var (
	fp = flag.String("file", "", "Path to file")
)

func main() {
	flag.Parse()
	// Load project_id from env:BLOCKFROST_IPFS_PROJECT_ID
	ipfs := blockfrost.NewIPFSClient(blockfrost.IPFSClientOptions{})

	ipo, err := ipfs.Add(context.TODO(), *fp)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("IPFS Object: %+v\n", ipo)

	// Pin item to avoid being garbage collected.
	pin, err := ipfs.Pin(context.TODO(), ipo.IPFSHash)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Pin: %+v", pin)
}
```

More examples of usage can be found in [`example`](https://github.com/blockfrost/blockfrost-go/tree/master/example) folder.
