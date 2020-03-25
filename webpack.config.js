const path= require('path');

module.exports={
    mode: 'development',
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname,'public'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    

    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname,'public'),
        historyApiFallback: true
    }
}