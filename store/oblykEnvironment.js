// States
export const state = () => ({
  oblykEnvironment: null,
  hubs: []
})

// Getters
export const getters = {
  getOblykEnvironnement: (state) => {
    return state.oblykEnvironment
  },

  getPreviousHubs: state => (currentPath, hubPath) => {
    if (currentPath === hubPath) {
      let hubIndex = null
      for (const index in state.hubs) {
        if (state.hubs[index].hub === hubPath) {
          hubIndex = index
          break
        }
      }
      if (hubIndex > 0) {
        return state.hubs[hubIndex - 1].page
      } else if (state.hubs.length > 1) {
        return state.hubs[state.hubs.length - 1].page
      }
    } else {
      return hubPath
    }
  }
}

// Actions
export const actions = {
  changeOblykEnvironnement ({ commit }, environnent) {
    commit('changeOblykEnvironnement', environnent)
  },

  pushHubs ({ commit }, pages) {
    commit('pushHubs', pages)
  },

  clearHubs ({ commit }) {
    commit('clearHubs')
  }
}

// Mutations
export const mutations = {
  changeOblykEnvironnement (state, payload) {
    state.oblykEnvironment = payload
  },

  pushHubs (state, payload) {
    state.hubs ||= []

    // Delete all path after current hub path
    if (state.hubs.length > 0) {
      for (const hubIndex in state.hubs) {
        if (state.hubs[hubIndex].hub === payload.hub) {
          state.hubs[hubIndex].page = payload.page
          state.hubs.length = parseInt(hubIndex) + 1
          return
        }
      }
    }

    // Push new path in hub
    state.hubs.push(payload)
  },

  clearHubs (state) {
    state.hubs = []
  }
}
