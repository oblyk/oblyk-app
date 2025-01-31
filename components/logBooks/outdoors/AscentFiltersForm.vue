<template>
  <div>
    <v-btn v-if="!showForm" @click="showForm =! showForm">
      {{ $t('components.logBook.filterTheLogBook') }}
    </v-btn>
    <v-form v-if="showForm" @submit.prevent="onSubmit()">
      <ascent-status-input
        v-if="!onlyClimbingFilter"
        v-model="filters.ascentStatusList"
        multiple
        with-repetition
        with-sent
        :with-project="false"
        :required="false"
      />

      <roping-status-input
        v-if="!onlyClimbingFilter"
        v-model="filters.ropingStatusList"
        multiple
        :required="false"
      />

      <climbing-type-input
        v-model="filters.climbingTypeList"
        multiple
        environment="crag"
        input-type="chips"
      />

      <submit-form
        :overlay="false"
        :submit-local-key="'actions.apply'"
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

  props: {
    onlyClimbingFilter: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showForm: false,
      filters: {
        ascentStatusList: [],
        ropingStatusList: [],
        climbingTypeList: []
      }
    }
  },

  mounted () {
    if (this.onlyClimbingFilter) {
      // no local storage. Use default filters each time.
      this.filters = {
        ascentStatusList: this.getAllAscentStatus(),
        ropingStatusList: this.getAllRopingStatus(),
        climbingTypeList: this.getAllClimbingTypes()
      }
    } else {
      // recover from local storage and reset if one key is missing in the stored filters (to keep the app working if we change filters)
      let storedFilters = localStorage.getItem('filters')
      if (storedFilters) {
        storedFilters = JSON.parse(storedFilters) || {}
        this.filters = {
          ascentStatusList: Array.isArray(storedFilters.ascentStatusList) ? storedFilters.ascentStatusList : this.getAllAscentStatus(),
          ropingStatusList: Array.isArray(storedFilters.ropingStatusList) ? storedFilters.ropingStatusList : this.getAllRopingStatus(),
          climbingTypeList: Array.isArray(storedFilters.climbingTypeList) ? storedFilters.climbingTypeList : this.getAllClimbingTypes()
        }
      }
    }
    this.$emit('input', this.filters)
  },

  methods: {
    onSubmit () {
      this.$emit('input', { ...this.filters }) // Emit fresh copy of changes
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
