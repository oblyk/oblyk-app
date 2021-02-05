<template>
  <v-dialog
    v-model="ascentModal"
    width="1000"
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
import AscentCragRouteForm from '@/components/ascentCragRoutes/forms/AscentCragRouteForm'

export default {
  name: 'EditAscentBtn',
  components: { AscentCragRouteForm },
  props: {
    cragRoute: Object,
    ascentCragRoute: Object
  },

  data () {
    return {
      ascentModal: false
    }
  },

  methods: {
    successCallback: function () {
      this.$root.$emit('reloadAscentCragRoute')
      this.ascentModal = false
    }
  }
}
</script>
