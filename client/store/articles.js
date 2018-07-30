export const state = () => ({
    list: []
})

export const mutations = {
    add (state, news) {
        state.list.push(news)
    },
    emptyList (state) {
        state.list = []
    }
}

export const getters = {
    list: state => {
        return state.list
    }
}