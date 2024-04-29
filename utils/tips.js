/**
 * 基于uni-app的原生方法进行二次封装的提示与加载工具类
 */
export default class Tips {
    constructor() {
        this.isLoading = false
        this.pause = false
    }
    static modal(text, title = '', confirmText = '确定', showCancel = false) {
        return new Promise((resolve, reject) => {
            uni.showModal({
                title,
                content: text,
                showCancel,
                confirmText,
                confirmColor: '#4263EB',
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    }

    static loading(title = '加载中') {
        if (Tips.isLoading) {
            return
        }
        Tips.isLoading = true
        if (uni.showLoading) {
            uni.showLoading({
                title,
                mask: true
            })
        }
    }
    static loaded() {
        if (Tips.isLoading) {
            Tips.isLoading = false
            if (uni.hideLoading) {
                uni.hideLoading()
            }
        }
    }

    static toast(title, onHide, { icon = 'none', duration = 1500 } = {}) {
        uni.showToast({
            title,
            icon,
            mask: true,
            duration
        })
        if (onHide) {
            setTimeout(() => {
                onHide()
            }, duration)
        }
    }
}
Tips.isLoading = false
