<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.guideBookWeb.name')"
    />

    <v-text-field
      v-model="data.url"
      outlined
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
import GuideBookWebApi from '~/services/oblyk-api/GuideBookWebApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GuideBookWebForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    guideBookWeb: {
      type: Object,
      default: null
    },
    cragId: {
      type: [String, Number],
      default: null
    }
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

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GuideBookWebApi(this.$axios, this.$auth).update(this.data) : new GuideBookWebApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guideBookWeb')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
