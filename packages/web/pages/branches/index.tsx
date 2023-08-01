import { NextPage } from "next";
import Link from "next/link";
import BranchList from "../../components/BranchList";
import Page from "../../layouts/page";

const Branches: NextPage = () => {
  return (
    <Page title="Branches">
      <BranchList />
      <Link href="/">Back to home</Link>
    </Page>
  );
};

export default Branches;
