let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://dev.shopxo.net/'
}else{
    // 生产环境
    url_config = 'https://dev.shopxo.net/'
}

export default url_config