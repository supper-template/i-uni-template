// #ifdef APP-PLUS
import permision from '@/plugins/permission.js'
// #endif

import { permissionEnum } from '@/enum/permission-enum.js'

async function useAuthPermission(permissionId) {
    const enumData = permissionEnum[permissionId]
    let result = false
    // #ifdef APP
    let os = uni.getSystemInfoSync().osName
    if (os == 'ios') {
        result = await permision.judgeIosPermission(enumData.ios)
    } else {
        result = await permision.requestAndroidPermission(`android.permission.${enumData.android}`)
    }
    // #endif

    // #ifndef APP
    result = await checkMpAuth(enumData.mp)
    // #endif
    return result
}

function checkMpAuth(auth) {
    return new Promise((resolve, reject) => {
        uni.authorize({
            scope: `scope.${auth}`,
            success: async function (e) {
                resolve(true)
            },
            fail: async function () {
                reject(false)
            }
        })
    })
}

function useGoAuthSetting() {
    // #ifdef APP
    permision.gotoAppPermissionSetting()
    // #endif

    // #ifndef APP
    uni.openSetting()
    // #endif
}

export default {
    useAuthPermission,
    useGoAuthSetting
}
