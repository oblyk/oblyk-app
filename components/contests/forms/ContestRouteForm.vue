<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.number"
      outlined
      required
      hide-details
      type="number"
      class="required-field"
      :label="$t('models.contestRoute.number')"
    />

    <v-text-field
      v-if="contestRoute.ranking_type === 'highest_hold'"
      v-model="data.number_of_holds"
      outlined
      required
      hide-details
      type="number"
      class="required-field mt-5"
      :label="$t('models.contestRoute.number_of_holds')"
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
        number_of_holds: this.contestRoute?.number_of_holds,
        gym_id: this.gym.id,
        contest_id: this.contest.id
      }
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
    }
  }
}
</script>
