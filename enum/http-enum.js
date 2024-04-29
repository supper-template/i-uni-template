/**
 * 请求结果返回码
 */
export const ResultEnum = {
    // 成功
    SUCCESS: 0,
    ERROR: -1,
    // 未登录或Token失效
    NO_AUTH: 401,
    NO_PACKAGE: 307,
    NO_PERMISSION: 403
}

/**
 * 请求方法
 */

export const RequestTypeEnum = {
    // 获取
    GET: 'GET',
    // 发送post请求
    POST: 'POST',
    // 发送put请求
    PUT: 'PUT',
    // 发送delete请求
    DELETE: 'DELETE',
    // 发送patch请求
    PATCH: 'PATCH'
}

export const ContentTypeEnum = {
    // JSON
    JSON: 'application/json;charset=UTF-8',
    // Text
    Text: 'text/plain;charset=UTF-8'
}
