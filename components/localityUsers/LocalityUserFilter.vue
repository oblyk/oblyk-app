<template>
  <v-sheet
    rounded
    :elevation="elevation"
    class="pa-2 mb-4"
    :class="bgColor"
    style="position: relative"
  >
    <small
      class="d-inline-block font-weight-bold grey--text text--darken-1 px-3"
      :class="bgColor"
      style="position: absolute; top: -15px; left: 0; border-radius: 9px 9px 0 0; padding-top: 3px; padding-bottom: 4px;"
    >
      {{ $t('common.filters') }}
    </small>
    <v-row>
      <v-col>
        <grade-select-input
          v-model="filters.level"
          translate-key="common.level"
          hide-details
          dense
        />
      </v-col>
      <v-col>
        <climbing-type-input
          v-model="filters.climbingType"
          :chips="false"
          :multiple="false"
          environment="user"
          dense
          hide-details
          clearable
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mdiClose } from '@mdi/js'
import GradeSelectInput from '~/components/forms/GradeSelectInput.vue'
import ClimbingTypeInput from '~/components/forms/ClimbingTypeInput.vue'

export default {
  name: 'LocalityUserFilter',
  components: {
    ClimbingTypeInput,
    GradeSelectInput
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    bgColor: {
      type: String,
      default: null
    },
    elevation: {
      type: Number,
      default: 3
    }
  },

  data () {
    return {
      filters: this.value,

      mdiClose
    }
  }
}
</script>
