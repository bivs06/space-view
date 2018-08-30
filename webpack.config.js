let webpack = require('webpack');
let path = require('path');

let entries = {
    'app': './src/app.js'
};

const outputPath = path.join(__dirname, './target');

module.exports = {
    entry: entries,
    output: {
        filename: '[name].bundle.js',
        path: outputPath
    },
    resolve: {
        alias: {
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/i,
            use: 'url-loader'
        }, {
            test: /\.partial\.html$/,
            use: 'ng-cache-loader?'
        }, {
            test: /\.template\.html$/,
            use: 'ng-cache-loader?'
        }, {
            test: /yfiles.*.js$/,
            use: 'imports-loader?yfilesLicense'
        }, {
            test: /masonry-layout/,
            use: 'imports-loader?define=>false&this=>window'
        }, {
            test: /angular\.js$/,
            use: 'imports-loader?$=jquery'
        }, {
            test: /angular-.*\.js$/,
            use: 'imports-loader?angular'
        }, {
            test: /jquery-ui\/.*\.js$/,
            use: 'imports-loader?jqueryUi'
        }, {
            test: /jquery\..*\.js$/,
            use: 'imports-loader?$=jquery'
        }, {
            test: /extend-jquery.js$/,
            use: 'imports-loader?$=jquery'
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env'],
                plugins: [
                    ["transform-es2015-classes", { "loose": true }]
                ]
            }
        },{
            include: path.resolve(__dirname, './node_modules/jquery/dist/jquery.js'),
            loader: 'expose-loader?$!expose-loader?jQuery'
        }, {
            include: path.resolve(__dirname, './node_modules/bootstrap/js/bootstrap.js'),
            loader: 'imports-loader?$=jquery,jqueryUi'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            '$ESAPI': 'esapi'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        port: 9090,
        open: true,
        hot: true,
        overlay: true //show full-screen overlay when there are compile errors
    }
}