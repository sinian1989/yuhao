
const path =  require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
const env = process.env.NODE_ENV
let target = process.env.VUE_APP_URL  // development和production环境是不同的
console.log(target)

module.exports = {
   publicPath: './',  // 公共路径
   indexPath: 'index.html' , // 相对于打包路径index.html的路径
   outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
   assetsDir: 'vue-static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
   lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
   runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
   productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // 向 PWA 插件传递选项。
    chainWebpack: config => {
				const svgRule = config.module.rule('svg')
				svgRule.uses.clear()
				svgRule
					.test(/\.svg$/)
					.include.add(path.resolve(__dirname, './src/icons')).end()
					.use('svg-sprite-loader')
					.loader('svg-sprite-loader')
					.options({
						symbolId: 'icon-[name]'
						})
				const fileRule = config.module.rule('file')
				fileRule.uses.clear()
				fileRule
					.test(/\.svg$/)
					.exclude.add(path.resolve(__dirname, './src/icons'))
					.end()
					.use('file-loader')
					.loader('file-loader')
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
						.set('@layout', resolve('src/layout'))
            .set('@views', resolve('src/views'))
            .set('@utils', resolve('src/utils'))
            .set('@api', resolve('src/api'))
            .set('@store', resolve('src/store'));
    },
    devServer: {
            overlay: { // 让浏览器 overlay 同时显示警告和错误
              warnings: true,
              errors: true
            },
            host: "localhost",
            port: 8081, // 端口号
            https: false, // https:{type:Boolean}
            open: true, //配置自动启动浏览器
            hotOnly: true, // 热更新
            // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
            proxy: { //配置多个跨域
                "/": {
                    target: target,
                    changeOrigin: true,
                    // ws: true,//websocket支持
                    secure: false,
                   
                },
                
            }
        }
}
