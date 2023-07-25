<template>
  <v-form @submit.prevent="submit()">
    <!-- Ascent status -->
    <ascent-status-input v-model="data.ascent_status" />

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
      label-key="components.input.howFindDifficulty"
    />

    <v-textarea
      v-model="data.comment"
      outlined
      hide-details
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

    <required-explained class="mt-2" />

    <close-form />
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
import CloseForm from '@/components/forms/CloseForm'
import AscentStatusInput from '@/components/forms/AscentStatusInput'
import DatePickerInput from '@/components/forms/DatePickerInput'
import LikeBtn from '~/components/forms/LikeBtn.vue'
import HardnessStatusInput from '~/components/forms/HardnessStatusInput.vue'
import RequiredExplained from '~/components/forms/RequiredExplained.vue'

export default {
  name: 'AscentGymRouteForm',
  components: {
    RequiredExplained,
    HardnessStatusInput,
    LikeBtn,
    DatePickerInput,
    AscentStatusInput,
    CloseForm,
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
      default: 'sent'
    }
  },

  data () {
    return {
      mdiCalendar,
      data: {
        id: this.ascentGymRoute?.id,
        ascent_status: this.ascentGymRoute?.ascent_status || this.defaultAscentStatus,
        hardness_status: this.ascentGymRoute?.hardness_status,
        released_at: this.ascentGymRoute?.released_at || this.today().format('YYYY-MM-DD'),
        selected_sections: this.ascentGymRoute?.sections_done || this.gymRoute.sections.map((section, index) => index),
        gym_route_id: this.ascentGymRoute?.gym_route_id || this.gymRoute.id,
        note: this.ascentGymRoute?.note,
        comment: this.ascentGymRoute?.comment
      }
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
