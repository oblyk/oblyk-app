<template>
  <div>
    <v-form @submit.prevent="submit()">
      <!-- Climbing type -->
      <div
        v-if="ascentGymRoute.Gym.climbableTypes.length > 1"
        class="mt-4 mb-5"
      >
        <p class="mb-1">
          {{ $t('components.logBook.climbingType') }} ?
        </p>
        <v-sheet
          v-for="(climbingStyle, climbingStyleIndex) in ascentGymRoute.Gym.climbableTypes"
          :key="`climbing-style-index-${climbingStyleIndex}`"
          class="pa-2 rounded-sm activable-v-sheet d-inline-block mr-2"
          :class="data.climbing_type === climbingStyle ? '--active' : '--inactive'"
          @click="data.climbing_type = climbingStyle"
        >
          {{ $t(`models.climbs.${climbingStyle}`) }}
        </v-sheet>
      </div>

      <!-- Color in system (if color system) -->
      <div
        v-if="data.color_system_line_id != null"
        class="mb-7"
      >
        <p class="mb-1">
          {{ $t('models.ascentGymRoute.level') }}
        </p>
        <color-system-line-input
          v-model="data.color_system_line_id"
          :colors-system="ascentGymRoute.color_system"
        />
      </div>

      <!-- Grade if grade system -->
      <v-text-field
        v-if="!data.color_system_line_id"
        v-model="data.sections[0].grade"
        outlined
        type="text"
        :label="$t('models.ascentGymRoute.grade')"
      />

      <!-- Quantity -->
      <v-text-field
        v-model="data.quantity"
        outlined
        type="text"
        :label="$t('models.ascentGymRoute.quantity')"
      />

      <!-- Ascent status -->
      <ascent-status-input v-model="data.ascent_status" />

      <!-- Released at -->
      <date-picker-input
        v-model="data.released_at"
        :icon="mdiCalendar"
        :label="$t('models.ascentGymRoute.released_at')"
      />

      <!-- Height -->
      <v-text-field
        v-model="data.height"
        outlined
        type="number"
        :label="$t('models.cragRoute.height')"
      />

      <submit-form
        :overlay="submitOverlay"
        :go-back-btn="true"
        :go-back-callback="cancelCallback"
        submit-local-key="actions.edit"
      />
    </v-form>
  </div>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { DateHelpers } from '@/mixins/DateHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentStatusInput from '@/components/forms/AscentStatusInput'
import DatePickerInput from '@/components/forms/DatePickerInput'
import ColorSystemLineInput from '~/components/forms/ColorSystemLineInput.vue'

export default {
  name: 'AscentGymEditForm',
  components: { ColorSystemLineInput, DatePickerInput, AscentStatusInput, SubmitForm },
  mixins: [
    FormHelpers,
    DateHelpers
  ],
  props: {
    ascentGymRoute: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    },
    cancelCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.ascentGymRoute?.id,
        ascent_status: this.ascentGymRoute?.ascent_status,
        released_at: this.ascentGymRoute?.released_at || this.today().format('YYYY-MM-DD'),
        color_system_line_id: this.ascentGymRoute?.color_system_line?.id,
        sections: this.ascentGymRoute?.sections,
        quantity: this.ascentGymRoute?.quantity,
        climbing_type: this.ascentGymRoute?.climbing_type,
        height: this.ascentGymRoute?.height
      },

      mdiCalendar
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true

      new AscentGymRouteApi(this.$axios, this.$auth)
        .update(this.data)
        .then(() => {
          this.$auth.fetchUser().then(() => {
            if (this.callback) {
              this.callback()
            } else {
              this.$router.push(this.gymRoute.path)
            }
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ascentGymRoute')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
