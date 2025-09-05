<template>
  <v-form @submit.prevent="submit()">
    <!-- Ascent status -->
    <ascent-status-input
      v-model="data.ascent_status"
      :with-sent="isEditingForm()"
      :with-repetition="repetition"
    />

    <!-- Roping status -->
    <roping-status-input
      v-if="gymRoute.climbing_type === 'sport_climbing'"
      v-model="data.roping_status"
      :multi-pith-roping-statuses="false"
    />

    <!-- Released at -->
    <date-picker-input
      v-model="data.released_at"
      :required="true"
      :icon="mdiCalendar"
      :label="$t('models.ascentGymRoute.released_at')"
    />

    <!-- Real favorite -->
    <div class="border --current-color-border rounded mb-7 px-3 py-1">
      <like-btn
        ref="btnLike"
        class="vertical-align-sub"
        :likeable-id="gymRoute.id"
        likeable-type="GymRoute"
        :small="false"
        @click.stop=""
      />
      <strong
        class="hoverable"
        @click="$refs.btnLike.likeOrUnlike()"
      >
        {{ $t('components.like.isRealFavorite') }}
        {{ iLikeIt ? '!' : '?' }}
      </strong>
    </div>

    <!-- Hardness status -->
    <hardness-status-input
      v-if="gymRoute.sections.length === 1"
      v-model="data.hardness_status"
    />

    <v-textarea
      v-if="data.ascent_comment"
      v-model="data.ascent_comment.body"
      outlined
      hide-details
      :label="$t('models.ascentGymRoute.comment')"
    />

    <v-checkbox
      v-model="privateComment"
      :label="$t('actions.addPrivateComment')"
    />

    <v-textarea
      v-if="privateComment"
      v-model="data.comment"
      outlined
      hide-details
      :label="$t('models.ascentGymRoute.private_comment')"
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

    <required-explained class="mt-2" />

    <submit-form
      :overlay="submitOverlay"
      :go-back-btn="false"
      :submit-local-key="isEditingForm() ? 'actions.edit' : 'actions.add'"
    />
  </v-form>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { DateHelpers } from '@/mixins/DateHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentStatusInput from '@/components/forms/AscentStatusInput'
import DatePickerInput from '@/components/forms/DatePickerInput'
import LikeBtn from '~/components/forms/LikeBtn'
import HardnessStatusInput from '~/components/forms/HardnessStatusInput'
import RequiredExplained from '~/components/forms/RequiredExplained'
import RopingStatusInput from '~/components/forms/RopingStatusInput'

export default {
  name: 'AscentGymRouteForm',
  components: {
    RopingStatusInput,
    RequiredExplained,
    HardnessStatusInput,
    LikeBtn,
    DatePickerInput,
    AscentStatusInput,
    SubmitForm
  },
  mixins: [
    FormHelpers,
    DateHelpers
  ],
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    ascentGymRoute: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    },
    defaultAscentStatus: {
      type: String,
      default: 'red_point'
    },
    repetition: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      privateComment: this.ascentGymRoute && this.ascentGymRoute.comment,
      data: {
        id: this.ascentGymRoute?.id,
        ascent_status: this.ascentGymRoute?.ascent_status || this.defaultAscentStatus,
        roping_status: this.ascentGymRoute?.roping_status || localStorage.getItem('defaultAscentGymRouteRopingStatus') || 'lead_climb',
        hardness_status: this.ascentGymRoute?.hardness_status,
        released_at: this.ascentGymRoute?.released_at || this.ISODateToday(),
        selected_sections: this.ascentGymRoute?.sections_done || this.gymRoute.sections.map((section, index) => index),
        gym_route_id: this.ascentGymRoute?.gym_route_id || this.gymRoute.id,
        note: this.ascentGymRoute?.note,
        comment: this.ascentGymRoute?.comment,
        ascent_comment: this.ascentGymRoute?.ascent_comment || { body: null }
      },

      mdiCalendar
    }
  },

  computed: {
    iLikeIt () {
      return this.$store.getters['likes/storedLikes'].GymRoute?.includes(this.gymRoute.id)
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new AscentGymRouteApi(this.$axios, this.$auth).update(this.data) : new AscentGymRouteApi(this.$axios, this.$auth).create(this.data)
      this.$localforage.gymRoutes.removeItem(this.data.gym_route_id)
      promise
        .then(() => {
          localStorage.setItem('defaultAscentGymRouteRopingStatus', this.data.roping_status)
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
