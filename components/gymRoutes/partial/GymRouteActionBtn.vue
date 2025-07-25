<template>
  <v-menu offset-y right>
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        outlined
        small
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiPencil }}
        </v-icon>
        {{ $t('actions.edit') }}
      </v-btn>
    </template>
    <v-list>
      <!-- Edit route -->
      <v-list-item
        link
        :to="`${gymRoute.path}/edit`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiPencil }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.edit') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Add picture -->
      <v-list-item
        link
        :to="`${gymRoute.path}/picture`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiCamera }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            v-text="gymRoute.gym_route_cover.attachments.picture.attached ? $t('actions.editPicture') : $t('actions.addPicture')"
          />
        </v-list-item-content>
      </v-list-item>

      <!-- Define thumbnail -->
      <v-list-item
        v-if="gymRoute.gym_route_cover.attachments.picture.attached"
        link
        :to="`${gymRoute.path}/thumbnail`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiCrop }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.defineThumbnail') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item
        v-if="gymRoute.dismounted_at"
        link
        @click="mount()"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiForwardburger }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="red--text">
            {{ $t('actions.takeUpRoute') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-else
        link
        @click="dismount()"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiBackburger }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="red--text">
            {{ $t('actions.dismountRoute') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="gymRoute.gym_route_cover.attachments.picture.attached"
        link
        @click="deletePicture()"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiCameraOff }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="red--text">
            {{ $t('actions.deletePicture') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
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
