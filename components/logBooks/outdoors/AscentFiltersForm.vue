<template>
  <div>
    <v-btn v-if="!showForm" @click="showForm=!showForm">
      {{ $t('components.logBook.filterTheLogBook') }}
    </v-btn>
    <v-form v-if="showForm" @submit.prevent="onSubmit()">
      <ascent-status-input
        v-model="filters.ascentStatusList"
        multiple
        with-repetition
        with-sent
        :with-project="false"
        :required="false"
      />

      <roping-status-input
        v-model="filters.ropingStatusList"
        multiple
        :required="false"
      />

      <climbing-type-input
        v-model="filters.climbingTypesList"
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
        ascentStatusList: [],
        ropingStatusList: [],
        climbingTypesList: [],
        otherFilters: ['no_double'] // initialized by default with no_double. Can add later a toggle button, but for now it is always on.
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
    // recover from local storage and reset if one key is missing in the stored filters
    if (typeof localStorage !== 'undefined') {
      const storedFilters = JSON.parse(localStorage.getItem('filters')) || {}
      this.filters = {
        ascentStatusList: Array.isArray(storedFilters.ascentStatusList) ? storedFilters.ascentStatusList : [],
        ropingStatusList: Array.isArray(storedFilters.ropingStatusList) ? storedFilters.ropingStatusList : [],
        climbingTypesList: Array.isArray(storedFilters.climbingTypesList) ? storedFilters.climbingTypesList : [],
        otherFilters: ['no_double'] // Always keep this initialized
      }
    }
    this.$emit('input', this.filters)
  },

  methods: {
    onSubmit () {
      this.showForm = false
      localStorage.setItem('filters', JSON.stringify(this.filters))
    }
  }
}
</script>

<style scoped lang="scss">

</style>
