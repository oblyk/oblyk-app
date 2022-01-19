import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState()(store)
}
