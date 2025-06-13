<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      class="required-field"
      :label="$t('models.contestTeam.name')"
    />

    <submit-form
      :go-back-btn="false"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '~/mixins/FormHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import ContestTeamApi from '~/services/oblyk-api/ContestTeamApi'

export default {
  name: 'ContestTeamForm',
  components: { SubmitForm },
  mixins: [FormHelpers, DateHelpers],

  props: {
    contest: {
      type: Object,
      required: true
    },
    contestTeam: {
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
      subscribing: false,
      data: {
        id: this.contestTeam?.id,
        name: this.contestTeam?.name,
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      }
    }
  },

  watch: {
    contestTeam () {
      this.data = {
        id: this.contestTeam?.id,
        name: this.contestTeam?.name,
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestTeamApi(this.$axios, this.$auth).update(this.data) : new ContestTeamApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          this.callback(resp.data)
          this.data = {
            id: null,
            name: null
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestParticipant')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
