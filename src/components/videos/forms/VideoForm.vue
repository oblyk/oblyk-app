<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.url"
      required
      :label="$t('models.video.url')"
    />

    <v-textarea
      outlined
      required
      v-model="data.description"
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
import VideoApi from '@/services/oblyk-api/VideoApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'VideoForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    video: {
      type: Object,
      required: false
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

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? VideoApi.update(this.data) : VideoApi.create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'video')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
