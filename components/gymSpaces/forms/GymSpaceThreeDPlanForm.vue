<template>
  <div>
    <p>
      Suivant le type de fichier 3D que vous voulez importer, choisissez l'une des options ci-dessous :
    </p>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <p class="mb-0">
            Je souhaite importer un fichier <code class="font-weight-bold">.obj.zip</code>
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Exemple : Lors de l'export en OBJ sur la version web de SketchUp, un fichier .obj.zip est à télécharger</p>
          <v-form
            enctype="multipart/form-data"
            @submit.prevent="submit('obj_zip')"
          >
            <v-file-input
              v-model="file"
              outlined
              accept="application/zip,*"
              truncate-length="30"
              placeholder="Fichier .obj.zip"
            />
            <submit-form
              :overlay="submitOverlay"
              :progressable="true"
              :progress-value="uploadPercentage"
              :go-back-btn="false"
            />
          </v-form>
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
          <v-form
            enctype="multipart/form-data"
            @submit.prevent="submit('obj_mtl')"
          >
            <v-file-input
              v-model="fileObj"
              outlined
              accept=".obj,*"
              truncate-length="30"
              placeholder="Fichier .obj"
            />
            <v-file-input
              v-model="fileMtl"
              outlined
              accept=".mtl,*"
              truncate-length="30"
              placeholder="Fichier .mtl"
            />
            <submit-form
              :overlay="submitOverlay"
              :progressable="true"
              :progress-value="uploadPercentage"
              :go-back-btn="false"
            />
          </v-form>
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
          <v-form
            enctype="multipart/form-data"
            @submit.prevent="submit('gltf')"
          >
            <v-file-input
              v-model="file"
              outlined
              accept=".gltf,*"
              truncate-length="30"
              placeholder="Fichier .gltf"
            />
            <submit-form
              :overlay="submitOverlay"
              :progressable="true"
              :progress-value="uploadPercentage"
              :go-back-btn="false"
            />
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mdiMenuDown, mdiMenuRight } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'GymSpaceThreeDPlanForm',
  components: { SubmitForm },
  mixins: [FormHelpers, AppConcern],
  props: {
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      file: null,
      fileObj: null,
      fileMtl: null,
      redirectTo: null,
      uploadPercentage: 0,

      mdiMenuDown,
      mdiMenuRight
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit (fileType) {
      this.submitOverlay = true
      const formData = new FormData()
      if (this.file && (fileType === 'obj_zip' || fileType === 'gltf')) {
        formData.append('gym_space[three_d_file]', this.file)
      }
      if (this.fileObj && this.fileMtl && fileType === 'obj_mtl') {
        formData.append('gym_space[three_d_file_obj]', this.fileObj)
        formData.append('gym_space[three_d_file_mtl]', this.fileMtl)
      }

      formData.append('gym_space[import_type]', fileType)

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.gymSpace.gym.id}/gym_spaces/${this.gymSpace.id}/add_three_d_file.json`,
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
        .then(() => {
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else {
            this.$router.push(`${this.gymSpace.Gym.adminPath}/spaces/${this.gymSpace.id}/edit-three-d`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
