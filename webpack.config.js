const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        app: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
    },

    plugins: [

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'index.html'),
                    to: path.resolve(__dirname, 'build')
                },
                {
                    from: path.resolve(__dirname, 'assets', '**', '*'),
                    to: path.resolve(__dirname, 'build')
                },
            ],
        }),

        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        })
    ]
}