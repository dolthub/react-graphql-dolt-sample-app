import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import BranchList from "../components/BranchList";

const Branches: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Branches</title>
      </Head>
      <h1>Branches</h1>
      <BranchList />
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default Branches;
