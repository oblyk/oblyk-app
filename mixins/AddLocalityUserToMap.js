import LocalityUserApi from '~/services/oblyk-api/LocalityUserApi'

export const AddLocalityUserToMap = {
  data () {
    return {
      localityUsers: []
    }
  },

  mounted () {
    if (this.$auth.loggedIn) {
      this.getLocalityUsers()
    }
  },

  methods: {
    getLocalityUsers () {
      new LocalityUserApi(this.$axios, this.$auth)
        .all(true)
        .then((resp) => {
          this.localityUsers = resp.data
        })
    }
  }
}
