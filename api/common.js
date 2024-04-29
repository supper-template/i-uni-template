import request from '@/utils/http'
import { RequestTypeEnum } from '@/enum/http-enum'

/**
 * 本文件只为标明如何使用封装的请求和定义的接口示例，无其他任何使用意义
 */

/**
 * 获取随机人生短语
 * 仅为调用第三方接口示例
 */
export const getRenShengSort = () => {
    return request.request({
        method: RequestTypeEnum.GET,
        url: `https://v1.jinrishici.com/rensheng.txt`
    })
}

/**
 * 获取验证码
 * @param {*} data {mobile: '',scene: 6}
 * 仅为调用服务端接口实例
 */
export const getSmsCode = (data) => {
    return request.request({
        method: RequestTypeEnum.POST,
        url: `send-sms-code`,
        data
    })
}

// 如何使用

// import { getRenShengSort } from '@/api/common'
// const res = await getRenShengSort()

// 或者

// import { getRenShengSort } from '@/api/common'
// getRenShengSort().then(() => { }).catch(() => { })
