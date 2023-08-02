import {
  ListBranchesDocument,
  useCreateBranchMutation,
} from "@gen/graphql-types";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import ReactLoader from "react-loader";

export default function NewBranchForm() {
  const router = useRouter();
  const [createBranch, createRes] = useCreateBranchMutation();
  const [newBranchName, setNewBranchName] = useState("");
  const [fromRefName, setFromRefName] = useState("");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await createBranch({
        variables: { newBranchName, fromRefName },
        refetchQueries: [{ query: ListBranchesDocument }],
      });
      router.push("/branches");
    } catch (_) {
      // displayed by createRes.error
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="new-branch-form">
        <label htmlFor="branch-name">Name</label>
        <input
          type="text"
          id="branch-name"
          name="branch-name"
          value={newBranchName}
          onChange={(e) => setNewBranchName(e.target.value)}
        />
        <label htmlFor="from-ref-name">Start point</label>
        <input
          type="text"
          id="from-ref-name"
          name="from-ref-name"
          value={fromRefName}
          onChange={(e) => setFromRefName(e.target.value)}
        />
        <button type="submit">Create Branch</button>
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
