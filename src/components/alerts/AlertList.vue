<template>
  <div>
    <alert-card
      v-for="alert in alerts"
      :key="alert.id"
      :alert="alert"
      class="mb-4"
      :get-alerts="getAlerts"
    />
  </div>
</template>

<script>
import AlertCard from '@/components/alerts/AlertCard'
import AlertApi from '@/services/oblyk-api/AlertApi'
import Alert from '@/models/Alert'

export default {
  name: 'AlertList',
  components: { AlertCard },
  props: {
    objectType: String,
    objectId: [String, Number]
  },

  data () {
    return {
      alerts: []
    }
  },

  mounted () {
    this.getAlerts()
  },

  methods: {
    getAlerts: function () {
      this.alerts = []
      AlertApi
        .all(
          this.objectType,
          this.objectId
        )
        .then(resp => {
          for (const alert of resp.data) {
            this.alerts.push(new Alert(alert))
          }
        })
    }
  }
}
</script>
