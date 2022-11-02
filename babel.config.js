module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          root: ["./src"],
          alias: {
            "@components": "./src/scripts/components/",
            "@constants": "./src/scripts/constants/",
            "@hooks": "./src/scripts/hooks/",
            "@navigation": "./src/scripts/navigation/",
            "@screens": "./src/scripts/screens/",
            "@customTypes": "./src/scripts/types/",
            "@utils": "./src/scripts/utils/",
            "@styles": "./src/scripts/styles/",
          },
        },
      ],
    ],
  };
};
