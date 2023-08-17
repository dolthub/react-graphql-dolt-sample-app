import Page from "@layouts/page";
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <div>
        <Link href="/branches">View branches</Link>
      </div>
      <div>
        <Link href="/pulls">View pull requests</Link>
      </div>
    </Page>
  );
};

export default Home;
