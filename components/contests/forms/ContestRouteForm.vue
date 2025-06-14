<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      ref="routeNumber"
      v-model="data.number"
      outlined
      required
      type="number"
      class="required-field"
      :label="$t('models.contestRoute.number')"
    />

    <v-text-field
      ref="routeName"
      v-model="data.name"
      outlined
      required
      persistent-hint
      hint="Nom : Permet d'ajouter un nom ou une petite description (optionnel)"
      :label="$t('models.contestRoute.name')"
    />

    <v-text-field
      v-if="showHighestHold"
      ref="numberOfHolds"
      v-model="data.number_of_holds"
      outlined
      required
      hide-details
      type="number"
      class="required-field mt-5"
      :label="$t('models.contestRoute.number_of_holds')"
    />

    <v-text-field
      v-if="showFixedPoints"
      ref="fixedPoints"
      v-model="data.fixed_points"
      outlined
      required
      hide-details
      type="number"
      class="required-field mt-5"
      :label="$t('models.contestRoute.fixed_points')"
    />

    <div
      v-if="contestRoute.ranking_type === 'fixed_points' && contestRoute.gym_route && contestRoute.gym_route.grade_gap.min_grade_value"
      class="mt-1"
    >
      <v-icon color="amber">
        {{ mdiShimmer }}
      </v-icon>
      Suggestion :
      <v-chip
        outlined
        @click="data.fixed_points = suggestPoint(contestRoute.gym_route)"
      >
        {{ suggestPoint(contestRoute.gym_route) }} points
      </v-chip>
    </div>

    <v-checkbox
      v-if="contestRoute.ranking_type === 'division_and_zone'"
      v-model="data.additional_zone"
      :label="$t('models.contestRoute.additional_zone')"
    />

    <submit-form
      class="mt-4"
      :go-back-btn="false"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiShimmer } from '@mdi/js'
import SubmitForm from '~/components/forms/SubmitForm'
import { FormHelpers } from '~/mixins/FormHelpers'
import ContestRouteApi from '~/services/oblyk-api/ContestRouteApi'
import ContestRoute from '~/models/ContestRoute'

export default {
  name: 'ContestRouteForm',
  components: {
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    contest: {
      type: Object,
      required: true
    },
    contestRoute: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.contestRoute?.id,
        number: this.contestRoute?.number,
        name: this.contestRoute?.name,
        number_of_holds: this.contestRoute?.number_of_holds,
        fixed_points: this.contestRoute?.fixed_points,
        additional_zone: this.contestRoute?.additional_zone,
        gym_id: this.gym.id,
        contest_id: this.contest.id
      },

      mdiShimmer
    }
  },

  computed: {
    showFixedPoints () {
      return ['fixed_points', 'point_relative_to_highest_hold'].includes(this.contestRoute.ranking_type)
    },

    showHighestHold () {
      return ['highest_hold', 'point_relative_to_highest_hold'].includes(this.contestRoute.ranking_type)
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestRouteApi(this.$axios, this.$auth).update(this.data) : new ContestRouteApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const contestRoute = new ContestRoute({ attributes: resp.data })
          if (this.callback) {
            this.callback(contestRoute)
          } else {
            this.$router.push(contestRoute.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ContestCategory')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    suggestPoint (gymRoute) {
      return Math.round(2000 * Math.pow(0.85, (49 - gymRoute.grade_gap.min_grade_value)))
    },

    giveFocus (input) {
      this.$refs[input].focus()
    }
  }
}
</script>
