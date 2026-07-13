<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.area.name')"
    />

    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
      :go-back-btn="false"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'AreaForm',
  components: { SubmitForm },
  mixins: [FormHelpers],
  props: {
    area: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.area?.id,
        name: this.area?.name
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = this.isEditingForm()
        ? new OblykApi(this.$axios, this.$auth).put(`/public/areas/${this.data.id}`, { area: this.data })
        : new OblykApi(this.$axios, this.$auth).post('/public/areas', { area: this.data })

      promise
        .then((resp) => {
          this.$router.push(resp.data.app_path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'area')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
