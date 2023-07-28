---
title: Access Filters
id: access-filters
---

Access filters serve as your project's defense mechanism, safeguarding it from any unwanted or suspicious activity.

With Endpoint allowlist you have the capability to restrict access to Blockfrost API at endpoint level. This allows you to enable access solely to endpoints necessary for your project. Additionally, we provide an IP and Origin Allowlist, serving as an additional layer of security. This mechanism ensures that only your specific applications are granted access to the Blockfrost API.

You have the flexibility to use either one of these filters, or all of them simultaneously. With multiple filters enabled, only request that pass all the filters are allowed.


You can navigate to Access filters directly from the Project page. ![settings](/img/access-filters/settings.png)

## IP allowlist

Once enabled only allowed IP addresses will be able to access Blockfrost API on behalf of the project. Requests from all other IP addresses will receive error response with status code 403.

You can enter both IPv4 and IPv6 addresses. IP ranges using prefix length are also supported (`127.0.0.1/24`).

![IP allowlist](/img/access-filters/ip.png)


## Endpoint allowlist

Once enabled only allowed endpoints will be accessible from the project. Requests to all other endpoints will receive error response with status code `403`. We recommend to enable access solely to endpoints necessary for your project.

:::warning
If endpoint allowlist is enabled for the project, but there is no entry in the list of enabled endpoints, then all requests will be rejected.
:::

![Endpoint allowlist](/img/access-filters/endpoint.png)

## Origin allowlist

Origins filter allows you to restrict access to your project to specific URLs using HTTP header [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin).

Once enabled only requests from allowed origins will be allowed for the project. Requests from all other origins will receive error response with status code 403. Requests with missing `Origin` headers will also be rejected with status code 403.


Origin allowlist supports wildcard (*) for a subdomain. For example, "https://\*.example.com" allows requests coming from any subdomain of `example.com` (eg. `https://first-app.example.com`, `https://another-app.example.com`).

:::info Optional Scheme
An entry configured with a specific scheme, such as HTTPS, will exclusively permit requests initiated from that particular scheme. If you want to permit any scheme, simply exclude it from the entry. For instance, by entering `example.com`, the system will accept requests from any protocol.
:::

![Origin allowlist](/img/access-filters/origin.png)


## Best Practices

- Keep your API key (`project_id`) secure. Avoid placing it in client-side code, like JavaScript on a webpage or within mobile apps. Instead, route all Blockfrost requests via your server or through a proxy.

- Wherever you can, use IP and Origin-based filters and enable access only to those endpoints your project truly needs.

- Create a new project for each application. This lets you to tailor access filters to each application's specific needs.
