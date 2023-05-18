const actions = {
  async GET_BOOKS({ commit }, { curriculum, date, name, subject, format, level, category }) {
    try {
      const { data } = await this.$axios.get('/app/list_books/', {
        params: { curriculum , date, name, subject, format, level, category },
      })
      commit('setBooks', data.data)
    } catch (error) {
      return error
    }
  },
  async LOGIN_READER({ commit }, payload) {
    try {
      const { data } = await this.$axios.post('/app/login/', payload)
      commit('setReader', data.data)
      this.$cookies.set('reader-token', data.data.token)
    } catch (error) {
      console.log(error)
    }
  },
  logout ({ commit }) {
    commit('logout')
    this.$cookies.remove('reader-token')
    this.$cookies.remove('slate-token')
  }
};

export default actions;
