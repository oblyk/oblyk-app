<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>mdi-pencil</v-icon>
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
import AscentGymRouteForm from '@/components/ascentGymRoutes/forms/AscentGymRouteForm'

export default {
  name: 'EditGymAscentBtn',
  components: { AscentGymRouteForm },
  props: {
    gymRoute: Object,
    ascentGymRoute: Object
  },

  data () {
    return {
      ascentModal: false
    }
  },

  methods: {
    successCallback: function () {
      this.$root.$emit('reloadAscentGymRoute')
      this.ascentModal = false
    }
  }
}
</script>
