import { NestFactory } from "@nestjs/core";
import * as cors from "cors";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === "development") {
    app.use(
      "/graphql",
      cors<cors.CorsRequest>({
        credentials: true,
        origin: true,
      })
    );
  }
  await app.listen(9000);
}
bootstrap().catch((e) => console.error("something went wrong", e));
