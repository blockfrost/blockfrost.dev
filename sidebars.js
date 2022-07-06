module.exports = {
  docs: [
    {
      type: "doc",
      link: {
        type: "doc",
        id: "blockfrost",
      },
      type: "category",
      label: "Overview",
      items: [
        "overview/getting-started",
        "overview/making-first-call",
        "overview/plans-and-billing",
      ],
    },
    {
      type: "category",
      label: "Start building",
      link: {
        type: "doc",
        id: "start-building",
      },
      items: [
        "start-building/cardano/cardano",
        "start-building/ipfs/ipfs",
        "start-building/milkomeda",
        {
          type: "category",
          label: "Secure Webhooks",
          link: {
            type: "doc",
            id: "start-building/webhooks/webhooks",
          },
          items: [
            "start-building/webhooks/using-webhooks",
            "start-building/webhooks/webhooks-events",
            "start-building/webhooks/webhooks-conditions",
            "start-building/webhooks/webhooks-signatures",
          ],
        },
        "start-building/tips-tricks",
      ],
    },
    {
      link: {
        type: "doc",
        id: "sdks",
      },
      type: "category",
      label: "Software Development Kits",
      items: [
        "sdks/dotnet",
        "sdks/elixir",
        "sdks/golang",
        "sdks/haskell",
        "sdks/java",
        "sdks/js",
        "sdks/kotlin",
        "sdks/python",
        "sdks/ruby",
        "sdks/rust",
        "sdks/scala",
        "sdks/swift",
      ],
    },
    {
      link: {
        type: "doc",
        id: "support",
      },
      type: "category",
      label: "Support & FAQ",
      items: ["support/cardano", "support/ipfs"],
    },
    {
      type: "doc",
      id: "contributing",
    },
    {
      type: "link",
      label: "OpenAPI specification",
      href: "https://docs.blockfrost.io/",
    },
  ],
};
