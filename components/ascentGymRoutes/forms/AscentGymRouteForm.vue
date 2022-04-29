<template>
  <div>
    <v-form @submit.prevent="submit()">
      <!-- Ascent status -->
      <ascent-status-input v-model="data.ascent_status" />

      <!-- Released at -->
      <date-picker-input
        v-model="data.released_at"
        :icon="mdiCalendar"
        :label="$t('models.ascentGymRoute.released_at')"
      />

      <note-input
        v-model="data.note"
      />

      <v-textarea
        v-model="data.comment"
        outlined
        :label="$t('models.ascentGymRoute.comment')"
      />

      <!-- Sections choice -->
      <div
        v-if="gymRoute && gymRoute.sections.length > 1"
        class="mb-7"
      >
        <p class="subtitle-2">
          {{ $t('components.ascentGymRoute.pitchMade') }} :
        </p>
        <div
          v-for="(section, index) in gymRoute.sections"
          :key="`section-${index}`"
        >
          <v-checkbox
            v-model="data.selected_sections"
            :label="`L.${index + 1} - ${section.grade}`"
            :value="index"
            hide-details
          />
        </div>
      </div>

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :go-back-btn="false"
        :submit-local-key="submitText()"
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
import CloseForm from '@/components/forms/CloseForm'
import AscentStatusInput from '@/components/forms/AscentStatusInput'
import DatePickerInput from '@/components/forms/DatePickerInput'
import NoteInput from '@/components/forms/NoteInput'

export default {
  name: 'AscentGymRouteForm',
  components: { NoteInput, DatePickerInput, AscentStatusInput, CloseForm, SubmitForm },
  mixins: [
    FormHelpers,
    DateHelpers
  ],
  props: {
    gymRoute: Object,
    ascentGymRoute: {
      type: Object,
      required: false
    },
    callback: Function,
    defaultAscentStatus: {
      type: String,
      default: 'sent'
    }
  },

  data () {
    return {
      mdiCalendar,
      data: {
        id: (this.ascentGymRoute || {}).id,
        ascent_status: (this.ascentGymRoute || {}).ascent_status || this.defaultAscentStatus,
        released_at: (this.ascentGymRoute || {}).released_at || this.today().format('YYYY-MM-DD'),
        selected_sections: (this.ascentGymRoute || {}).sections_done || this.gymRoute.sections.map((section, index) => index),
        gym_route_id: (this.ascentGymRoute || {}).gym_route_id || this.gymRoute.id,
        note: (this.ascentGymRoute || {}).note,
        comment: (this.ascentGymRoute || {}).comment
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new AscentGymRouteApi(this.$axios, this.$auth).update(this.data) : new AscentGymRouteApi(this.$axios, this.$auth).create(this.data)

      promise
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
