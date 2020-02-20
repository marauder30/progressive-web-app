const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
    entry: "./routes/api.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    mode: "development",
    plugins: [
        new SWPrecacheWebpackPlugin(),
        new WebpackPwaManifest()
    ]
};

module.exports = config;