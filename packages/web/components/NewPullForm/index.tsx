import { useCreatePullMutation } from "@gen/graphql-types";
import useSetState from "@hooks/useSetState";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import ReactLoader from "react-loader";

export default function NewPullForm() {
  const router = useRouter();
  const [createPull, createRes] = useCreatePullMutation();
  const [state, setState] = useSetState({
    toBranchName: "",
    fromBranchName: "",
    title: "",
    description: "",
    creatorName: "",
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await createPull({
        variables: state,
      });
      if (!data) return;
      await router.push(`/pulls/[pullId]`, `/pulls/${data.createPull.pullId}`);
    } catch (_) {
      // displayed by createRes.error
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <label htmlFor="base-branch">Base branch</label>
        <input
          type="text"
          id="base-branch"
          name="base-branch"
          value={state.toBranchName}
          onChange={(e) => setState({ toBranchName: e.target.value })}
        />
        <label htmlFor="from-branch">From branch</label>
        <input
          type="text"
          id="from-branch"
          name="from-branch"
          value={state.fromBranchName}
          onChange={(e) => setState({ fromBranchName: e.target.value })}
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={state.title}
          onChange={(e) => setState({ title: e.target.value })}
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          id="description"
          name="description"
          value={state.description}
          onChange={(e) => setState({ description: e.target.value })}
        />
        <label htmlFor="creator">Creator</label>
        <input
          type="text"
          id="creator"
          name="creator"
          value={state.creatorName}
          onChange={(e) => setState({ creatorName: e.target.value })}
        />
        <button type="submit">Create pull request</button>
        {createRes.error && (
          <div className="error-msg">
            Error creating branch: {createRes.error.message}
          </div>
        )}
        <ReactLoader loaded={!createRes.loading} />
      </form>
    </div>
  );
}
