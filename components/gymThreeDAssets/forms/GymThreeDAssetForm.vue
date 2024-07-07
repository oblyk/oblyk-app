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

    <div class="mb-6">
      <p class="mb-0">
        <span @click="advancedOptions = !advancedOptions">
          <v-icon left>
            {{ advancedOptions ? mdiMenuDown : mdiMenuRight }}
          </v-icon>
          {{ $t('common.advancedOptions') }}
        </span>
      </p>
      <div
        v-if="advancedOptions"
      >
        <v-checkbox
          v-model="data.three_d_parameters.color_correction_sketchup_exports"
          label="Corriger les couleurs des exports Sketchup"
          hide-details
        />
        <v-checkbox
          v-model="data.three_d_parameters.highlight_edges"
          label="Marquer les arrêtes pour améliorer la lisibilité des structures"
        />
      </div>
    </div>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
      submit-btn-dark
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
import { mdiMenuRight, mdiMenuDown, mdiTrashCan } from '@mdi/js'
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
        file: null,
        three_d_parameters: {
          color_correction_sketchup_exports: this.gymThreeDAsset?.three_d_parameters?.color_correction_sketchup_exports,
          highlight_edges: this.gymThreeDAsset?.three_d_parameters?.highlight_edges
        }
      },
      loadingDelete: false,
      redirectTo: null,
      uploadPercentage: 0,
      advancedOptions: false,

      mdiTrashCan,
      mdiMenuRight,
      mdiMenuDown
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
      formData.append('gym_three_d_asset[three_d_parameters][color_correction_sketchup_exports]', this.data.three_d_parameters.color_correction_sketchup_exports)
      formData.append('gym_three_d_asset[three_d_parameters][highlight_edges]', this.data.three_d_parameters.highlight_edges)

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
