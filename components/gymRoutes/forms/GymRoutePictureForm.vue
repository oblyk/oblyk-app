<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <v-file-input
      v-model="file"
      :disabled="!(routeCoverSelected === null || routeCoverSelected === undefined)"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />

    <v-progress-circular
      v-if="loadingLastRoutes"
      class="mx-auto"
    />
    <div v-if="!loadingLastRoutes && lastGymRoutes.length > 0 && !file">
      <div>
        {{ $t('components.gymRoute.reusePicture') }} :
      </div>
      <div class="border rounded mb-4 mt-2">
        <v-slide-group
          v-model="routeCoverSelected"
          active-class="success"
          show-arrows="always"
        >
          <v-slide-item
            v-for="(lastGymRoute, gymRouteIndex) in lastGymRoutes"
            :key="`gym-route-index-${gymRouteIndex}`"
            v-slot="{ active, toggle }"
          >
            <v-img
              :src="lastGymRoute.pictureUrl"
              width="250px"
              class="ma-4 rounded align-end"
              :gradient="active ? 'to bottom, rgba(49, 153, 78 ,0.4), rgba(49, 153, 78, 0.4)' : 'to bottom, rgba(0,0,0,0.1) 80%, rgba(0,0,0,.7) 100%'"
              @click="toggle"
            >
              <div class="text-center py-2">
                {{ humanizeDate(gymRoute.history.created_at, 'DD/MM/YYYY HH:MM') }}
              </div>
            </v-img>
          </v-slide-item>
        </v-slide-group>
      </div>
    </div>

    <submit-form
      :go-back-btn="goBackBtn"
      :overlay="submitOverlay"
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import GymRoute from '@/models/GymRoute'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'GymRoutePictureForm',
  components: { SubmitForm },
  mixins: [FormHelpers, AppConcern, DateHelpers],
  props: {
    gymRoute: {
      type: Object,
      default: null
    },
    goBackBtn: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      routeCoverSelected: null,
      uploadPercentage: 0,
      loadingLastRoutes: true,
      lastGymRoutes: [],
      file: null
    }
  },

  mounted () {
    this.getLastPicture()
  },

  methods: {
    submit () {
      if (
        (this.routeCoverSelected === null || this.routeCoverSelected === undefined) && (this.file === null || this.file === undefined)
      ) {
        return false
      }

      this.submitOverlay = true
      const formData = new FormData()

      if (this.routeCoverSelected !== null) {
        formData.append('gym_route[gym_route_cover_id]', this.lastGymRoutes[parseInt(this.routeCoverSelected)].id)
      } else {
        formData.append('gym_route[gym_route_cover][picture]', this.file)
      }

      this.$axios({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.gymRoute.gym.id}/gym_routes/${this.gymRoute.id}/add_picture.json`,
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
          const gymRoute = new GymRoute({ attributes: resp.data })
          if (this.callback) {
            this.callback(gymRoute)
          } else {
            this.$router.push(`${gymRoute.path}/thumbnail`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    getLastPicture () {
      this.loadingLastRoutes = true
      new GymSectorApi(this.$axios, this.$auth)
        .lastRoutesWithPictures(this.gymRoute.gym.id, this.gymRoute.gym_space.id, this.gymRoute.gym_sector.id)
        .then((resp) => {
          this.lastGymRoutes = []
          for (const gymRoute of resp.data) {
            this.lastGymRoutes.push(new GymRoute({ attributes: gymRoute }))
          }
        })
        .finally(() => {
          this.loadingLastRoutes = false
        })
    }
  }
}
</script>
