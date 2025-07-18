<template>
  <div>
    <crag-search-form
      :linkable-result="false"
      :callback="addCrag"
    />
    <overlay-form :overlay="submitOverlay" />
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CragSearchForm from '@/components/crags/forms/CragSearchForm'
import OverlayForm from '@/components/forms/OverlayForm'
import AreaApi from '~/services/oblyk-api/AreaApi'

export default {
  name: 'AddCragInAreaForm',
  components: { OverlayForm, CragSearchForm },
  mixins: [FormHelpers],

  props: {
    area: {
      type: Object,
      required: true
    }
  },

  methods: {
    addCrag (crag) {
      this.submitOverlay = true

      new AreaApi(this.$axios, this.$auth)
        .addCrag(this.area.id, crag.id)
        .then(() => {
          this.$router.push(`${this.area.path}/crags`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
