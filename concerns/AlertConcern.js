import OblykApi from '~/services/oblyk-api/OblykApi'

export const AlertConcern = {
  data () {
    return {
      alert: null,
      loadingAlert: true
    }
  },

  created () {
    if (this.$route.params.alertId) { this.getAlert() }
  },

  methods: {
    getAlert () {
      this.loadingAlert = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/alerts/${this.$route.params.alertId}`)
        .then((resp) => {
          this.alert = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'alert')
        })
        .finally(() => {
          this.loadingAlert = false
        })
    }
  }
}
