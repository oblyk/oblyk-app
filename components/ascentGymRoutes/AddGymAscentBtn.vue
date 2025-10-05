<template>
  <v-dialog
    v-model="ascentModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        elevation="0"
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          size="25"
          left
        >
          {{ mdiPlusBoxOutline }}
        </v-icon>
        {{ inMyLogBook ? $t('actions.addRepetition') : $t('actions.addInMyLogbook') }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="pt-2 px-2">
        {{ $t('components.ascentGymRoute.new', { name: gymRoute.name }) }}
      </v-card-title>
      <v-card-text class="px-2 pb-2">
        <ascent-gym-route-form
          :key="`ascent-gym-route-form-key-${ascentGymRouteFormKey}`"
          :gym-route="gymRoute"
          submit-methode="post"
          :callback="successCallback"
          :default-ascent-status="inMyLogBook ? 'repetition' : 'red_point'"
          :repetition="inMyLogBook"
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
      inMyLogBook: false,
      ascentGymRouteFormKey: 0,
      myAscents: this.gymRoute?.my_ascents || [],

      mdiPlusBoxOutline
    }
  },

  computed: {
    storeAscents () {
      return this.$store.getters['ascentsPusher/gymRoutesAscents']
    }
  },

  watch: {
    storeAscents: {
      handler () {
        const storeAscents = this.$store.getters['ascentsPusher/gymRoutesAscents']
        if (storeAscents && storeAscents[this.gymRoute.id]) {
          this.myAscents = storeAscents[this.gymRoute.id]
          this.setInMyLogBook()
        }
      },
      deep: true
    }
  },

  mounted () {
    this.setInMyLogBook()
  },

  methods: {
    successCallback () {
      this.ascentGymRouteFormKey += 1
      this.ascentModal = false
    },

    setInMyLogBook () {
      for (const ascent of this.myAscents || []) {
        if (ascent.gym_route_id === this.gymRoute.id && ascent.ascent_status !== 'project') {
          this.inMyLogBook = true
          return
        }
      }

      this.inMyLogBook = false
    }
  }
}
</script>
