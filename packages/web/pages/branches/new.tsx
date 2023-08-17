import NewBranchForm from "@components/NewBranchForm";
import Page from "@layouts/page";
import { branches } from "@lib/routes";
import { NextPage } from "next";
import Link from "next/link";

const NewBranchPage: NextPage = () => {
  return (
    <Page title="New Branch">
      <NewBranchForm />
      <Link {...branches}>Back to branches</Link>
    </Page>
  );
};

export default NewBranchPage;
