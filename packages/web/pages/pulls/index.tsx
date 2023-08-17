import PullList from "@components/PullList";
import Page from "@layouts/page";
import { newPull } from "@lib/routes";
import { NextPage } from "next";
import Link from "next/link";

const PullsPage: NextPage = () => {
  return (
    <Page title="Pull Requests">
      <Link {...newPull}>Create a new pull request</Link>
      <PullList />
      <Link href="/">Back to home</Link>
    </Page>
  );
};

export default PullsPage;
