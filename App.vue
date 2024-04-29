<script>
    // #ifdef APP-PLUS
    import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate'
    // #endif
    import { mpUpData } from '@/config/common'
    export default {
        onLaunch: function () {
            // #ifdef APP-PLUS
            APPUpdate() //检测app更新
            // #endif
            // #ifdef MP
            mpUpData() //检测小程序更新
            // #endif
            console.log('App Launch')
        },
        onShow: function () {
            console.log('App Show')
        },
        onHide: function () {
            console.log('App Hide')
        }
    }
</script>

<style>
    /*每个页面公共css */
</style>
