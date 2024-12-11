const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", // Use 'production' for production builds
  target: "web",
  devtool: "source-map",
  entry: {
    popup: path.resolve(__dirname, "src/scripts/popup.ts"),
    content: path.resolve(__dirname, "src/scripts/content.ts"),
    background: path.resolve(__dirname, "src/scripts/background.ts"),
    injected: path.resolve(__dirname, "src/scripts/injected.ts"),
  },

  output: {
    filename: "[name].js", // Output file name for each entry
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean the output directory before each build
    libraryTarget: "umd", // Universal Module Definition
  },

  resolve: {
    extensions: [".ts", ".js"], // Resolve .ts and .js extensions
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "popup-style.css"), // Source directory
          to: path.resolve(__dirname, "dist"), // Destination directory
        },
        {
          from: path.resolve(__dirname, "content-style.css"), // Source directory
          to: path.resolve(__dirname, "dist"), // Destination directory
        },
        {
          from: path.resolve(__dirname, "icon.png"), // Source directory
          to: path.resolve(__dirname, "dist"), // Destination directory
        },
        {
          from: path.resolve(__dirname, "popup.html"), // Source directory
          to: path.resolve(__dirname, "dist"), // Destination directory
        },
        {
          from: path.resolve(__dirname, "manifest.json"), // Source directory
          to: path.resolve(__dirname, "dist"), // Destination directory
        },
      ],
    }),
  ],
};
