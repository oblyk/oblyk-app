<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiBolt }}
      </v-icon>
      {{ $t('components.gymAdmin.openers') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        <span v-if="loadingOpeners">
          ...
        </span>
        <span v-else>
          {{ openers.length }}
        </span>
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        color="primary"
        :to="`${gym.adminPath}/openers`"
      >
        {{ $t('components.gymAdmin.openers') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiBolt } from '@mdi/js'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'

export default {
  name: 'GymAdminOpenersFigures',
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
