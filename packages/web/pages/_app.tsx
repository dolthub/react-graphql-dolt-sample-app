import "@components/BranchList/index.css";
import { withApollo } from "@lib/apollo";
import App from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

// configure fetch for use with SWR
const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
};

export default class Hosted extends App {
  public render() {
    const { Component, pageProps, router } = this.props;

    // this.props.pageProps are the initial props fetched on a server side render.
    // The following keeps the pageProps updated with the client navigation.
    // This is necessary for pages that call getServerSideProps AND are routed to from within the app (i.e. router.push()).
    pageProps.params = {
      ...router.query,
    };

    const WrappedPage = withApollo()(Component);
    return (
      <>
        <Head>
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#182134" />
        </Head>
        <SWRConfig value={{ fetcher }}>
          <WrappedPage {...pageProps} />
        </SWRConfig>
      </>
    );
  }
}
