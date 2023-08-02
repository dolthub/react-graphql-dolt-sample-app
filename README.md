# React + GraphQL + Dolt (RDG) Sample Application

This sample application uses the RDG web stack. It shows how you can set up a GraphQL
server using a Dolt database and connect it to a React front end.

## Getting started

### 1. Start by installing dependencies and compiling the code:

```shell
~ % yarn && yarn compile
```

### 2. Add database configuration

In order to start your GraphQL server, you need to provide your database configuration. Add a `.development.env` file that looks like this:

```shell
HOST="dolthub-us-jails.dbs.hosted.doltdb.com"
PORT=3306
USERNAME="myusername"
PASSWORD="mypassword"
DATABASE="us_jails"
```

_Note: we are using a cloud-hosted Dolt database from [Hosted Dolt](https://hosted.doltdb.com/)_

### 3. Start GraphQL server

You'll know if your database is configured correctly if you start your local GraphQL server and get no errors.

In `packages/graphql-server`:

```shell
graphql-server % yarn dev
[3:00:17 PM] Starting compilation in watch mode...

[3:00:21 PM] Found 0 errors. Watching for file changes.

[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [NestFactory] Starting Nest application...
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +47ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +1ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] TerminusModule dependencies initialized +0ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] GraphQLSchemaBuilderModule dependencies initialized +92ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] GraphQLModule dependencies initialized +3ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +564ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +1ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] DoltBranchesModule dependencies initialized +5ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [RoutesResolver] DoltBranchesController {/doltBranches}: +24ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [RouterExplorer] Mapped {/doltBranches, GET} route +4ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [GraphQLModule] Mapped {/graphql, POST} route +146ms
[Nest] 5310  - 07/31/2023, 3:00:24 PM     LOG [NestApplication] Nest application successfully started +5ms
```

You can test your queries in the GraphQL playground from http://localhost:9000/graphql.

### 4. Start web server

In another terminal, start the local web server. Go to `packages/web` and run:

```shell
web % yarn dev
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info Loaded env from /Users/me/dern-sample-app/packages/web/.env.development
- event compiled client and server successfully in 1816 ms (18 modules)
```

And then navigate to http://localhost:3000 in your browser.

## graphql-server

We use the [NestJS](https://docs.nestjs.com/) framework to build an efficient, scalable
[Node.js](https://nodejs.org/) server-side application. It provides a level of abstraction
above common Node.js frameworks like Express, which makes it easy to support both
Typescript and GraphQL and to integrate with any database.

We use two built-in Nest integrations to build our GraphQL server:

1. [TypeORM](https://docs.nestjs.com/techniques/database#typeorm-integration), the most
   mature ORM available for Typescript. We use the [MySQL database
   driver](https://www.npmjs.com/package/mysql2) with TypeORM to connect to our Dolt SQL
   server.
2. [GraphQL](https://docs.nestjs.com/graphql/quick-start), a powerful query language for
   APIs and a runtime for fulfilling those queries with your existing data. We can
   configure the GraphQL module to use [Apollo](https://www.apollographql.com/) server, a
   service that processes GraphQL operations from application clients. We'll come back to
   Apollo when we set up the React portion of our application.

You can follow [these steps](https://docs.nestjs.com/first-steps) to set up a new project.

### TypeORM

We use the [TypeORM
module](https://docs.nestjs.com/techniques/database#typeorm-integration) to populate
connectivity information of our Dolt database into the root `AppModule`. You can find this
information in the Connectivity tab of your Hosted Dolt deployment.

```ts
// src/app.module.ts
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "dolthub-us-jails.dbs.hosted.doltdb.com",
      port: 3306,
      username: "myusername",
      password: "xxxxxx",
      database: "us_jails",
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    TerminusModule,
  ],
})
export class AppModule {}
```

The example in this repository uses the [config
module](https://docs.nestjs.com/techniques/configuration) here instead to get your
database information from an env file.

TypeORM supports the repository design pattern, so each entity will have its own
repository. `Entity` is a class that maps to a database table. We will use the
[`dolt_branches`](https://docs.dolthub.com/sql-reference/version-control/dolt-system-tables#dolt_branches)
system table in this example.

```sql
mysql> select * from dolt_branches;
+-------------+----------------------------------+---------------------+------------------------+-------------------------+-------------------------+
| name        | hash                             | latest_committer    | latest_committer_email | latest_commit_date      | latest_commit_message   |
+-------------+----------------------------------+---------------------+------------------------+-------------------------+-------------------------+
| delete-rows | u8s83gapv7ghnbmrtpm8q5es0dbl7lpd | taylorb             | taylor@dolthub.com     | 2022-06-14 19:11:58.402 | Accept PR 44            |
| new-branch  | sqjm4s0f2m48rjc97hr6cbpv2hqga00d | Dolt System Account | doltuser@dolthub.com   | 2022-09-14 19:30:41.132 | delete row              |
+-------------+----------------------------------+---------------------+------------------------+-------------------------+-------------------------+
2 rows in set (0.06 sec)
```

The `DoltBranch` entity that maps to the `dolt_branches` system table schema.

```ts
// src/doltBranches/doltBranch.entity.ts
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DoltBranches {
  @PrimaryColumn()
  name: string;

  @Column()
  hash: string;

  @Column()
  latest_committer: string;

  @Column()
  latest_committer_email: string;

  @Column()
  latest_commit_message: string;

  @Column()
  latest_commit_date: Date;
}
```

Since we set `autoLoadEntities` to `true` in our TypeORM module, we can begin using this
entity automatically.

Then we create a `DoltBranchesModule` and add it to the `imports` in `AppModule`.

```ts
// src/doltBranches/doltBranch.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoltBranches } from "./doltBranch.entity";
import { DoltBranchesService } from "./doltBranch.service";

@Module({
  imports: [TypeOrmModule.forFeature([DoltBranches])],
  providers: [DoltBranchesService],
  exports: [DoltBranchesService],
})
export class DoltBranchesModule {}
```

The `forFeature` method injects the `DoltBranchesRepository` into the
`DoltBranchesService` using the `@InjectRepository()` decorator. This lets us use
different [methods](https://typeorm.io/working-with-entity-manager) to query or mutate
data in that database table.

```ts
// src/doltBranches/doltBranch.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoltBranches } from "./doltBranch.entity";

export class CreateBranchArgs {
  newBranchName: string;
  refName: string;
}

@Injectable()
export class DoltBranchesService {
  constructor(
    @InjectRepository(DoltBranches)
    private doltBranchesRepository: Repository<DoltBranches>
  ) {}

  findAll(): Promise<DoltBranches[]> {
    return this.doltBranchesRepository.find();
  }
}
```

### GraphQL models and resolvers

Since we're using the [code first](https://docs.nestjs.com/graphql/quick-start#code-first)
approach, we use decorators and Typescript classes to generate the corresponding
GraphQL schema.

The `GraphQLModule` is imported in `AppModule`.

```ts
// src/app.module.ts
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: "schema.gql",
      context: (ctx) => ctx,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      // ...database config
    }),
    TerminusModule,
  ],
})
export class AppModule {}
```

Each object type you
define should represent a domain object that an application client might need to interact
with. Our `Branch`
[model](https://docs.nestjs.com/graphql/resolvers#object-types) looks like this:

```ts
// src/branches/branch.model.ts
import { Field, GraphQLTimestamp, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Branch {
  @Field((_type) => ID)
  name: string;

  @Field()
  hash: string;

  @Field()
  latestCommitter: string;

  @Field()
  latestCommitterEmail: string;

  @Field()
  latestCommitMessage: string;

  @Field((_type) => GraphQLTimestamp)
  latestCommitDate: Date;
}
```

A `Resolver` class is a way for our client to interact with the `Branch` object.

```ts
// src/branches/branch.resolver.ts
import { Query, Resolver } from "@nestjs/graphql";
import { DoltBranchesService } from "../doltBranches/doltBranch.service";
import { Branch, fromDoltBranchesRow } from "./branch.model";

@Resolver((_of) => Branch)
export class BranchResolver {
  constructor(private doltBranchService: DoltBranchesService) {}

  @Query((_returns) => [Branch])
  async branches(): Promise<Branch[]> {
    const branches = await this.doltBranchService.findAll();
    return branches.map(fromDoltBranchesRow);
  }
}
```

This resolver needs to be added to `AppModule` as a provider. The full `AppModule` looks like this:

```ts
// src/app.module.ts

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: "schema.gql",
      context: (ctx) => ctx,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      // ...database config
    }),
    DoltBranchesModule,
    TerminusModule,
  ],
  providers: [BranchResolver],
})
export class AppModule {}
```

When you make changes to your models or resolvers and run your GraphQL development server
(`yarn run dev`), you should see a `schema.gql` file updated with the new models and
resolver definitions.

This file is used to generate Typescript object types and hooks that can be used by React.

## web

We build the React portion of this web application using [Next.js](https://nextjs.org/).
Next.js is a React framework that abstracts and automatically configures tooling needed
for React, like bundling, compiling, and more.

You can follow [these instructions](https://nextjs.org/docs/getting-started/installation)
to install the required packages and [create a `pages`
directory](https://nextjs.org/docs/getting-started/installation#the-pages-directory-optional).
Once you have `index.tsx` and `_app.tsx` components within `pages`, you can run the
development server (`yarn run dev`). You should see your home page when you navigate to
localhost.

Our Next.js application uses [Apollo Client](https://www.apollographql.com/docs/react/) to
manage our local and remote data with GraphQL. You can follow [these
steps](https://www.apollographql.com/docs/react/get-started) to get started.

We created a [custom Apollo
wrapper](https://github.com/dolthub/dolt-graphql-react-sample-app/blob/main/packages/web/lib/apollo.tsx),
which we use to wrap every page component via `_app.tsx`.

```tsx
// pages/_app.tsx
import { withApollo } from "@lib/apollo";
import App from "next/app";
import Head from "next/head";

export default class SampleApp extends App {
  public render() {
    const { Component } = this.props;

    const WrappedPage = withApollo()(Component);
    return (
      <>
        <Head>{/* include various meta tags and scripts here */}</Head>
        <WrappedPage {...pageProps} />
      </>
    );
  }
}
```

### Page components

We have a page component lists our Dolt branches. From here we can click on a branch to
view more branch information or delete a branch.

Each folder or file in the `pages` directory creates a [new
route](https://nextjs.org/docs/app/building-your-application/routing/defining-routes). The
`branches/index.tsx` file shows a list of branches in our Dolt database and forms the
`/branches` route. The `branches/[name].tsx` file shows more information about a
particular branch and form the [dynamic
route](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
`/branches/[name]`.

```tsx
// pages/branches/index.tsx
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
```

### Using GraphQL queries from components

The `BranchList` component fetches a list of Dolt branches in your database and renders
the branch names. This is the GraphQL
[query](https://www.apollographql.com/docs/react/data/queries).

```ts
// components/BranchList/queries.ts
import { gql } from "@apollo/client";

export const LIST_BRANCHES = gql`
  query ListBranches {
    branches {
      name
    }
  }
`;
```

Since we're using Typescript, we use an additional package called [GraphQL Code
Generator](https://the-guild.dev/graphql/codegen). This generates Typescript types and
React query and mutation hooks based on our GraphQL schema.

After you
[install](https://the-guild.dev/graphql/codegen/docs/getting-started/installation) and
[configure](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config)
the code generator, you can simply run `yarn generate-types` to generate code that you'll
find in
[`gen/graphql-types.tsx`](https://github.com/dolthub/dolt-graphql-react-sample-app/blob/main/packages/web/gen/graphql-types.tsx).

We can use the generated `useListBranchesQuery` hook to fetch our database's branches.

```tsx
// components/BranchList/index.tsx
import Link from "next/link";
import ReactLoader from "react-loader";
import { useListBranchesQuery } from "../../gen/graphql-types";

export default function BranchList() {
  const res = useListBranchesQuery();
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return (
      <div className="error-msg">
        Error loading branches: {res.error.message}
      </div>
    );
  }
  if (!res.data?.branches.length) {
    return <div>No branches found</div>;
  }
  return (
    <ul>
      {res.data.branches.map((b) => (
        <li key={b.name}>
          <Link
            href="/branches/[name]"
            as={`/branches/${encodeURIComponent(b.name)}`}
          >
            {b.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

## Architecture

### Dolt

[Dolt](https://doltdb.com) is a MySQL-compatible version-controlled database, which
includes things like branches, commits, diffs, and merges. Dolt can be used with any MySQL
client, including [Node MySQL](https://www.npmjs.com/package/mysql), which is used in this
application.

Dolt has a cloud-hosted option called [Hosted Dolt](https://hosted.doltdb.com), which is
great for creating production applications.

### GraphQL

The [GraphQL](https://graphql.org/) server layer sits between Dolt and the React web
application. We use the [Nest.js](https://docs.nestjs.com) framework to integrate with a
Dolt database via [TypeORM](https://github.com/typeorm/typeorm), as well as expose GraphQL
endpoints via the [GraphQL integration](https://docs.nestjs.com/graphql/quick-start).

### React

This application uses [Next.js](https://nextjs.org/) (a React framework that abstracts and
automatically configures tooling needed for React, like bundling, compiling), [Apollo
Client](https://www.apollographql.com/docs/react/) (manages local and remote data with
GraphQL), and [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) (generates
Typescript types and React query and mutation hooks based on our GraphQL schema).
