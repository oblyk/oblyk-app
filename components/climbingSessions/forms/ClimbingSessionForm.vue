<template>
  <v-form @submit.prevent="submit()">
    <markdown-input
      v-model="data.description"
      :label="$t('models.comment.body')"
    />
    <submit-form
      :overlay="submitOverlay"
      submit-local-key="actions.comment"
      :go-back-btn="false"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import MarkdownInput from '@/components/forms/MarkdownInput'
import ClimbingSessionApi from '~/services/oblyk-api/ClimbingSessionApi'

export default {
  name: 'ClimbingSessionForm',
  components: { MarkdownInput, SubmitForm },
  mixins: [FormHelpers],
  props: {
    climbingSession: {
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
      redirectTo: null,
      data: {
        session_date: this.climbingSession?.session_date,
        description: this.climbingSession?.description
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ClimbingSessionApi(this.$axios, this.$auth).update(this.data) : new ClimbingSessionApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          if (this.callback) {
            this.callback()
          } else {
            this.$router.push(this.redirectTo)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'climbingSession')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
