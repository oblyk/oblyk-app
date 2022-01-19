<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.url"
      outlined
      required
      :label="$t('models.video.url')"
    />

    <v-textarea
      v-model="data.description"
      outlined
      required
      :label="$t('models.video.description')"
    />

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
import VideoApi from '~/services/oblyk-api/VideoApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'VideoForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    video: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.video || {}).id,
        url: (this.video || {}).url,
        description: (this.video || {}).description,
        viewable_type: (this.video || {}).viewable_type || this.$route.params.viewableType,
        viewable_id: (this.video || {}).viewable_id || this.$route.params.viewableId
      }
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new VideoApi(this.$axios, this.$auth).update(this.data) : new VideoApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'video')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
