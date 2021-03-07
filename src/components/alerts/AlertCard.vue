<template>
  <div
    class="oblyk-alert"
    v-bind:class="`oblyk-alert-${alert.alert_type}`"
  >
    <markdown-text :text="alert.description" />
    <div v-if="isSuperAdmin" class="text-right">
      <v-btn
        @click="deleteAlert()"
        icon
      >
        <v-icon small>mdi-delete</v-icon>
      </v-btn>

      <v-btn
        icon
        :to="`${alert.path('edit')}?redirect_to=${$route.fullPath}`"
      >
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import MarkdownText from '@/components/ui/MarkdownText'
import { SessionConcern } from '@/concerns/SessionConcern'
import AlertApi from '@/services/oblyk-api/AlertApi'

export default {
  name: 'AlertCard',
  mixins: [SessionConcern],
  components: { MarkdownText },
  props: {
    alert: Object,
    getAlerts: Function
  },

  methods: {
    deleteAlert: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        AlertApi
          .delete(this.alert.id)
          .then(() => {
            this.getAlerts()
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.oblyk-alert {
  border-left-style: solid;
  border-width: 4px;
  padding: 1px 15px;
  &.oblyk-alert-good {
    border-color: #4caf50;
    color: #388e3c;
  }
  &.oblyk-alert-warning {
    border-color: #ffc107;
  }
  &.oblyk-alert-info {
    border-color: #03a9f4;
  }
  &.oblyk-alert-bad {
    border-color: #d32f2f;
    color: #ef5350;
  }
}
</style>
