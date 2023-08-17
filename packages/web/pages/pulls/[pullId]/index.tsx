import PullDetails from "@components/PullDetails";
import Page from "@layouts/page";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  pullId: string;
};

const PullPage: NextPage<Props> = ({ pullId }) => {
  return (
    <Page title={`Pull Request #${pullId}`}>
      <PullDetails pullId={Number(pullId)} />
      <Link href="/pulls">Back to pull requests</Link>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  return {
    props: { pullId: params?.pullId ? String(params.pullId) : "" },
  };
};

export default PullPage;
