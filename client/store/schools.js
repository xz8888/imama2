export const state = () => ({
  list: []
})

export const mutations = {
  add(state, school) {
    state.list.push(school)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}