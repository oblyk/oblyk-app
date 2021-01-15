<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.link.name')"
    />

    <v-text-field
      outlined
      v-model="data.url"
      required
      :label="$t('models.link.url')"
    />

    <v-textarea
      outlined
      required
      v-model="data.description"
      :label="$t('models.link.description')"
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
import LinkApi from '@/services/oblyk-api/LinkApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'LinkForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    link: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.link || {}).id,
        name: (this.link || {}).name,
        url: (this.link || {}).url,
        description: (this.link || {}).description,
        linkable_type: (this.link || {}).linkable_type || this.$route.params.linkableType,
        linkable_id: (this.link || {}).linkable_id || this.$route.params.linkableId
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
      const promise = (this.isEditingForm()) ? LinkApi.update(this.data) : LinkApi.create(this.data)

      promise
        .then((resp) => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'link')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
