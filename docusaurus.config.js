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
          label: "Login",
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
              to: "/docs/",
            },
            {
              label: "Getting Started",
              to: "/docs/overview/getting-started",
            },
            {
              label: "🔨 Start Building",
              to: "/docs/start-building",
            },
            {
              label: "🦾 SDKs",
              href: "/docs/sdks",
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
            // {
            //   label: "Blog",
            //   href: "https://blog.blockfrost.io",
            // },
            {
              label: "Support",
              href: "/docs/support",
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
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi-docs
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
        id: "apiDocs",
        docsPluginId: "classic",
        config: {
          petstore: {
            // Note: petstore key is treated as the <id> and can be used to specify an API doc instance when using CLI commands
            specPath: "spec.yaml", // Path to designated spec file
            outputDir: "docs/api", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          burgers: {
            specPath: "examples/food/burgers/openapi.yaml",
            outputDir: "api/food/burgers",
          },
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"],
};
