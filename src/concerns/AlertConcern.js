import Alert from '@/models/Alert'

export const AlertConcern = {
  data () {
    return {
      alert: null,
      loadingAlert: true
    }
  },

  created () {
    if (this.$route.params.alertId) this.getAlert()
  },

  methods: {
    getAlert: function () {
      this.loadingAlert = true
      new Alert()
        .find(this.$route.params.alertId)
        .then(resp => {
          this.alert = resp
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'alert')
        })
        .finally(() => {
          this.loadingAlert = false
        })
    }
  }
}
