<template>
  <v-input
    :class="required ? 'required-field' : ''"
  >
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-0 px-2">
      <legend class="v-label custom-fieldset-label">
        {{ $t('components.input.ropingStatusQuestion') }}
      </legend>
      <div>
        <v-chip-group
          v-model="ropingStatus"
          active-class="primary--text"
          column
          :multiple="multiple"
          @change="onChange"
        >
          <v-chip
            v-for="(item, itemIndex) in ropingStatuses"
            :key="`item-index-${itemIndex}`"
            :value="item.value"
            outlined
          >
            <v-icon
              :color="ropingStatus === item.value ? 'green' : null"
              small
              left
            >
              {{ item.icon }}
            </v-icon>
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
        {{ ropingStatus.length === ropingStatuses.length ? mdiCheckboxMultipleBlankOutline : mdiCheckboxMultipleMarked }}
      </v-icon>
    </v-btn>
  </v-input>
</template>

<script>
import { mdiCheckboxMultipleBlankOutline, mdiCheckboxMultipleMarked } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'
import {
  oblykRopingStatusLeadClimb,
  oblykRopingStatusLeadClimbMultiPitchAlternateLead,
  oblykRopingStatusMultiPitchLeader,
  oblykRopingStatusMultiPitchSecond,
  oblykRopingStatusTopRope
} from '~/assets/oblyk-icons'

export default {
  name: 'RopingStatusInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    sportClimbingRopingStatuses: {
      type: Boolean,
      default: true
    },
    multiPithRopingStatuses: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: { // required input of the form and display the red * on top of the component
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      ropingStatus: this.value,

      mdiCheckboxMultipleMarked,
      mdiCheckboxMultipleBlankOutline
    }
  },

  computed: {
    ropingStatuses () {
      const statuses = []
      if (this.sportClimbingRopingStatuses) {
        statuses.push({
          text: this.$t('models.ropingStatus.lead_climb'),
          value: 'lead_climb',
          icon: oblykRopingStatusLeadClimb
        })
        statuses.push({
          text: this.$t('models.ropingStatus.top_rope'),
          value: 'top_rope',
          icon: oblykRopingStatusTopRope
        })
      }
      if (this.multiPithRopingStatuses) {
        statuses.push({
          text: this.$t('models.ropingStatus.multi_pitch_leader'),
          value: 'multi_pitch_leader',
          icon: oblykRopingStatusMultiPitchLeader
        })
        statuses.push({
          text: this.$t('models.ropingStatus.multi_pitch_second'),
          value: 'multi_pitch_second',
          icon: oblykRopingStatusMultiPitchSecond
        })
        statuses.push({
          text: this.$t('models.ropingStatus.multi_pitch_alternate_lead'),
          value: 'multi_pitch_alternate_lead',
          icon: oblykRopingStatusLeadClimbMultiPitchAlternateLead
        })
      }
      return statuses
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.ropingStatus)
    },

    switchSelection () {
      if (this.ropingStatus.length === this.ropingStatuses.length) {
        this.ropingStatus = []
      } else {
        this.ropingStatus = this.ropingStatuses.map(roping => roping.value)
      }
      this.onChange()
    }
  }
}
</script>
