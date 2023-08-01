import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const Page: NextPage<Props> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Page;
