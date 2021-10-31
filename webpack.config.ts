import {Configuration} from 'webpack'
import path from 'path'
import CopyPlugin from "copy-webpack-plugin";

const dist = path.join(__dirname, 'dist');
const src =  path.join(__dirname, 'src');

const config: Configuration = {
    entry: {
        content_script: path.join(src, 'content_script.ts'),
        background: path.join(src, 'background.ts'),
        popup: path.join(src, 'popup.ts'),
        chat: path.join(src, 'chat.ts'),
    },
    output: {
        path: dist,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'manifest.json', to: dist},
                {from: '*.html', to: dist, context: src},
                {from: 'img/*.*', to: dist, context: src},
            ]
        })
    ]
}

export default config;

