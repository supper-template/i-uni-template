const getDefaultState = () => {
    return {
        chatList: []
    }
}

export default {
    state: getDefaultState(),
    getters: {
        getVuexChatList: (state) => state.chatList
    },
    actions: {
        setChatList({ commit }, list) {
            commit('CHAT_LIST', list)
        },
        clearChatState({ commit }) {
            commit('CLEAR_CHAT_STATE')
        }
    },
    mutations: {
        CHAT_LIST(state, data) {
            state.chatList = data
        },
        // 清除state数据
        CLEAR_CHAT_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    }
}
