import { withApollo } from "@lib/apollo";
import App from "next/app";
import Head from "next/head";
import "../styles/index.css";

export default class SampleApp extends App {
  public render() {
    const { Component, pageProps, router } = this.props;

    const WrappedPage = withApollo()(Component);
    return (
      <>
        <Head>
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#182134" />
        </Head>
        <WrappedPage {...pageProps} />
      </>
    );
  }
}
