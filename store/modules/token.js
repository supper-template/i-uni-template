const getDefaultState = () => {
    return {
        tokenInfo: {}
    }
}

export default {
    state: getDefaultState(),
    getters: {
        getVuexTokenInfo: (state) => state.tokenInfo
    },
    actions: {
        setTokenInfo({ commit }, tokenInfo) {
            commit('TOKEN_INFO', tokenInfo)
        },
        clearTokenState({ commit }) {
            commit('CLEAR_TOKEN_STATE')
        }
    },
    mutations: {
        TOKEN_INFO(state, data) {
            state.tokenInfo = data
        },
        // 清除state数据
        CLEAR_TOKEN_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    }
}
