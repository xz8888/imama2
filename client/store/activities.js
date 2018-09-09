export const state = () => ({
  list: []
})

export const mutations = {
  add(state, activities) {
    state.list.push(activities)
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