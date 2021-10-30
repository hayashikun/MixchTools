import {Configuration} from 'webpack'
import path from 'path'
import CopyPlugin from "copy-webpack-plugin";

const dist = path.join(__dirname, 'dist');

const config: Configuration = {
    entry: {
        content_script: path.join(__dirname, 'content_script.ts'),
        background: path.join(__dirname, 'background.ts'),
        popup: path.join(__dirname, 'popup.ts'),
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
        extensions: ['ts', 'js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'manifest.json', to: dist},
                {from: '*.html', to: dist},
                {from: 'img/*.*', to: dist},
            ]
        })
    ]
}

export default config;

