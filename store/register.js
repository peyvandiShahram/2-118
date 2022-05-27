
export const state = () => ({
  phone: null
})

export const mutations = {
  setUser (state, phone) {
    state.phone = phone
  }
}
export const getters = {
  getPhone (state) {
    return state.phone
  }
}
