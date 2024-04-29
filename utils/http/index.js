// 引入 uni-ajax 模块
import ajax from 'uni-ajax'
import _ from 'lodash'

import refreshToken from './refresh'
import store from '@/store'
import { ContentTypeEnum, ResultEnum } from '@/enum/http-enum'
import { baseUrl } from '@/config/base'

class IAxios {
    options
    // 请求实例
    instance

    constructor(options) {
        this.options = options
    }
    request(configs, options) {
        this.instance = ajax.create()
        const _conf = _.cloneDeep(configs)
        const _opts = Object.assign({}, this.options, options)

        // 格式化接口地址，兼容第三方接口
        _conf.url =
            _conf?.url?.startsWith('http://') || _conf?.url?.startsWith('https://')
                ? _conf?.url
                : `${baseUrl}/${_conf?.url}`

        const { contentType, isTransformRequestResult, timeoutNumber, notIgnoreToken } = _opts

        // request拦截器
        this.instance.interceptors.request.use(
            (config) => {
                if (contentType) {
                    config.header['Content-Type'] = contentType
                }
                // 默认向所有请求添加token,如果不想带token则在定义API时此参数传true
                if (!notIgnoreToken) {
                    config.header.Authorization = store.getters.getVuexTokenInfo.accessToken || ''
                }
                // 是否需要设置超时时长
                config.header.timeout = timeoutNumber

                return config
            },
            (error) => {
                // 对请求错误做些什么
                return Promise.reject(error)
            }
        )

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response) => {
                // response为Http浏览器返回的所有信息
                const { data: _data } = response
                console.log(_data)
                // 与服务端约定统一的返回格式，目前约定方式为{code,data,msg}
                const { code, data } = _data
                switch (code) {
                    case ResultEnum.SUCCESS:
                        // 是否需要格式化接口出参
                        if (isTransformRequestResult) {
                            return Promise.resolve(data)
                        } else {
                            return Promise.resolve(_data)
                        }
                    case ResultEnum.NO_AUTH:
                        return refreshToken().then(() => this.instance(response.config))
                    default:
                        return Promise.resolve(_data)
                }
            },
            (error) => {
                // 对响应错误做些什么
                return Promise.reject(error)
            }
        )
        return this.instance(_conf)
    }
}

/**
 * 请求类接口实现
 */
const Http = new IAxios({
    // 请求类型
    contentType: ContentTypeEnum.JSON,
    // 是否需要格式化返回数据格式(一般情况下是在调用第三方API时)
    isTransformRequestResult: false,
    // 超时时间
    timeoutNumber: 5000,
    // 是否忽略token
    notIgnoreToken: false
})
export default Http
