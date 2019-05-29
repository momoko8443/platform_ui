module.exports = {
    //outputDir: "../eop_web_server/private",
    devServer: {
        proxy: {
            "/api":{
                target: "https://1cd910fc-f31f-4406-a658-2228cff31ea3.mock.pstmn.io"
            }
        }
    }
}