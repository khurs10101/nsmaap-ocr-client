const path= require('path');

module.exports={
    entry: ['babel-polyfill' ,'./src/test/app.js'],
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
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