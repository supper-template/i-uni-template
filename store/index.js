import Vue from 'vue'
import Vuex from 'vuex'

// 在vuex的配置文件中配置插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import token from './modules/token'

const store = new Vuex.Store({
    modules: {
        token
    },
    plugins: [
        createPersistedState({
            // 传入参数
            storage: {
                getItem: (key) => uni.getStorageSync(key),
                setItem: (key, val) => uni.setStorageSync(key, val),
                removeItem: (key) => uni.removeStorageSync(key)
            }
        })
    ]
})

export default store
