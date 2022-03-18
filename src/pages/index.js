import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Getting Started and Platform Overview",
    imageUrl: "img/getting_started.svg",
    description: (
      <>
        A step-by-step guide to get you started with Blockfrost API and make
        your first call!
      </>
    ),
  },
  {
    title: "Deep dive, SDKs and More",
    imageUrl: "img/sdk.svg",
    description: (
      <>
        Dig deeper and build more with our detailed guides and multi-language
        SDKs.
      </>
    ),
  },
  {
    title: "Tutorials and Showcases",
    imageUrl: "img/showcase.svg",
    description: (
      <>
        Explore tutorials and amazing community projects already built on
        Blockfrost.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          &nbsp;
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button  button--primary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/overview/getting-started")}
            >
              Getting started
            </Link>
            &nbsp; &nbsp;
            <Link
              className={clsx(
                "button  button--primary button--lg",
                styles.getStarted
              )}
              to="docs/start-building"
            >
              Start building
            </Link>
            &nbsp; &nbsp;
            <Link
              className={clsx(
                "button  button--primary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/sdks")}
            >
              Discover SDKs
            </Link>
          </div>
          &nbsp;
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--primary button--lg",
                styles.getStarted
              )}
              to="https://docs.blockfrost.io/"
            >
              OpenAPI reference
            </Link>
            &nbsp; &nbsp;
            <Link
              className={clsx(
                "button button--outline button--primary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/support")}
            >
              Support & FAQ
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
