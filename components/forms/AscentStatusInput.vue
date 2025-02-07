<template>
  <div>
    <v-input
      :class="required ? 'required-field' : ''"
      hide-details
    >
      <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-0 px-2">
        <legend class="v-label custom-fieldset-label">
          {{ $t('components.input.ascentStatus') }}
        </legend>
        <div>
          <v-chip-group
            v-model="ascentStatus"
            active-class="primary--text"
            column
            :multiple="multiple"
            @change="onChange"
          >
            <v-chip
              v-for="(item, itemIndex) in ascentStatuses"
              :key="`item-index-${itemIndex}`"
              :value="item.value"
              outlined
            >
              <v-icon
                :color="ascentStatus === item.value ? 'green' : null"
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
          {{ ascentStatus.length === ascentStatuses.length ? mdiCheckboxMultipleMarked : mdiCheckboxMultipleBlankOutline }}
        </v-icon>
      </v-btn>
    </v-input>

    <div class="mb-3">
      <div class="text-right pr-1">
        <span
          class="hoverable"
          @click="showLegend = !showLegend"
        >
          {{ $t('common.whatIsIt') }}
        </span>
      </div>
      <v-scroll-y-transition>
        <div
          v-if="showLegend"
          class="pb-4"
        >
          <p>
            <strong>{{ $t('models.ascentStatus.red_point') }} :</strong>
            {{ $t('models.ascentStatusExplain.red_point') }}
          </p>
          <p>
            <strong>{{ $t('models.ascentStatus.flash') }} :</strong>
            {{ $t('models.ascentStatusExplain.flash') }}
          </p>
          <p>
            <strong>{{ $t('models.ascentStatus.onsight') }} :</strong>
            {{ $t('models.ascentStatusExplain.onsight') }}
          </p>
          <p>
            <strong>{{ $t('models.ascentStatus.project') }} :</strong>
            {{ $t('models.ascentStatusExplain.project') }}
          </p>
          <p>
            <strong>{{ $t('models.ascentStatus.repetition') }} :</strong>
            {{ $t('models.ascentStatusExplain.repetition') }}
          </p>
          <p class="text-center">
            <v-btn
              text
              small
              @click="showLegend = !showLegend"
            >
              <v-icon left>
                {{ mdiChevronUp }}
              </v-icon>
              {{ $t('actions.hide') }}
              <v-icon right>
                {{ mdiChevronUp }}
              </v-icon>
            </v-btn>
          </p>
        </div>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<script>
import {
  mdiCropSquare,
  mdiCheckboxMarkedCircle,
  mdiRecordCircle,
  mdiFlash,
  mdiEye,
  mdiAutorenew,
  mdiChevronUp,
  mdiCheckboxMultipleMarked,
  mdiCheckboxMultipleBlankOutline
} from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'AscentStatusInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: [String, Array], // array if multipleChoices true
      default: null
    },
    withProject: {
      type: Boolean,
      default: true
    },
    withSent: {
      type: Boolean,
      default: true
    },
    withRepetition: {
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
      ascentStatus: this.value, // string or array according to multipleChoices false or true
      showLegend: false,

      mdiChevronUp,
      mdiCheckboxMultipleMarked,
      mdiCheckboxMultipleBlankOutline
    }
  },

  computed: {
    ascentStatuses () {
      const statuses = []
      if (this.withSent) {
        statuses.push({ text: this.$t('models.ascentStatus.sent'), value: 'sent', icon: mdiCheckboxMarkedCircle })
      }
      statuses.push({ text: this.$t('models.ascentStatus.red_point'), value: 'red_point', icon: mdiRecordCircle })
      statuses.push({ text: this.$t('models.ascentStatus.flash'), value: 'flash', icon: mdiFlash })
      statuses.push({ text: this.$t('models.ascentStatus.onsight'), value: 'onsight', icon: mdiEye })
      if (this.withRepetition) {
        statuses.push({ text: this.$t('models.ascentStatus.repetition'), value: 'repetition', icon: mdiAutorenew })
      }
      if (this.withProject) {
        statuses.push({ text: this.$t('models.ascentStatus.project'), value: 'project', icon: mdiCropSquare })
      }
      return statuses
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.ascentStatus)
    },

    switchSelection () {
      if (this.ascentStatus.length === this.ascentStatuses.length) {
        this.ascentStatus = []
      } else {
        this.ascentStatus = this.ascentStatuses.map(status => status.value)
      }
      this.onChange()
    }
  }
}
</script>
