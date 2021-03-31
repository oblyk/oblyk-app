<template>
  <div>
    <v-form @submit.prevent="submit()">

      <!-- Ascent status -->
      <ascent-status-input v-model="data.ascent_status" />

      <!-- Roping mode (lead, etc.) -->
      <roping-status-input
        v-if="ropable()"
        v-model="data.roping_status"
      />

      <!-- Released at -->
      <date-picker-input
        v-model="data.released_at"
        icon="mdi-calendar"
        :label="$t('models.ascentCragRoute.released_at')"
      />

      <!-- Number of attempt -->
      <v-text-field
        outlined
        prepend-inner-icon="mdi-redo-variant"
        v-model="data.attempt"
        type="number"
        :label="$t('models.ascentCragRoute.attempt')"
      />

      <!-- Sections choice -->
      <div
        v-if="cragRoute.sections.length > 1"
        class="mb-7"
      >
        <p class="subtitle-2">
          {{ $t('components.ascentCragRoute.pitchMade') }} :
        </p>
        <div
          v-for="(section, index) in cragRoute.sections"
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

      <p class="subtitle-2">
        {{ $t('components.ascentCragRoute.myOpinion', { name: cragRoute.name }) }}
      </p>

      <!-- Note -->
      <note-input v-model="data.note" />

      <!-- Hardness status -->
      <hardness-status-input
        v-if="cragRoute.sections.length === 1"
        v-model="data.hardness_status"
        :label="$t('models.ascentCragRoute.hardness_status')"
      />

      <!-- Comment -->
      <markdown-input
        v-model="data.comment"
        :label="$t('models.ascentCragRoute.comment')"
      />

      <!-- Private comment -->
      <v-checkbox
        v-model="data.private_comment"
        :label="$t('models.ascentCragRoute.private_comment')"
      />

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import AscentCragRouteApi from '@/services/oblyk-api/AscentCragRouteApi'
import CloseForm from '@/components/forms/CloseForm'
import RopingStatusInput from '@/components/forms/RopingStatusInput'
import AscentStatusInput from '@/components/forms/AscentStatusInput'
import DatePickerInput from '@/components/forms/DatePickerInput'
import NoteInput from '@/components/forms/NoteInput'
import { DateHelpers } from '@/mixins/DateHelpers'
import CragRoute from '@/models/CragRoute'
import store from '@/store'
import MarkdownInput from '@/components/forms/MarkdownInput'
import HardnessStatusInput from '@/components/forms/HardnessStatusInput'

export default {
  name: 'AscentCragRouteForm',
  components: { HardnessStatusInput, MarkdownInput, NoteInput, DatePickerInput, AscentStatusInput, RopingStatusInput, CloseForm, SubmitForm },
  mixins: [
    FormHelpers,
    DateHelpers
  ],
  props: {
    cragRoute: Object,
    ascentCragRoute: {
      type: Object,
      required: false
    },
    callback: Function
  },

  data () {
    return {
      data: {
        id: (this.ascentCragRoute || {}).id,
        ascent_status: (this.ascentCragRoute || {}).ascent_status,
        roping_status: (this.ascentCragRoute || {}).roping_status || 'lead_climb',
        attempt: (this.ascentCragRoute || {}).attempt,
        released_at: (this.ascentCragRoute || {}).released_at || this.today().format('YYYY-MM-DD'),
        note: (this.ascentCragRoute || {}).note,
        hardness_status: (this.ascentCragRoute || {}).hardness_status,
        comment: (this.ascentCragRoute || {}).comment,
        private_comment: (this.ascentCragRoute || {}).private_comment || false,
        selected_sections: (this.ascentCragRoute || {}).sections_done || this.cragRoute.sections.map((section, index) => index),
        crag_route_id: (this.ascentCragRoute || {}).crag_route_id || this.cragRoute.id
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? AscentCragRouteApi.update(this.data) : AscentCragRouteApi.create(this.data)

      promise
        .then(resp => {
          store.dispatch('auth/updateAscentCragRoutes', {
            ascent_crag_routes: resp.data
          })
          if (this.callback) {
            this.callback()
          } else {
            this.$router.push(this.cragRoute.path())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
        })
        .then(() => {
          this.submitOverlay = false
        })
    },

    ropable: function () {
      return new CragRoute().isRopable(this.cragRoute.climbing_type)
    }
  }
}
</script>
