import NewPullForm from "@components/NewPullForm";
import Page from "@layouts/page";
import { pulls } from "@lib/routes";
import { NextPage } from "next";
import Link from "next/link";

const NewPullPage: NextPage = () => {
  return (
    <Page title="New Pull Request">
      <NewPullForm />
      <Link {...pulls}>Back to pull requests</Link>
    </Page>
  );
};

export default NewPullPage;
