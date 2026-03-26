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
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'AlertList',
  components: { AlertCard },
  props: {
    objectType: {
      type: String,
      required: true
    },
    objectId: {
      type: [String, Number],
      required: true
    }
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
    getAlerts () {
      this.alerts = []
      new OblykApi(this.$axios, this.$auth)
        .get(
          '/alerts',
          {
            alertable_type: this.objectType,
            alertable_id: this.objectId
          }
        )
        .then((resp) => {
          for (const alert of resp.data) {
            this.alerts.push(alert)
          }
        })
    }
  }
}
</script>
