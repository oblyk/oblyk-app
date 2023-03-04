<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      :label="$t('models.gymGrade.name')"
    />

    <p class="subtitle-2 mt-1">
      {{ $t('components.gymGrade.whichIdentificationSystem') }}
    </p>

    <v-checkbox
      v-model="data.tag_color"
      hide-details
    >
      <template #label>
        <span v-html="$t('models.gymGrade.tag_color')" />
      </template>
    </v-checkbox>

    <v-checkbox v-model="data.hold_color">
      <template #label>
        <span v-html="$t('models.gymGrade.hold_color')" />
      </template>
    </v-checkbox>

    <p class="subtitle-2 mt-3">
      {{ $t('components.gymGrade.whichGradeSystem') }}
    </p>

    <v-checkbox
      v-model="data.difficulty_by_grade"
      hide-details
    >
      <template #label>
        <span v-html="$t('models.gymGrade.difficulty_by_grade')" />
      </template>
    </v-checkbox>

    <v-checkbox v-model="data.difficulty_by_level">
      <template #label>
        <span v-html="$t('models.gymGrade.difficulty_by_level')" />
      </template>
    </v-checkbox>

    <p class="subtitle-2 mt-3">
      {{ $t('components.gymGrade.whichPointSystem') }}
    </p>

    <v-radio-group v-model="data.point_system_type">
      <v-radio value="fix">
        <template #label>
          <span v-html="$t('models.gymGrade.point_system_types.fix')" />
        </template>
      </v-radio>

      <v-radio value="divisible">
        <template #label>
          <span v-html="$t('models.gymGrade.point_system_types.divisible')" />
        </template>
      </v-radio>

      <v-radio value="none">
        <template #label>
          <span v-html="$t('models.gymGrade.point_system_types.none')" />
        </template>
      </v-radio>
    </v-radio-group>

    <p class="subtitle-2 mb-2">
      {{ $t('components.gymGrade.exampleTitle') }}
    </p>

    <v-sheet
      rounded
      class="mb-6"
    >
      <gym-route-list-item :gym-route="fakeRoute" />
    </v-sheet>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymGrade from '@/models/GymGrade'
import CloseForm from '@/components/forms/CloseForm'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem.vue'
import GymRoute from '~/models/GymRoute'

export default {
  name: 'GymGradeForm',
  components: { GymRouteListItem, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    gymId: {
      type: [Number, String],
      default: null
    },
    gymGrade: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.gymGrade?.id,
        name: this.gymGrade?.name,
        gym_id: this.gymId,
        difficulty_by_grade: this.gymGrade?.difficulty_by_grade,
        difficulty_by_level: this.gymGrade?.difficulty_by_level,
        tag_color: this.gymGrade?.tag_color,
        hold_color: this.gymGrade?.hold_color,
        point_system_type: this.gymGrade?.point_system_type
      }
    }
  },

  computed: {
    fakeRoute () {
      const holds = this.data.hold_color ? ['#0055d4'] : null
      const tags = this.data.tag_color ? ['#ab37c8'] : null
      const ascentsCount = this.data.point_system_type === 'divisible' ? 4 : 0
      let pointsToS = ''
      if (this.data.point_system_type === 'divisible') {
        pointsToS = '250pt'
      } else if (this.data.point_system_type === 'fix') {
        pointsToS = '50pt'
      }
      const gradeToS = this.data.difficulty_by_grade ? '6b+' : ''
      return new GymRoute({
        attributes: {
          id: 0,
          name: 'Exemple',
          hold_colors: holds,
          tag_colors: tags,
          note: null,
          ascents_count: ascentsCount,
          points_to_s: pointsToS,
          grade_to_s: gradeToS
        }
      })
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymGradeApi(this.$axios, this.$auth).update(this.data) : new GymGradeApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gymGrade = new GymGrade({ attributes: resp.data })
          this.$router.push(gymGrade.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymGrade')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
