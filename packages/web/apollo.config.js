const path = require("path");

module.exports = {
  client: {
    includes: [
      "./components/**/*.ts*",
      "./contexts/**/*.ts*",
      "./hooks/**/*.ts*",
      "./lib/**/*.ts*",
      "./pages/**/*.ts*",
    ],
    service: {
      name: "graphql-server",
      localSchemaFile: path.resolve(__dirname, "../graphql-server/schema.gql"),
    },
  },
};
