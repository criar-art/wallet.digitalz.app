module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "nativewind/babel",
        {
          config: "./tailwind.config.js",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@modals": "./src/modals",
            "@routes": "./src/routes",
            "@pages": "./src/pages",
            "@utils": "./src/utils",
            "@store/*": "./src/store",
            "@root": "./"
            // Adicione outros alias conforme necessário
          },
        },
      ],
    ],
  };
};
