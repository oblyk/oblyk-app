<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <v-text-field
      v-model="data.name"
      outlined
      label="Nom de la décoration"
    />
    <v-textarea
      v-model="data.description"
      outlined
      label="Description"
    />

    <v-file-input
      v-model="data.file"
      outlined
      truncate-length="15"
      placeholder="Fichier .obj.zip ou .gltf"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    >
      <v-btn
        v-if="gymThreeDAsset !== null"
        outlined
        text
        :loading="loadingDelete"
        color="red"
        @click="deleteAsset()"
      >
        <v-icon left>
          {{ mdiTrashCan }}
        </v-icon>
        {{ $t('actions.delete') }}
      </v-btn>
    </submit-form>
  </v-form>
</template>

<script>
import { mdiTrashCan } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import GymThreeDAssetApi from '~/services/oblyk-api/GymThreeDAssetApi'

export default {
  name: 'GymThreeDAssetForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymThreeDAsset: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        name: this.gymThreeDAsset?.name,
        description: this.gymThreeDAsset?.description,
        file: null
      },
      loadingDelete: false,
      redirectTo: null,
      uploadPercentage: 0,

      mdiTrashCan
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const formData = new FormData()
      if (this.data.file) {
        formData.append('gym_three_d_asset[three_d_file]', this.data.file)
      }
      formData.append('gym_three_d_asset[name]', this.data.name)
      formData.append('gym_three_d_asset[description]', this.data.description)

      const submitMethod = this.submitMethode
      const submitUrl = this.submitMethode === 'post' ? `${this.baseUrl}/gyms/${this.gym.id}/gym_three_d_assets.json` : `${this.baseUrl}/gyms/${this.gym.id}/gym_three_d_assets/${this.gymThreeDAsset.id}.json`

      this.$axios({
        method: submitMethod,
        url: submitUrl,
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
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else if (this.submitMethode === 'post') {
            this.$router.push(`${this.gym.adminPath}/three-d-assets/${resp.data.id}/edit`)
          } else {
            location.reload()
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    deleteAsset () {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette décoration ?')) {
        this.loadingDelete = true
        new GymThreeDAssetApi(this.$axios, this.$auth)
          .delete(
            this.gym.id,
            this.gymThreeDAsset.id
          )
          .then(() => {
            if (this.redirectTo) {
              this.$router.push(this.redirectTo)
            } else {
              this.$router.push(`${this.gym.adminPath}/spaces/edit-three-d`)
            }
          })
          .finally(() => {
            this.loadingDelete = false
          })
      }
    }
  }
}
</script>
