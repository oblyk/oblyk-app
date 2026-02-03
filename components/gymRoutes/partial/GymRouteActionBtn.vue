<template>
  <v-sheet class="pa-2" rounded>
    <v-btn
      :to="`${gymRoute.path}/edit`"
      elevation="0"
      color="primary"
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
        <small>Publication</small>
      </p>
      <v-btn
        outlined
        text
        small
        @click="addToPublication"
      >
        <v-icon left>
          {{ oblykArdoisePlus }}
        </v-icon>
        {{ $t('actions.addToMyPublication') }}
      </v-btn>
    </div>

    <div class="mt-1">
      <p class="mb-0 font-weight-bold">
        <small>Photo</small>
      </p>
      <v-btn
        :to="`${gymRoute.path}/picture`"
        outlined
        text
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
      >
        <v-icon left small>
          {{ mdiCrop }}
        </v-icon>
        {{ $t('actions.defineThumbnail') }}
      </v-btn>
    </div>

    <add-gym-routes-to-publication-modal
      ref="addGymRoutesToPublicationModal"
      :gym="gymRoute.gym"
      post-added-method="closeModal"
    />
  </v-sheet>
</template>

<script>
import { mdiPencil, mdiCamera, mdiCrop, mdiBackburger, mdiCameraOff, mdiForwardburger } from '@mdi/js'
import { oblykArdoisePlus } from '~/assets/oblyk-icons'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AddGymRoutesToPublicationModal from '~/components/gymRoutes/AddGymRoutesToPublicationModal'

export default {
  name: 'GymRouteActionBtn',
  components: { AddGymRoutesToPublicationModal },
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
      mdiForwardburger,
      oblykArdoisePlus
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
    },

    addToPublication () {
      this.$refs.addGymRoutesToPublicationModal.openDialog([this.gymRoute.id])
    }
  }
}
</script>
