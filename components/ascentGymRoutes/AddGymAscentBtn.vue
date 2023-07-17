<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        class="black-btn-icon --with-border"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          size="25"
          left
        >
          {{ mdiPlusBoxOutline }}
        </v-icon>
        <span v-if="inMyLogBook">
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
          :default-ascent-status="inMyLogBook ? 'repetition' : 'sent'"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlusBoxOutline } from '@mdi/js'
import AscentGymRouteForm from '@/components/ascentGymRoutes/forms/AscentGymRouteForm'

export default {
  name: 'AddGymAscentBtn',
  components: { AscentGymRouteForm },
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ascentModal: false,

      mdiPlusBoxOutline
    }
  },

  computed: {
    gymRouteAscents () {
      return this.$auth.loggedIn ? this.$auth.user.ascent_gym_routes || [] : []
    },

    inMyLogBook () {
      let inMyLogBook = false
      for (const ascent of this.gymRouteAscents) {
        if (ascent.gym_route_id === this.gymRoute.id && ascent.ascent_status !== 'project') {
          inMyLogBook = true
          break
        }
      }
      return inMyLogBook
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
