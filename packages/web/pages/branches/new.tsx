import { NextPage } from "next";
import Link from "next/link";
import NewBranchForm from "../../components/NewBranchForm";
import Page from "../../layouts/page";

const NewBranchPage: NextPage = () => {
  return (
    <Page title="New Branch">
      <NewBranchForm />
      <Link href="/branches">Back to branches</Link>
    </Page>
  );
};

export default NewBranchPage;
