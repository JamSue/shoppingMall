const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  
  // ###############********改完配置文件记得重启项目*********#################
  // 配置代理服务器解决跨域问题
  devServer:{
    proxy:{
      '/api':{
        target:' http://gmall-h5-api.atguigu.cn', // 目标服务器，提供接口的服务器
        // pathRewrite:{}
      }
    }
  }
})
