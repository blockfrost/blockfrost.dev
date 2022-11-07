---
title: PHP
id: php
slug: /sdks-php
---

## About

Our PHP SDK, is available at [blockfrost-php](https://github.com/blockfrost/blockfrost-php).

## Installation

###  Composer

This SDK uses guzzlehttp for REST.  [Composer](https://getcomposer.org/) is the preferred package manager to import this:

###  composer.json

```json
{
	"require" : {
		"guzzlehttp/guzzle" : "^7.0"
	},
	"autoload" : {
		"psr-4" : {
			"Blockfrost\\" 		  : "../blockfrost_api/"
		}
	},
	"minimum-stability" : "dev",
	"require-dev": {
		"phpunit/phpunit": "^9.5"
	}
}
```

```console
$ php composer.phar update
```

## Usage

Using the SDK is pretty straight-forward as you can see from the following example.

### Cardano

```php
<?php 

use Blockfrost\Block\BlockService;
use Blockfrost\Service;

require __DIR__.'/vendor/autoload.php';

$projectId = "MY_PROJECT_ID";

$blockService = new BlockService(Service::$NETWORK_CARDANO_MAINNET, $projectId);

try
{
    $res = $blockService->getLatestBlock();

    echo $res->hash;
}

catch(Exception $err)
{
    echo $err->getMessage();
}


?>
```
