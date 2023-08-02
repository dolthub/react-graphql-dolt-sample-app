import Branch from "@components/Branch";
import Page from "@layouts/page";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  name: string;
};

const BranchPage: NextPage<Props> = ({ name }) => {
  return (
    <Page title={`Branch ${name}`}>
      <Branch name={name} />
      <Link href="/branches">Back to branch list</Link>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  return {
    props: { name: params?.name ? String(params.name) : "" },
  };
};

export default BranchPage;
