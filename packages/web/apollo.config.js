const path = require("path");

module.exports = {
  client: {
    includes: ["./components/**/*.ts*"],
    service: {
      name: "graphql-server",
      localSchemaFile: path.resolve(__dirname, "../graphql-server/schema.gql"),
    },
  },
};
