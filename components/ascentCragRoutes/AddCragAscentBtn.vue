<template>
  <v-dialog
    v-model="ascentModal"
    width="1000"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        class="black-btn-icon --with-border"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiPlusBoxOutline }}
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
import { mdiPlusBoxOutline } from '@mdi/js'
import AscentCragRouteForm from '@/components/ascentCragRoutes/forms/AscentCragRouteForm'

export default {
  name: 'AddCragAscentBtn',
  components: { AscentCragRouteForm },
  props: {
    cragRoute: {
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
      ascentModal: false,

      mdiPlusBoxOutline
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
