import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoltBranchesModule } from "./doltBranches/doltBranch.module";
import { FileStoreModule } from "./fileStore/fileStore.module";
import resolvers from "./resolvers";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".development.env" }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: "schema.gql",
      context: (ctx) => ctx,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("HOST"),
        port: +configService.get("PORT"),
        username: configService.get("USERNAME"),
        password: configService.get("PASSWORD"),
        database: configService.get("DATABASE"),
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    DoltBranchesModule,
    FileStoreModule,
    TerminusModule,
  ],
  providers: resolvers,
})
export class AppModule {}
