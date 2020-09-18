const path = require('path');

module.exports = [
    {
        name: 'client',
        target: 'web',
        entry: './src/front-end/client.jsx',
        output: {
            path: path.join(__dirname, 'static'),
            filename: 'client.js',
            publicPath: '/static/',
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: path.resolve(__dirname, 'node_modules/'),
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: path.resolve(__dirname, 'node_modules/'),
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: path.resolve(__dirname, 'node_modules/'),
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.(gif|png|jpg)$/,
                    exclude: path.resolve(__dirname, 'node_modules/'),
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true,
                            }
                        }
                    ],
                },
                {
            test: /\.svg$/,
            exclude: path.resolve(__dirname, 'node_modules/'),
            loader: 'svg-react-loader',
            query: {
                classIdPrefix: '[name]-[hash:8]__',
                filters: [
                    function (value) {
                        // ...
                        this.update(value);
                    }
                ],
                propsMap: {
                    fillRule: 'fill-rule',
                    foo: 'bar'
                },
                xmlnsTest: /^xmlns.*$/
            }
        }

        ]
    }
},
{
    name: 'server',
    target: 'node',
    entry: './src/back-end/serverRenderer.jsx',
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/static/',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test:/\.css$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                use: [
                    {
                        loader: 'isomorphic-style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                use: ['file-loader?name=[name].[ext]']
            },
            {
            test: /\.svg$/,
            exclude: path.resolve(__dirname, 'node_modules/'),
            loader: 'svg-react-loader',
            query: {
                classIdPrefix: '[name]-[hash:8]__',
                filters: [
                    function (value) {
                        // ...
                        this.update(value);
                    }
                ],
                propsMap: {
                    fillRule: 'fill-rule',
                    foo: 'bar'
                },
                xmlnsTest: /^xmlns.*$/
            }
        }
    ],
},
}
];
