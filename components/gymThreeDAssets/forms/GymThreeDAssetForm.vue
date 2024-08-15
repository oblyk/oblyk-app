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

    <p>
      Suivant le type de fichier 3D que vous voulez importer, choisissez l'une des options ci-dessous :
    </p>
    <v-expansion-panels
      v-model="importTypeIndex"
      class="mb-6"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <p class="mb-0">
            Je souhaite importer un fichier <code class="font-weight-bold">.obj.zip</code>
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Exemple : Lors de l'export en OBJ sur la version web de SketchUp, un fichier .obj.zip est à télécharger</p>
          <v-file-input
            v-model="data.objZipFile"
            outlined
            truncate-length="30"
            placeholder="Fichier .obj.zip"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <p class="mb-0">
            Je souhaite importer deux fichiers, un <code class="font-weight-bold">.obj</code> et un <code class="font-weight-bold">.mtl</code>
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>
            Exemple : Lors de l'export en OBJ sur SketchUp Desktop, deux fichiers sont produits, un .obj et un .mtl.<br>
            Les deux doivent être fournis.
          </p>
          <v-file-input
            v-model="data.objFile"
            outlined
            accept=".obj,*"
            truncate-length="30"
            placeholder="Fichier .obj"
          />
          <v-file-input
            v-model="data.mtlFile"
            outlined
            accept=".mtl,*"
            truncate-length="30"
            placeholder="Fichier .mtl"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <p class="mb-0">
            Je souhaite importer un fichier <code class="font-weight-bold">.gltf</code>
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>
            D'autres logiciels comme Blender, Revit ou FreeCad, peuvent exporter leur modèle 3D au format .gltf
          </p>
          <v-file-input
            v-model="data.gltfFile"
            outlined
            accept=".gltf,*"
            truncate-length="30"
            placeholder="Fichier .gltf"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div
      v-if="submitMethode === 'put'"
      class="mb-6 mt-5"
    >
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
        objZipFile: null,
        objFile: null,
        mtlFile: null,
        gltfFile: null,
        three_d_parameters: {
          color_correction_sketchup_exports: this.gymThreeDAsset?.three_d_parameters?.color_correction_sketchup_exports,
          highlight_edges: this.gymThreeDAsset?.three_d_parameters?.highlight_edges
        }
      },
      importTypeIndex: null,
      loadingDelete: false,
      redirectTo: null,
      uploadPercentage: 0,
      advancedOptions: false,
      importTypes: ['obj_zip', 'obj_mtl', 'gltf'],

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
      if (this.importTypeIndex !== null) {
        const importType = this.importTypes[this.importTypeIndex]
        formData.append('gym_three_d_asset[import_type]', importType)
        if (importType === 'obj_zip') {
          formData.append('gym_three_d_asset[three_d_file]', this.data.objZipFile)
        } else if (importType === 'gltf') {
          formData.append('gym_three_d_asset[three_d_file]', this.data.gltfFile)
        } else if (importType === 'obj_mtl') {
          formData.append('gym_three_d_asset[three_d_file_obj]', this.data.objFile)
          formData.append('gym_three_d_asset[three_d_file_mtl]', this.data.mtlFile)
        }
      }
      formData.append('gym_three_d_asset[name]', this.data.name)
      if (this.data.description) {
        formData.append('gym_three_d_asset[description]', this.data.description)
      }
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
