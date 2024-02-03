<template>
  <v-form @submit.prevent="submit()">
    <markdown-input
      v-model="data.description"
      :label="$t('models.gymChain.description')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiAlert } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'
import GymChainApi from '~/services/oblyk-api/GymChainApi'
import GymChain from '~/models/GymChain'

export default {
  name: 'GymChainForm',
  components: {
    MarkdownInput,
    CloseForm,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gymChain: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: (this.gymChain || {}).id,
        slug_name: (this.gymChain || {}).slug_name,
        name: (this.gymChain || {}).name,
        description: (this.gymChain || {}).description
      },

      mdiAlert
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymChainApi(this.$axios, this.$auth).update(this.data) : new GymChainApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gymChain = new GymChain({ attributes: resp.data })
          this.$router.push(gymChain.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
