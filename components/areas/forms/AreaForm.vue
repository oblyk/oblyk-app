<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.area.name')"
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
import AreaApi from '~/services/oblyk-api/AreaApi'
import CloseForm from '@/components/forms/CloseForm'
import Area from '@/models/Area'

export default {
  name: 'AreaForm',
  components: { CloseForm, SubmitForm },
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
        id: (this.area || {}).id,
        name: (this.area || {}).name
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new AreaApi(this.$axios, this.$auth).update(this.data) : new AreaApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const area = new Area({ attributes: resp.data })
          this.$router.push(area.path)
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
