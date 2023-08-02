import Page from "@layouts/page";
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <Link href="/branches">View branches</Link>
    </Page>
  );
};

export default Home;
