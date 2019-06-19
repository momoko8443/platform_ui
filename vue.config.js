const CompressionWebpackPlugin = require('compression-webpack-plugin');



let config = {
    //outputDir: "../eop_web_server/private",
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        }
    },
    productionSourceMap: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end()
    },
    configureWebpack: () => ({
        // externals: {
        //     'vue': 'Vue',
        //     'fetch-jsonp': 'fetch-jsonp',
        //     'reqwest': 'reqwest'
        // },
        plugins: (() => {
            const useGZ = !!+process.env.USE_GZ;
            let gz_plugin = null;
            if(useGZ){
                gz_plugin = new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.json$|\.css/,
                    threshold: 0, // 只有大小大于该值的资源会被处理
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: true // 删除原文件
                });
                return [gz_plugin];
            }
            return [];
        })(),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        test: /node_modules/,
                        name: "vendor",
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100,
                    },
                    common: {
                        chunks: "all",
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: "common",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
    }),
}





module.exports = config;