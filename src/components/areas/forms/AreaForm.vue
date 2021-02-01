<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
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
import AreaApi from '@/services/oblyk-api/AreaApi'
import CloseForm from '@/components/forms/CloseForm'
import Area from '@/models/Area'

export default {
  name: 'AreaForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    area: {
      type: Object,
      required: false
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
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? AreaApi.update(this.data) : AreaApi.create(this.data)

      promise
        .then((resp) => {
          const area = new Area(resp.data)
          this.$router.push(area.path())
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
