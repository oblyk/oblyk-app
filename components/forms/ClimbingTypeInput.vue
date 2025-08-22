<template>
  <v-select
    v-if="inputType === 'select'"
    v-model="climbingTypes"
    :items="climbByEnvironment()"
    item-text="text"
    item-value="value"
    :chips="chips"
    :dense="dense"
    :hide-details="hideDetails"
    :label="$t('components.input.climbing_type')"
    :multiple="multiple"
    :clearable="clearable"
    outlined
    @change="onChange"
  />
  <v-input v-else-if="inputType === 'chips'">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-0 px-2">
      <legend class="v-label custom-fieldset-label">
        {{ $t('components.input.climbing_type') }}
      </legend>
      <div>
        <v-chip-group
          v-model="climbingTypes"
          active-class="primary--text"
          column
          :multiple="multiple"
          @change="onChange"
        >
          <v-chip
            v-for="(item, itemIndex) in climbByEnvironment()"
            :key="`item-index-${itemIndex}`"
            :value="item.value"
            outlined
          >
            <climbing-style-icon
              :climbing-style="item.value"
              small
              left
            />
            {{ item.text }}
          </v-chip>
        </v-chip-group>
      </div>
    </fieldset>
    <v-btn
      v-if="multiple"
      icon
      large
      @click="switchSelection()"
    >
      <v-icon>
        {{ climbingTypes.length === climbByEnvironment().length ? mdiCheckboxMultipleMarked : mdiCheckboxMultipleBlankOutline }}
      </v-icon>
    </v-btn>
  </v-input>
</template>

<script>
import { mdiCheckboxMultipleBlankOutline, mdiCheckboxMultipleMarked } from '@mdi/js'
import ClimbingStyleIcon from '~/components/crags/ClimbingStyleIcon.vue'
export default {
  name: 'ClimbingTypeInput',
  components: { ClimbingStyleIcon },
  props: {
    value: {
      type: [Array, String],
      default: null
    },
    environment: {
      type: String,
      default: 'crag'
    },
    chips: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    inputType: { // possible values: 'select', 'chips'
      type: String,
      default: 'select'
    }
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
      climbingTypes: this.value,

      mdiCheckboxMultipleMarked,
      mdiCheckboxMultipleBlankOutline
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
    },

    switchSelection () {
      if (this.climbingTypes.length === this.climbByEnvironment().length) {
        this.climbingTypes = []
      } else {
        this.climbingTypes = this.climbByEnvironment().map(climb => climb.value)
      }
      this.onChange()
    }
  }
}
</script>
