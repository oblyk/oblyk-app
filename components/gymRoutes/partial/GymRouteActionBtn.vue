<template>
  <v-sheet class="pa-2" rounded>
    <v-btn
      :to="`${gymRoute.path}/edit`"
      outlined
      text
      small
    >
      <v-icon left>
        {{ mdiPencil }}
      </v-icon>
      {{ $t('actions.edit') }}
    </v-btn>

    <v-btn
      v-if="gymRoute.dismounted_at"
      outlined
      text
      small
      @click="mount()"
    >
      <v-icon left>
        {{ mdiForwardburger }}
      </v-icon>
      {{ $t('actions.takeUpRoute') }}
    </v-btn>

    <v-btn
      v-else
      outlined
      text
      small
      @click="dismount()"
    >
      <v-icon left>
        {{ mdiBackburger }}
      </v-icon>
      {{ $t('actions.dismountRoute') }}
    </v-btn>

    <div class="mt-1">
      <p class="mb-0 font-weight-bold">
        <small>Photo</small>
      </p>
      <v-btn
        :to="`${gymRoute.path}/picture`"
        outlined
        text
        x-small
      >
        <v-icon left small>
          {{ mdiCamera }}
        </v-icon>
        {{ gymRoute.gym_route_cover.attachments.picture.attached ? $t('actions.editPicture') : $t('actions.addPicture') }}
      </v-btn>

      <v-btn
        v-if="gymRoute.gym_route_cover.attachments.picture.attached"
        outlined
        text
        x-small
        @click="deletePicture()"
      >
        <v-icon left small>
          {{ mdiCameraOff }}
        </v-icon>
        {{ $t('actions.deletePicture') }}
      </v-btn>

      <v-btn
        v-if="gymRoute.gym_route_cover.attachments.picture.attached"
        :to="`${gymRoute.path}/thumbnail`"
        outlined
        text
        x-small
      >
        <v-icon left small>
          {{ mdiCrop }}
        </v-icon>
        {{ $t('actions.defineThumbnail') }}
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { mdiPencil, mdiCamera, mdiCrop, mdiBackburger, mdiCameraOff, mdiForwardburger } from '@mdi/js'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'

export default {
  name: 'GymRouteActionBtn',
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    reloadRouteCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      mdiPencil,
      mdiCamera,
      mdiCrop,
      mdiBackburger,
      mdiCameraOff,
      mdiForwardburger
    }
  },

  methods: {
    dismount () {
      if (confirm(this.$t('common.areYouSurDismountedRoute'))) {
        new GymRouteApi(this.$axios, this.$auth)
          .dismount(
            this.gymRoute.gym.id,
            this.gymRoute.id
          ).then(() => {
            this.reloadRouteCallback()
            this.$root.$emit('reloadSpaceRoutes')
          }).catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'gymRoute')
          })
      }
    },

    mount () {
      new GymRouteApi(this.$axios, this.$auth)
        .mount(
          this.gymRoute.gym.id,
          this.gymRoute.id
        ).then(() => {
          this.reloadRouteCallback()
          this.$root.$emit('reloadSpaceRoutes')
        }).catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
    },

    deletePicture () {
      if (confirm(this.$t('common.areYouSurDeletePicture'))) {
        new GymRouteApi(this.$axios, this.$auth)
          .deletePicture(
            this.gymRoute.gym.id,
            this.gymRoute.id
          ).then(() => {
            this.reloadRouteCallback()
            this.$root.$emit('reloadSpaceRoutes')
          }).catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'gymRoute')
          })
      }
    }
  }
}
</script>
