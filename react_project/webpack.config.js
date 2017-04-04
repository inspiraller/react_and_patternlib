var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var merge = require('webpack-merge');

// npm variables 

//package.json = 
// scripts": {
//    "test": "echo \"Error: no test specified\" && exit 1",
//    "prod": "webpack --p",
//    "dev": "webpack-dev-server --port 3000 --hot --inline"
//  },

// OR

// package.json = 
// scripts": {
//    "test": "echo \"Error: no test specified\" && exit 1",
//    "prod": "SET NODE_ENV=prod&webpack --p",
//    "dev": "webpack-dev-server --port 3000 --hot --inline"
//  },

var npmRunScript = process.env.npm_lifecycle_event;   // npm run dev === 'dev'

// paths
var paths = {
    src: path.resolve(__dirname, '../'),
    // src: path.resolve(__dirname, 'spa'),
    bundleOutput: path.join(__dirname, 'www'),
    devServer: path.resolve(__dirname, 'www')
};


// switch jsxLoaders depending on dev or prod mode
var jsxLoaders = {
    test: /\.jsx?/,
    include: paths.src,
    exclude: /(node_modules|bower_components)/
}
var scssLoaders;

var cssLoaders;

if (npmRunScript === 'prod') {
    jsxLoaders.loader = 'babel';
    jsxLoaders.query = {
        cacheDirectory: true, //important for performance
        plugins: ["transform-regenerator"],
        presets: ["react", "es2015"]
    }

    scssLoaders = {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
    cssLoaders = {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
} else {
    jsxLoaders.loaders = ['babel'];

    scssLoaders = {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }
    cssLoaders = {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }    

}


var config = {
    entry: {
        //app: paths.src + '/index.js'
        app: paths.src + '/react_project/assets/js/middleware/boot-client.jsx'
    },
    output: {        
        path: paths.bundleOutput,  
        publicPath: '/dist/', // Alias path to access javascript files from html page: <script src="/wwwroot/dist/bundle.js">              
        filename: '/bundle.js'
    },
    resolve: {
        root: [paths.src],
        extensions: ['', '.js', '.jsx','scss'],
        modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, '../node_modules')
        ]        
    },

    module: {
        loaders: [
            jsxLoaders,
            scssLoaders,
            cssLoaders,
            { test: /\.(png|woff|woff2|eot|ttf|svg|ttf)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css', {
            allChunks: true // if true - ensures that the css for each component is bundled into one file, not separate files.
        })
    ]
};

if (npmRunScript === 'dev') {

    config = merge(config, {
        devtool: 'inline-eval-cheap-source-map', // optimize dev mode            
        //devtool: 'cheap-module-source-map',
        devServer: {
            contentBase: paths.devServer,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });

} else {
    config = merge(config, {

        // Skip any files outside of your project's `src` directory
        exclude: [ //speed up....
          path.resolve(__dirname, "../node_modules"),
        ],        
        devTool: 'cheap-module-source-map', // temporary - restore for production code back back to cheap-module-source-map
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.DefinePlugin({
                '__DEVTOOLS__': false
            }),
            /*, - restore for production code, removed for quicker builds. */
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            new ExtractTextPlugin('bundle.[hash].css', {
                allChunks: true // if true - ensures that the css for each component is bundled into one file, not separate files.
            })            
        ],
        output: {       
            filename: '/bundle.[hash].js'
        }
    });

}

module.exports = config;

