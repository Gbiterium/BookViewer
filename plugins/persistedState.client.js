import createPersistedState from 'vuex-persistedstate'


export default ({ store }) => {
  createPersistedState({
    key: 'reader',
    paths: ['reader'],
  })(store)
}
