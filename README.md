# Dolt + GraphQL + React Sample Application

This sample application shows how you can set up a GraphQL server using a Dolt database and connect it to a React front end.

## Getting started

1. Start by installing dependencies and compiling the code:

```shell
% yarn && yarn compile
```

2. Add database configuration

In order to start your GraphQL server, you need to provide your database configuration. It should look like this:

```shell
HOST="dolthub-us-jails.dbs.hosted.doltdb.com"
PORT=3306
USERNAME="myusername"
PASSWORD="mypassword"
DATABASE="us_jails"
```

_Note: we are using a cloud-hosted Dolt database from [Hosted Dolt](https://hosted.doltdb.com/)_

3. Start GraphQL server

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

4. Start web server

In another terminal, start the local web server. Go to `packages/web` and run:

```shell
web % yarn dev
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info Loaded env from /Users/me/dern-sample-app/packages/web/.env.development
- event compiled client and server successfully in 1816 ms (18 modules)
```

And then navigate to http://localhost:3000 in your browser.
