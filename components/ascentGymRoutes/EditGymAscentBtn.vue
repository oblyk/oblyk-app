<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        small
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          {{ mdiPencil }}
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('components.ascentGymRoute.edit') }}
      </v-card-title>
      <v-card-text>
        <ascent-gym-route-form
          :gym-route="gymRoute"
          :ascent-gym-route="ascentGymRoute"
          submit-methode="put"
          :callback="successCallback"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPencil } from '@mdi/js'
import AscentGymRouteForm from '@/components/ascentGymRoutes/forms/AscentGymRouteForm'

export default {
  name: 'EditGymAscentBtn',
  components: { AscentGymRouteForm },
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    ascentGymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ascentModal: false,

      mdiPencil
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
