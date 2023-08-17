import DiffSummary from "@components/DiffSummary";
import Page from "@layouts/page";
import { pull } from "@lib/routes";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  pullId: string;
  tableName: string | null;
};

const PullDiffPage: NextPage<Props> = ({ pullId, tableName }) => {
  return (
    <Page title={`Pull Request Diff #${pullId}`}>
      <DiffSummary.ForPull
        pullId={Number(pullId)}
        activeTable={tableName ?? undefined}
      />
      <Link {...pull(Number(pullId))}>Back to pull request #{pullId}</Link>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
}) => {
  return {
    props: {
      pullId: params?.pullId ? String(params.pullId) : "",
      tableName: query.tableName ? String(query.tableName) : null,
    },
  };
};

export default PullDiffPage;
