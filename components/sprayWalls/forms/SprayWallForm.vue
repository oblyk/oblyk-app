<template>
  <v-sheet rounded class="px-2 pt-3 pb-1">
    <v-form
      enctype="multipart/form-data"
      @submit.prevent="submit()"
    >
      <v-text-field
        v-model="data.name"
        label="Nom (facultatif)"
        outlined
      />
      <v-file-input
        v-if="!isEditingForm()"
        v-model="file"
        outlined
        truncate-length="15"
        label="Photo du Spray Wall"
        :placeholder="$t('actions.browse')"
      />

      <submit-form
        :overlay="submitOverlay"
        :progressable="true"
        :progress-value="uploadPercentage"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import Jsona from 'jsona'
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'SprayWallForm',
  components: { SubmitForm },
  mixins: [FormHelpers, AppConcern],

  props: {
    sprayWall: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      file: null,
      uploadPercentage: 0,
      data: {
        id: this.sprayWall?.id,
        name: this.sprayWall?.name
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true

      if (this.isEditingForm()) {
        new OblykApi(this.$axios, this.$auth)
          .put(
            `/gyms/${this.sprayWall.gym.id}/spray_walls/${this.sprayWall.id}`,
            { spray_wall: this.data }
          )
          .then(() => {
            this.$router.push(this.sprayWall.admin_app_path)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'sprayWall')
          }).then(() => {
            this.submitOverlay = false
          })
      } else {
        const formData = new FormData()
        formData.append('spray_wall[picture]', this.file)
        formData.append('spray_wall[name]', this.data.name)

        const url = `${this.baseUrl}/gyms/${this.$route.params.gymId}/spray_walls.json`
        this.$axios.$request({
          method: 'POST',
          url,
          headers: {
            Authorization: this.$auth.$storage.getUniversal('_token.local'),
            HttpApiAccessToken: this.apiAccessToken,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
          },
          data: formData
        })
          .then((resp) => {
            const sprayWall = new Jsona().deserialize(resp)
            this.$router.push(sprayWall.admin_app_path)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'sprayWall')
          }).then(() => {
            this.submitOverlay = false
          })
      }
    }
  }
}
</script>
