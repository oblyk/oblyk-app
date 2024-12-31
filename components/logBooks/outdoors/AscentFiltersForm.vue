<template>
  <div>
    <v-btn v-if="!showForm" @click="showForm=!showForm">
      {{ $t('components.logBook.filterTheLogBook') }}
    </v-btn>
    <v-form v-if="showForm" @submit.prevent="onSubmit()">
      <ascent-status-input
        v-model="filters.ascent_status_list"
        multiple
        with-repetition
        with-sent
        :with-project="false"
        :required="false"
      />

      <roping-status-input
        v-model="filters.roping_status_list"
        multiple
        :required="false"
      />

      <climbing-type-input
        v-model="filters.climbing_types_list"
        multiple
        environment="crag"
        input-type="chips"
      />

      <submit-form
        :overlay="false"
        :submit-local-key="'actions.save'"
        :go-back-btn="false"
      />
    </v-form>
  </div>
</template>

<script>
import AscentStatusInput from '~/components/forms/AscentStatusInput'
import RopingStatusInput from '~/components/forms/RopingStatusInput'
import SubmitForm from '~/components/forms/SubmitForm'
import ClimbingTypeInput from '~/components/forms/ClimbingTypeInput'

export default {
  name: 'AscentFiltersForm',
  components: { ClimbingTypeInput, SubmitForm, RopingStatusInput, AscentStatusInput },

  data () {
    return {
      showForm: false,
      filters: {
        ascent_status_list: [],
        roping_status_list: [],
        climbing_types_list: [],
        no_double: false // initialized by default true. Can add later a toggle button, but for now it is always on.
      }
    }
  },

  watch: {
    // Watch for changes in filters and emit automatically
    filters: {
      handler (newFilters) {
        this.$emit('input', { ...newFilters }) // Emit fresh copy of changes
      },
      deep: true // Ensure nested changes in filters are detected
    }
  },

  mounted () {
    // recover from local storage and reset if one key is missing in the stored filters (to keep the app working if we change filters)
    if (typeof localStorage !== 'undefined') {
      const storedFilters = JSON.parse(localStorage.getItem('filters')) || {}
      this.filters = {
        ascent_status_list: Array.isArray(storedFilters.ascent_status_list) ? storedFilters.ascent_status_list : this.getAllAscentStatus,
        roping_status_list: Array.isArray(storedFilters.roping_status_list) ? storedFilters.roping_status_list : this.getAllRopingStatus,
        climbing_types_list: Array.isArray(storedFilters.climbing_types_list) ? storedFilters.climbing_types_list : this.getAllClimbingTypes,
        no_double: false
      }
    }
    this.$emit('input', this.filters)
  },

  methods: {
    onSubmit () {
      this.showForm = false
      localStorage.setItem('filters', JSON.stringify(this.filters))
    },
    getAllAscentStatus () {
      return ['onsight', 'flash', 'red_point', 'project', 'sent', 'repetition']
    },
    getAllRopingStatus () {
      return ['lead_climb', 'top_rope', 'multi_pitch_leader', 'multi_pitch_second', 'multi_pitch_alternate_lead']
    },
    getAllClimbingTypes () {
      return ['sport_climbing', 'bouldering', 'multi_pitch', 'trad_climbing', 'aid_climbing', 'deep_water', 'via_ferrata']
    }
  }
}
</script>

<style scoped lang="scss">

</style>
