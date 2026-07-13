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
import OblykApi from '~/services/oblyk-api/OblykApi'

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

      new OblykApi(this.$axios, this.$auth)
        .post(
          `/public/areas/${this.area.id}/add_crag`,
          { area: { crag_id: crag.id } }
        )
        .then(() => {
          this.$router.push(`${this.area.app_path}/crags`)
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
