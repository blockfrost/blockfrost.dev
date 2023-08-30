/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Blockfrost Development Hub",
  tagline: "Welcome to the Blockfrost.io universe",
  url: "https://blockfrost.dev/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "blockfrost",
  projectName: "blockfrost.dev",
  themeConfig: {
    metadata: [
      {
        name: "og:image",
        content: "https://blockfrost.io/images/logo_full.png",
      },
      {
        name: "twitter:image",
        content: "https://blockfrost.io/images/logo_full.png",
      },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
    },
    navbar: {
      title: "",
      logo: {
        alt: "Blockfrost Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://blockfrost.io/dashboard",
          label: "Dashboard",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Overview",
              to: "/",
            },
            {
              label: "Getting Started",
              to: "/overview/getting-started",
            },
            {
              label: "Start Building",
              to: "/start-building",
            },
            {
              label: "SDKs",
              href: "/sdks",
            },
            {
              label: "OpenAPI reference",
              href: "https://docs.blockfrost.io/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Exchange",
              href: "https://cardano.stackexchange.com/",
            },
            {
              label: "Reddit",
              href: "https://www.reddit.com/r/CardanoDevelopers/",
            },
            {
              label: "Cardano Developers Portal",
              href: "https://developers.cardano.org/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Support",
              href: "/support",
            },
            {
              label: "GitHub",
              href: "https://github.com/blockfrost",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Blockfrost.io`,
    },
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./src/sidebars.js"),
          editUrl: "https://github.com/blockfrost/blockfrost.dev/edit/master/",
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi-docs
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/style.css"),
        },
      }),
    ],
  ],
  scripts: [
    {
      src: "https://plausible.io/js/plausible.js",
      defer: true,
      "data-domain": "blockfrost.dev",
    },
  ],
  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          blockfrost: {
            downloadUrl:
              "https://github.com/blockfrost/blockfrost-backend-ryo/issues",
            specPath: "node_modules/@blockfrost/openapi/openapi.yaml",
            outputDir: "./docs/api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"],
};
