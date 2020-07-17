const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

// Directory for deployed assets. It should be within our static files path.
// Backslash at the end is not required.
const distDir = '/static/dist';
// Controls use of hot-reload devserver. When this is used you must also run `node server.js`
const useHotReload = process.env.NODE_ENV !== 'production';
// Dev server address specified in server.js
const devServerAddr = 'localhost';
// Dev server port specified in server.js
const devServerPort = 8001;

module.exports = {
    entry: ['./frontend/main.js'],
    output: {
        path: path.resolve(__dirname, '.' + distDir + '/'),
        filename: '[name]-[hash].js',
        publicPath: distDir + '/',
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(s(c|a)ss|css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers')
                            }
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    esModule: false
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'Components': path.resolve(__dirname, 'frontend/components'),
            'Assets': path.resolve(__dirname, 'frontend/assets'),
            'Services': path.resolve(__dirname, 'frontend/services'),
            'GraphQL': path.resolve(__dirname, 'frontend/graphql')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 15
            },
            algorithm (input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
} else if (useHotReload) {
    module.exports.entry.push('webpack-dev-server/client?http://' + devServerAddr + ':' + devServerPort);
    module.exports.entry.push('webpack/hot/only-dev-server');
    module.exports.output['publicPath'] = 'http://' + devServerAddr + ':' + devServerPort + distDir + '/';
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
    module.exports.plugins.push(new webpack.NoEmitOnErrorsPlugin()); // don't reload if there is an error
}
