import request from './index'
import store from '@/store/index'
import { RequestTypeEnum } from '@/enum/http-enum'

let isRefreshing = false // 当前是否在请求刷新 Token
let requestQueue = [] // 将在请求刷新 Token 中的请求暂存起来，等刷新 Token 后再重新请求

// 执行暂存起来的请求
const executeQueue = (error) => {
    requestQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve()
        }
    })
    requestQueue = []
}

/**
 * 刷新token的方法
 */
const getRefreshToken = () => {
    return request.request({
        method: RequestTypeEnum.POST,
        url: 'app/auth/refresh-token',
        params: {
            refreshToken: store.getters.getVuexTokenInfo.refreshToken
        }
    })
}

// 刷新 Token 请求处理，参数为刷新成功后的回调函数
const refreshToken = () => {
    // 如果当前是在请求刷新 Token 中，则将期间的请求暂存起来
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            requestQueue.push({ resolve, reject })
        })
    }
    isRefreshing = true

    return new Promise((resolve, reject) => {
        getRefreshToken()
            // 假设请求成功接口返回的 code === 200 为刷新成功，其他情况都是刷新失败
            .then((res) => (res.code === 0 ? res : Promise.reject(res)))
            .then((res) => {
                store.dispatch('setTokenInfo', res.data)
                resolve()
                executeQueue(null)
            })
            .catch((err) => {
                store.dispatch('setTokenInfo', {})
                reject(err)
                executeQueue(err || new Error('Refresh token error'))
            })
            .finally(() => {
                isRefreshing = false
            })
    })
}

export default refreshToken
