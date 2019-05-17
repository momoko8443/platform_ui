module.exports = {
    outputDir: "../eop_web_server/web/dist",
    devServer: {
        proxy: 'http://localhost:3000'
    }
}