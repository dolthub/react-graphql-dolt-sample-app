import PullList from "@components/PullList";
import Page from "@layouts/page";
import { NextPage } from "next";
import Link from "next/link";

const PullsPage: NextPage = () => {
  return (
    <Page title="Pull Requests">
      <Link href="/pulls/new">Create a new pull request</Link>
      <PullList />
      <Link href="/">Back to home</Link>
    </Page>
  );
};

export default PullsPage;
