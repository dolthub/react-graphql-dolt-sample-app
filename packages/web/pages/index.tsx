import Page from "@layouts/page";
import { branches, pulls } from "@lib/routes";
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <div>
        <Link {...branches}>View branches</Link>
      </div>
      <div>
        <Link {...pulls}>View pull requests</Link>
      </div>
    </Page>
  );
};

export default Home;
