module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver", {
        root: ["."],
        alias: {
          "@errors": "./src/errors",
          "@controller": "./src/app/controller",
          "@models": "./src/app/models",
          "@services": "./src/app/services",
          "@validators": "./src/app/validators",
          "@myTypes": "./src/app/utils/types",
          "@utils": "./src/app/utils",
          "@db": "./src/database",
          "@config": "./src/config",
          "@lib": "./src/lib",
          "@middlewares": "./src/app/middlewares",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
