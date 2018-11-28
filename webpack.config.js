const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "none",
    // mode: "production",
    entry: path.resolve(__dirname, "src/App.ts"),
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/",
    },
    target: "web",
    resolve: {
        extensions: [".js", ".vue", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            { 
                test: /\.ts$/, 
                loader: "ts-loader",
                exclude: /node_modules/,
                options: { 
                    appendTsSuffixTo: [/\.vue$/], //NOTE so you can import vue files in your typescript "script" blocks
                    onlyCompileBundledFiles: true,
                 }  
            },
        ]
    },
    plugins: ([
        new HtmlWebpackPlugin({
            inject: "body",
            filename: path.resolve(__dirname, "dist/index.html"),
            template: path.resolve(__dirname, "src/index.html"),
        }),
        new VueLoaderPlugin() //NOTE: so all rules are applied to blocks in vue files
    ]),
    optimization: {
        noEmitOnErrors: true,
        // minimize: true
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
}