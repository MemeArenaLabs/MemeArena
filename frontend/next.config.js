module.exports = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve("crypto-browserify"),
    };

    config.module.rules.push(
      {
        ...fileLoaderRule,
        type: "javascript/auto",
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        type: "javascript/auto",
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
};
