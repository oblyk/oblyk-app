<template>
  <v-dialog
    v-model="ascentModal"
    width="1000"
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
        {{ $t('components.ascentCragRoute.edit', { name: cragRoute.name }) }}
      </v-card-title>
      <v-card-text>
        <ascent-crag-route-form
          :crag-route="cragRoute"
          :ascent-crag-route="ascentCragRoute"
          submit-methode="put"
          :callback="successCallback"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPencil } from '@mdi/js'
import AscentCragRouteForm from '@/components/ascentCragRoutes/forms/AscentCragRouteForm'

export default {
  name: 'EditCragAscentBtn',
  components: { AscentCragRouteForm },
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    ascentCragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPencil,
      ascentModal: false
    }
  },

  methods: {
    successCallback () {
      this.$root.$emit('reloadAscentCragRoute')
      this.ascentModal = false
    }
  }
}
</script>
