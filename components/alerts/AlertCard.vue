<template>
  <v-alert
    :icon="false"
    text
    :type="alertType()"
  >
    <div class="d-flex">
      <div
        v-if="alert.alert_type === 'omega_roc'"
        class="pr-3"
      >
        <v-img
          width="40"
          src="/images/omega_roc.png"
          alt="Logo Omega Roc"
        />
      </div>
      <div>
        <markdown-text
          v-if="alert.description"
          :text="alert.description"
        />
      </div>
    </div>
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
          :to="`${alert.app_path}/edit?redirect_to=${$route.fullPath}`"
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
      </div>
    </client-only>
  </v-alert>
</template>

<script>
import { mdiDelete, mdiPencil } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'
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
        new OblykApi(this.$axios, this.$auth)
          .delete(`/alerts/${this.alert.id}`)
          .then(() => {
            this.getAlerts()
          })
      }
    },

    alertType () {
      if (this.alert.alert_type === 'good') {
        return 'success'
      } else if (this.alert.alert_type === 'warning') {
        return 'warning'
      } else if (this.alert.alert_type === 'info') {
        return 'info'
      } else if (this.alert.alert_type === 'bad') {
        return 'error'
      } else if (this.alert.alert_type === 'omega_roc') {
        return 'warning'
      }
    }
  }
}
</script>
