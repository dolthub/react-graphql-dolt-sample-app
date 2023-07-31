const defaultConfig = {
  publicRuntimeConfig: {
    graphqlApiUrl: process.env.GRAPHQLAPI_URL,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  productionBrowserSourceMaps: true,
  webpack(config) {
    return { ...config, output: config.output || {} };
  },
};

module.exports = defaultConfig;
