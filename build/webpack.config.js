
const path = require('path')
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const plugin = require('./plugin')
const tsImportPlugin = require('ts-import-plugin')

module.exports = {
   entry: {
        app: path.join(__dirname, './../', 'src/index.tsx')
   },
    output: {
        path: path.join(__dirname, './../', 'dist'),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            "@components": path.resolve('src/components'),
            "@styles": path.resolve('src/styles'),
        }
    },
    plugins: [...plugin],
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: "awesome-typescript-loader",
                include: [path.resolve('src')],
                exclude: /node_modules/,
                options: {
                    useCache: true,
                    cacheDirectory: path.resolve('cache-loader'),
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPlugin({
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                style: true
                            })
                        ]
                    })
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve( 'src'),
                use: [
                    'style-loader',
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('cache-loader')
                        }
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths:[path.resolve('src/styles')],
                            },
                        }
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }

                    },
                ]
            },
            {//CSS处理
                test: /\.css$/,
                loader: "style-loader!css-loader?modules",
                exclude: /node_modules/,
            },

        ],
    }
}