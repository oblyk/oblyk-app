<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.guideBookWeb.name')"
    />

    <v-text-field
      outlined
      v-model="data.url"
      required
      :label="$t('models.guideBookWeb.url')"
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
import GuideBookWebApi from '@/services/oblyk-api/GuideBookWebApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GuideBookWebForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    guideBookWeb: {
      type: Object,
      required: false
    },
    cragId: [String, Number]
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.guideBookWeb || {}).id,
        crag_id: (this.guideBookWeb || {}).crag_id || this.cragId,
        name: (this.guideBookWeb || {}).name,
        url: (this.guideBookWeb || {}).url
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
      const promise = (this.isEditingForm()) ? GuideBookWebApi.update(this.data) : GuideBookWebApi.create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'guideBookWeb')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
