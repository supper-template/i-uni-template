// #ifdef APP-PLUS
import permision from '@/plugins/permission.js'
// #endif
class Gps {
    constructor(arg) {
        this.lock = false //锁防止重复请求
    }
    async getLocation(
        param = {
            type: 'gcj02',
            geocode: true,
            isHighAccuracy: true
        }
    ) {
        return new Promise(async (callback) => {
            if (this.lock) {
                console.log('已锁，已有另一个请求正在执行。无需重复请求')
                callback(false)
                return false
            }
            this.lock = true //加锁防止重复的请求
            uni.getLocation({
                ...param,
                success: (res) => {
                    this.lock = false //成功后解锁
                    callback(res)
                },
                fail: async (err) => {
                    callback(false)

                    // #ifdef APP-PLUS
                    await this.checkGpsIsOpen()
                    // #endif

                    // #ifdef MP-WEIXIN
                    if (err.errMsg == 'getLocation:fail auth deny') {
                        uni.showModal({
                            content: '应用无定位权限',
                            confirmText: '前往设置',
                            complete: (e) => {
                                if (e.confirm) {
                                    uni.openSetting({
                                        success(res) {
                                            console.log(res.authSetting)
                                        }
                                    })
                                }
                                this.lock = false //解锁让回到界面重新获取
                            }
                        })
                    }
                    if (err.errMsg == 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF') {
                        uni.showModal({
                            content: '未开启定位权限，请前往手机系统设置中开启',
                            showCancel: false,
                            confirmText: '知道了'
                        })
                    }
                    // #endif
                }
            })
        })
    }
    // #ifdef APP-PLUS
    async checkGpsIsOpen() {
        this.lock = true //加锁防止重复的请求
        console.log('检查定位设置开启问题', permision.checkSystemEnableLocation())
        if (!permision.checkSystemEnableLocation()) {
            uni.showModal({
                title: '提示',
                content: '手机定位权限没有开启，是否去开启？',
                success: (res) => {
                    this.lock = false
                    if (res.confirm) {
                        if (uni.getSystemInfoSync().platform == 'ios') {
                            plus.runtime.openURL('app-settings://')
                        } else {
                            var main = plus.android.runtimeMainActivity() //获取activity
                            var Intent = plus.android.importClass('android.content.Intent')
                            var Settings = plus.android.importClass('android.provider.Settings')
                            var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS) //可设置表中所有Action字段
                            main.startActivity(intent)
                        }
                    } else if (res.cancel) {
                        return false
                    }
                }
            })

            return false
        }
        let checkAppGpsRes = await this.checkAppGps()
        if (!checkAppGpsRes) {
            uni.showModal({
                title: '提示',
                content: '权限被拒绝，是否前往开启权限',
                success: (res) => {
                    this.lock = false
                    if (res.confirm) {
                        permision.gotoAppPermissionSetting()
                        callback(false)
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                        return false
                    }
                }
            })
        } else {
            this.lock = false
        }
    }
    async checkAppGps() {
        if (uni.getSystemInfoSync().platform == 'ios' && !permision.judgeIosPermission('location')) {
            return false
        }
        if (
            uni.getSystemInfoSync().platform != 'ios' &&
            (await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')) != 1
        ) {
            return false
        }
        return true
    }
    // #endif
}
export default Gps
