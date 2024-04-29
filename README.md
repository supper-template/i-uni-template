## uniapp 快速开发项目框架

不建议使用第三方 ui 库并全局导入。最好的方法是使用到什么插件在插件市场最贴合自己使用的选择导入。

-   [x] dayjs
-   [x] store
-   [x] app 检查更新/小程序检查更新
-   [x] request 请求

### 开始使用

`yarn`

1.请设置你的服务端请求地址--路径：config/base.js;
2.app 请设置更新接口--路径：config/componentConfig.js;

### 项目结构

```
├── api  									// 主包请求API和分包公共API
├── components                             	// 组件
├── config
│   ├── base.js                        	    // 基础配置(域名)
├── enum
│   ├── http-enum.js                        // http请求枚举值
│   ├── permission-enum.js                  // 权限枚举值
├── hook  									// hook
│   ├── usePermission.js                        // 权限判断
│   ├── useLocation.js                          // 定位权限判断（一般都是放在onShow里面，会造成死循环故加概念锁避免死循环）
├── mixins  							    // mixin
│   ├── mpMixin.js                              // 去掉自定义组件包裹层
├── packageA                                // 项目分包
│   ├── api  									// API
│   ├── hook  									// 可能没有
│   ├── mixins  								// 可能没有
│   ├── components  							// 组件
│   ├── pages  									// 页面
├── pages  									// 项目页面
├── plugins  								// 功能js（插件）
│   ├── inAppPush                               // App站内消息通知
│   ├── permission.js                           // Android、iOS应用权限判断
├── static                             		// 静态资源文件
│   ├── audio                             		// 系统提示音
│   ├── push                             		// App站内消息配图
├── store                          			// vuex
├── styles                          		// 公共样式
├── utils                          		    // 工具类
│   ├── http
│   │   ├── index.js                        // 请求实体类
│   │   ├── refresh.js 						// 刷新Token
├── App.vue                                	// 项目基础文件
├── main.js                                	// 项目基础文件
...

```

inAppPush--App 站内通知
只要在入口 App.vue 文件注册监听消息不管在哪个页面都可以在页面上方弹出。（推荐使用阿里云的移动推送服务）
使用示例：（目前只在安卓手机进行了测试，未在 ios 上运行）

```
// main.js

// #ifdef APP-PLUS
import appPush from '@/plugins/inAppPush/index.js'

import Vue from 'vue'
Vue.use(appPush)
// #endif

// 在App.vue->onLaunch里注册接收服务端消息。

let params = {
    messageTitle: '消息标题',
    messageContent: '消息内容',
    messageImage: 'https://test999.cgc999.com/group1/M00/00/57/CgEKmGAC87eARAQFAANXI1t4oU4904.png'
}
this.$appPush(params)
```
