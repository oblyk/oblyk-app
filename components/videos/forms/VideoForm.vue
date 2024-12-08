<template>
  <v-form @submit.prevent="submit()">
    <v-expansion-panels
      v-model="panelIndex"
      class="mb-4"
    >
      <v-expansion-panel
        v-if="!isEditingForm() || video.video_service !== 'oblyk_video'"
      >
        <v-expansion-panel-header class="font-weight-bold">
          <div>
            <v-icon left>
              {{ mdiWeb }}
            </v-icon>
            {{ $t('components.video.addFromWeb') }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="data.url"
            outlined
            required
            hide-details
            :label="$t('models.video.url')"
          />

          <p class="mt-3">
            {{ $t('models.video.explainUrl') }} :
            <a target="_blank" class="font-weight-bold" href="https://www.youtube.com/">Youtube</a>,
            <a target="_blank" class="font-weight-bold" href="https://www.dailymotion.com/">Dailymotion</a>,
            <a target="_blank" class="font-weight-bold" href="https://vimeo.com">Vimeo</a>,
            <a target="_blank" class="font-weight-bold" href="https://www.instagram.com/">Instagram</a>
            ou <a target="_blank" class="font-weight-bold" href="https://www.tiktok.com">Tiktok</a>.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel
        v-if="!isEditingForm() && enableOblykVideo"
      >
        <v-expansion-panel-header class="font-weight-bold">
          <div>
            <v-icon left>
              {{ mdiUpload }}
            </v-icon>
            <span v-html="$vuetify.breakpoint.mobile ? $t('components.video.addFromMobile') : $t('components.video.addFromComputer')" />
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-file-input
            v-model="file"
            outlined
            hide-details
            accept="video/*"
            truncate-length="15"
            :placeholder="$t('actions.browse')"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-textarea
      v-if="showDescription"
      v-model="data.description"
      outlined
      required
      :label="$t('models.video.description')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="isEditingForm() ? 'actions.edit' : 'actions.add'"
      :go-back-btn="false"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>

<script>
import { mdiWeb, mdiUpload } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import VideoApi from '~/services/oblyk-api/VideoApi'
import CloseForm from '@/components/forms/CloseForm'
import { AppConcern } from '~/concerns/AppConcern'

export default {
  name: 'VideoForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern],
  props: {
    video: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    },
    enableOblykVideo: {
      type: Boolean,
      default: false
    },
    showDescription: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      redirectTo: null,
      uploadPercentage: 0,
      file: null,
      panelIndex: 0,
      data: {
        id: this.video?.id,
        url: this.video?.url,
        description: this.video?.description,
        viewable_type: this.video?.viewable_type || this.$route.params.viewableType,
        viewable_id: this.video?.viewable_id || this.$route.params.viewableId
      },

      mdiWeb,
      mdiUpload
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true

      if (this.isEditingForm()) {
        new VideoApi(this.$axios, this.$auth)
          .update(this.data)
          .then(() => {
            this.$router.push(this.redirectTo)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'video')
          }).then(() => {
            this.submitOverlay = false
          })
      } else {
        const formData = new FormData()
        formData.append('video[viewable_id]', this.data.viewable_id)
        formData.append('video[viewable_type]', this.data.viewable_type)
        formData.append('video[description]', this.data.description || '')
        if (this.data.url) {
          formData.append('video[url]', this.data.url || '')
        } else {
          formData.append('video[video_file]', this.file)
        }

        const url = `${this.baseUrl}/videos.json`
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
          .then(() => {
            if (this.callback) {
              this.callback()
            } else {
              this.$router.push(this.redirectTo)
            }
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'video')
          }).then(() => {
            this.submitOverlay = false
          })
      }
    }
  }
}
</script>
