const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            // JS / JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env',
                                  '@babel/react',{
                                      'plugins': ['@babel/plugin-proposal-class-properties']}]
                    }
                }
            },
            // HTML
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            // CSS
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.ejs",
            filename: "./index.html"
        })
    ]
};
