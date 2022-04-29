<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.link.name')"
    />

    <v-text-field
      v-model="data.url"
      outlined
      required
      :label="$t('models.link.url')"
    />

    <v-textarea
      v-model="data.description"
      outlined
      required
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
import LinkApi from '~/services/oblyk-api/LinkApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'LinkForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    link: {
      type: Object,
      default: null
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

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new LinkApi(this.$axios, this.$auth).update(this.data) : new LinkApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'link')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
