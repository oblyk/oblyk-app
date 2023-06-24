<template>
  <v-form @submit.prevent="submit()">
    <v-select
      v-model="data.crag_sector_id"
      :items="crag.sectors"
      item-text="name"
      item-value="id"
      :label="$t('models.rockBar.crag_sector_id')"
      :hint="$t('components.crag.explainRockBarSector')"
      persistent-hint
      outlined
      clearable
    />

    <submit-form
      class="mt-4"
      :rounded-overlay="true"
      :go-back-btn="backBtn"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import RockBarApi from '~/services/oblyk-api/RockBarApi'

export default {
  name: 'RockBarFrom',
  components: {
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    },
    rockBar: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    },
    backBtn: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      data: {
        id: (this.rockBar || {}).id,
        polyline: (this.rockBar || {}).polyline,
        crag_sector_id: (this.rockBar || {}).crag_sector_id,
        crag_id: (this.rockBar || {}).crag_id || this.crag.id
      }
    }
  },

  watch: {
    'rockBar.polyline' () {
      this.data.polyline = this.rockBar.polyline
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true

      const promise = (this.isEditingForm()) ? new RockBarApi(this.$axios, this.$auth).update(this.data) : new RockBarApi(this.$axios, this.$auth).create(this.data)
      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push(`${this.crag.path}/maps`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'approach')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
