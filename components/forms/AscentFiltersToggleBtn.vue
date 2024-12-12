<template>
  <v-row>
    <v-col class="d-flex justify-center align-center">
      <v-btn-toggle
        v-model="filters"
        multiple
        color="primary"
        rounded
        @change="onChange"
      >
        <v-btn value="only_lead_climbs">
          {{ $t('models.ascentCragRoute.only_lead_climbs') }}
        </v-btn>
        <v-btn value="only_on_sight">
          {{ $t('models.ascentCragRoute.only_on_sight') }}
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AscentFiltersToggleBtn',

  data () {
    return {
      filters: ['no_double'] // initialized by default with no_double. Can add later a toggle button, but for now it is always on.
    }
  },

  mounted () {
    this.filters = JSON.parse(localStorage.getItem('filters')) || []
  },

  methods: {
    onChange () {
      this.$emit('input', this.filters)
      localStorage.setItem('filters', JSON.stringify(this.filters))
    }
  }
}
</script>

<style scoped lang="scss">

</style>
