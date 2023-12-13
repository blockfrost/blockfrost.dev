# Blockfrost Development Hub

<a href="https://fivebinaries.com/" alt="Five Binaries">
 <img src="https://img.shields.io/badge/made%20by-Five%20Binaries-darkviolet.svg?style=flat-square" /></a>
<a href="https://blockfrost.io/" alt="Blockfrost">
 <img src="https://img.shields.io/badge/built%20on-Blockfrost.io-blue.svg?style=flat-square" /></a>

<br/>

This is the repository of the [Blockfrost Development Hub](https://blockfrost.dev/).

All contributions to this documentation are welcome! :rocket: Please follow the [contributing](https://blockfrost.dev/docs/contributing) guide.

## Open API

To integrate a custom specification, modify the specPath in `docusaurus.config.js` as demonstrated below:

```js
specPath: "https://raw.githubusercontent.com/blockfrost/openapi/master/openapi.yaml",
```

and run the following command to regenerate the API documentation:

```js
yarn regenerate-open-api
```
