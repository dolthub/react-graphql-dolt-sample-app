import { NextPage } from "next";
import Link from "next/link";
import Page from "../layouts/page";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <Link href="/branches">View branches</Link>
    </Page>
  );
};

export default Home;
