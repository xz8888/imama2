export const state = () => ({
  article: null
})

export const mutations = {
  set (state, article) {
    state.article = article
  },
  empty (state) {
    state.article = null
  }
}

export const getters = {
  article: state => {
    return state.article
  }
}