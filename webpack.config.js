/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'production';
const commonConfig = {
    devtool: (nodeEnv === 'production')? 'source-map': 'eval',
    entry: {
        main: path.join(__dirname, '/client/src/js/main.js')
    },
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: '[name].js',
        publicPath: '/client/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
    plugins: [
        // The DefinePlugin allows you to create global constants
        // which can be configured at compile time.
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
        })
    ],
    // webpack-dev-server setup
    devServer: {
        contentBase: path.resolve(__dirname, './client'),
        port: 9000,
        proxy: {
          "/api/users": "http://localhost:3000"
      },
        watchContentBase: true
    }

}

module.exports = function start(env) {

    console.log(`fitfab:\t${env}`);
    console.log(`proxy:\t${commonConfig.devServer.proxy["/api/users"]}\n`)
    return commonConfig;

};