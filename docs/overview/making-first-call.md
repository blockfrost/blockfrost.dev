---
title: Making first call
id: making-first-call
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

Once you [acquire](/overview/getting-started) your `project_id` token, let's give the API a try! You need to pass this it as an HTTP header with the name `project_id`. Don't forget that you can call just the network you created the token for.

:::info
Each network has separate `project_id` tokens, distinguishable by the prefix.
:::

In this example, we set `project_id` as an environment variable and then use it to call the API. Don't forget to replace the `PROJECT_ID` in the example with your newly generated one!

````mdx-code-block
<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Cardano mainnet', value: 'mainnet', },
    { label: 'Cardano preprod', value: 'preprod', },
    { label: 'Cardano preview', value: 'preview', },
    { label: 'IPFS', value: 'ipfs', },
  ]
}>
<TabItem value="mainnet">

```shell
# Don't forget to replace the PROJECT_ID with your newly generated one!
# The following PROJECT_ID is made up, NEVER share your PROJECT_ID publicly!!!
export PROJECT_ID=mainnetqnWuOt69v42rIes4punuD20FAsRuqnpDg4

curl -H "project_id: $PROJECT_ID" https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest
```

</TabItem>
<TabItem value="preprod">

```shell
# Don't forget to replace the PROJECT_ID with your newly generated one!
# The following PROJECT_ID is made up, NEVER share your PROJECT_ID publicly!!!
export PROJECT_ID=preprodEnrkKWDwlA9hV4IajI4ILrFdsHJpIqNC

curl -H "project_id: $PROJECT_ID" https://cardano-preprod.blockfrost.io/api/v0/blocks/latest
```

</TabItem>
<TabItem value="preview">

```shell
# Don't forget to replace the PROJECT_ID with your newly generated one!
# The following PROJECT_ID is made up, NEVER share your PROJECT_ID publicly!!!
export PROJECT_ID=previewEnrkKWDwlA9hV4IajI4ILrFdsHJpIqNC

curl -H "project_id: $PROJECT_ID" https://cardano-preview.blockfrost.io/api/v0/blocks/latest
```

</TabItem>
<TabItem value="ipfs">

```shell
# Don't forget to replace the PROJECT_ID with your newly generated one!
# The following PROJECT_ID is made up, NEVER share your PROJECT_ID publicly!!!
export PROJECT_ID=ipfssbLweNvuxs6rcwYBLDWaXZR1n4zPPNDI

curl -H "project_id: $PROJECT_ID" https://ipfs.blockfrost.io/api/v0/pins/list
```

</TabItem>

</Tabs>
````
