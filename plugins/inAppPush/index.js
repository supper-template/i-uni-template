import app_push from './app_push'

const appPush = {
    install: function (Vue) {
        Vue.prototype.$appPush = function (op = {}) {
            new app_push({
                ...op
            }).show()
        }
    }
}

export default appPush
