<template>
  <v-dialog
    v-model="ascentModal"
    width="1000"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-check
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
        {{ $t('components.ascentCragRoute.new', { name: cragRoute.name }) }}
      </v-card-title>
      <v-card-text>
        <ascent-crag-route-form
          :crag-route="cragRoute"
          submit-methode="post"
          :callback="successCallback"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AscentCragRouteForm from '@/components/ascentCragRoutes/forms/AscentCragRouteForm'
export default {
  name: 'AddAscentBtn',
  components: { AscentCragRouteForm },
  props: {
    cragRoute: Object,
    isRepetition: {
      type: Boolean,
      default: false
    }
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
