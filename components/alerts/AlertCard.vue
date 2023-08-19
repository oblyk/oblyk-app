<template>
  <div
    class="oblyk-alert"
    :class="`oblyk-alert-${alert.alert_type}`"
  >
    <markdown-text
      v-if="alert.description"
      :text="alert.description"
    />
    <client-only>
      <div
        v-if="$auth.loggedIn && $auth.user.super_admin"
        class="text-right"
      >
        <v-btn
          icon
          @click="deleteAlert()"
        >
          <v-icon small>
            {{ mdiDelete }}
          </v-icon>
        </v-btn>

        <v-btn
          icon
          :to="`${alert.path}/edit?redirect_to=${$route.fullPath}`"
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mdiDelete, mdiPencil } from '@mdi/js'
import AlertApi from '~/services/oblyk-api/AlertApi'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'AlertCard',
  components: { MarkdownText },
  props: {
    alert: {
      type: Object,
      required: true
    },
    getAlerts: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      mdiDelete,
      mdiPencil
    }
  },

  methods: {
    deleteAlert () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new AlertApi(this.$axios, this.$auth)
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
