import BranchList from "@components/BranchList";
import Page from "@layouts/page";
import { newBranch } from "@lib/routes";
import { NextPage } from "next";
import Link from "next/link";

const Branches: NextPage = () => {
  return (
    <Page title="Branches">
      <Link {...newBranch}>Create a new branch</Link>
      <BranchList />
      <Link href="/">Back to home</Link>
    </Page>
  );
};

export default Branches;
