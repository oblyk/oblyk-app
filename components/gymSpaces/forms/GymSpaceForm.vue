<template>
  <div>
    <spinner v-if="loadingGymGrades" :full-height="false" />

    <v-form
      v-if="!loadingGymGrades"
      @submit.prevent="submit()"
    >
      <v-text-field
        v-model="data.name"
        outlined
        :label="$t('models.gymSpace.name')"
        required
      />

      <v-text-field
        v-model="data.order"
        outlined
        type="number"
        :label="$t('models.gymSpace.order')"
      />

      <markdown-input
        v-model="data.description"
        :label="$t('models.gymSpace.description')"
      />

      <v-select
        v-model="data.climbing_type"
        :items="climbingGymList"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSpace.climbing_type')"
        outlined
      />

      <v-select
        v-model="data.gym_grade_id"
        :items="gymGrades"
        item-text="text"
        item-value="value"
        :label="$t('models.gymSpace.gym_grade_id')"
        outlined
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
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '@/models/GymSpace'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'GymSpaceForm',
  components: { MarkdownInput, Spinner, SubmitForm, CloseForm },
  mixins: [FormHelpers],
  props: {
    gymId: {
      type: [String, Number],
      default: null
    },
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingGymGrades: true,
      redirectTo: null,
      data: {
        id: this.gymSpace?.id,
        name: this.gymSpace?.name,
        order: this.gymSpace?.order,
        description: this.gymSpace?.description,
        climbing_type: this.gymSpace?.climbing_type,
        gym_grade_id: this.gymSpace?.gym_grade_id,
        gym_id: this.gymSpace?.gym_id || this.gymId
      },
      climbingGymList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.fun_climbing'), value: 'fun_climbing' },
        { text: this.$t('models.climbs.training_space'), value: 'training_space' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ],
      gymGrades: []
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
    this.getGymGrades()
  },

  methods: {
    submit () {
      this.overlay = true
      const promise = (this.isEditingForm()) ? new GymSpaceApi(this.$axios, this.$auth).update(this.data) : new GymSpaceApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gymSpace = new GymSpace({ attributes: resp.data })
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else {
            this.$router.push(gymSpace.path)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).then(() => {
          this.overlay = false
        })
    },

    getGymGrades () {
      new GymGradeApi(this.$axios, this.$auth)
        .all(this.gymId)
        .then((resp) => {
          for (const grade of resp.data) {
            this.gymGrades.push({ text: grade.name, value: grade.id })
          }
        }).finally(() => {
          this.loadingGymGrades = false
        })
    }
  }
}
</script>
