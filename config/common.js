function mpUpData(callback) {
    if (uni.getUpdateManager) {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            let info = {
                type: 1,
                data: res
            }
            callback && callback(info)
        })
        updateManager.onUpdateReady(function (res) {
            uni.showModal({
                title: '更新提示',
                content: '检测到新版本，是否下载新版本并重启小程序？',
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })
        updateManager.onUpdateFailed(function (res) {
            // 新的版本下载失败
            uni.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                showCancel: false
            })
        })
    } else {
        let info = {
            type: 2
        }
        callback && callback(info)
    }
}

export { mpUpData }
