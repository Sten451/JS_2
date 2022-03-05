const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: ['./public/js/main.js', './public/js/CartComponent.js', './public/js/FooterComponent.js', './public/js/ProductListComponent.js', './public/js/SearchComponent.js'],
    output: {
        filename: "./build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
      patterns: [
        { from: "public/css/", to: "" },
      ],
        }),
    ]
}
