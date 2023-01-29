<template>
  <v-card
    :to="`${gym.adminPath}/openers`"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        {{ mdiBolt }}
      </v-icon>
      {{ $t('components.gymAdmin.openers') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <spinner v-if="loadingOpeners" :full-height="false" />
      <strong
        v-if="!loadingOpeners"
        class="big-font-size"
      >
        {{ openers.length }}
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiBolt } from '@mdi/js'
import Spinner from '@/components/layouts/Spiner'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'

export default {
  name: 'GymAdminOpenersFigures',
  components: { Spinner },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingOpeners: true,
      openers: [],

      mdiBolt
    }
  },

  created () {
    this.getOpeners()
  },

  methods: {
    getOpeners () {
      new GymOpenerApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          this.openers = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.loadingOpeners = false
        })
    }
  }
}
</script>
