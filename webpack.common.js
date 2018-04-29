const webpack = require("webpack");
const path = require("path");

module.exports = (env, argv) => ({
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "demo.js"
    },
    devServer: {
        contentBase: "public"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(argv.mode)
            }
        })
    ]
});
