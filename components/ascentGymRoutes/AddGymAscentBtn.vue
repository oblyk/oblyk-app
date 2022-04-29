<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiCheck }}
        </v-icon>
        <span v-if="isRepetition">
          {{ $t('actions.addRepetition') }}
        </span>
        <span v-else>
          {{ $t('actions.addInMyLogbook') }}
        </span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('components.ascentGymRoute.new', { name: gymRoute.name }) }}
      </v-card-title>
      <v-card-text>
        <ascent-gym-route-form
          :gym-route="gymRoute"
          submit-methode="post"
          :callback="successCallback"
          :default-ascent-status="isRepetition ? 'repetition' : 'sent'"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCheck } from '@mdi/js'
import AscentGymRouteForm from '@/components/ascentGymRoutes/forms/AscentGymRouteForm'

export default {
  name: 'AddGymAscentBtn',
  components: { AscentGymRouteForm },
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    isRepetition: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiCheck,
      ascentModal: false
    }
  },

  methods: {
    successCallback () {
      this.$root.$emit('reloadAscentGymRoute')
      this.ascentModal = false
    }
  }
}
</script>
