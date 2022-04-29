<template>
  <v-select
    v-model="climbingTypes"
    :items="climbByEnvironment()"
    item-text="text"
    item-value="value"
    chips
    :label="$t('components.input.climbing_type')"
    multiple
    outlined
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'ClimbingTypeInput',
  props: {
    value: Array,
    environment: String
  },

  data () {
    return {
      climbingCragList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.multi_pitch'), value: 'multi_pitch' },
        { text: this.$t('models.climbs.trad_climbing'), value: 'trad_climbing' },
        { text: this.$t('models.climbs.aid_climbing'), value: 'aid_climbing' },
        { text: this.$t('models.climbs.deep_water'), value: 'deep_water' },
        { text: this.$t('models.climbs.via_ferrata'), value: 'via_ferrata' }
      ],
      climbingUserList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.multi_pitch'), value: 'multi_pitch' },
        { text: this.$t('models.climbs.trad_climbing'), value: 'trad_climbing' },
        { text: this.$t('models.climbs.aid_climbing'), value: 'aid_climbing' },
        { text: this.$t('models.climbs.deep_water'), value: 'deep_water' },
        { text: this.$t('models.climbs.via_ferrata'), value: 'via_ferrata' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ],
      climbingGymList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.fun_climbing'), value: 'fun_climbing' },
        { text: this.$t('models.climbs.training_space'), value: 'training_space' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ],
      climbingTypes: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.climbingTypes)
    },

    climbByEnvironment () {
      if (this.environment === 'gym') {
        return this.climbingGymList
      } else if (this.environment === 'crag') {
        return this.climbingCragList
      } else if (this.environment === 'user') {
        return this.climbingUserList
      }
    }
  }
}
</script>
