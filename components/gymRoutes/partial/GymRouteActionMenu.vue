<template>
  <v-menu offset-y right>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        dark
        large
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          large
        >
          {{ mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- Edit route -->
      <v-list-item
        link
        :to="`/a${gymRoute.path}/edit`"
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
          <v-list-item-title>
            {{ $t('actions.addPicture') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Define thumbnail -->
      <v-list-item
        v-if="gymRoute.hasPicture"
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
        link
        @click="dismount()"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiBackburger }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.dismountRoute') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { mdiDotsVertical, mdiPencil, mdiCamera, mdiCrop, mdiBackburger } from '@mdi/js'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'

export default {
  name: 'GymRouteActionMenu',
  props: {
    gymRoute: Object,
    getSpaceRoutes: Function
  },

  data () {
    return {
      mdiDotsVertical,
      mdiPencil,
      mdiCamera,
      mdiCrop,
      mdiBackburger
    }
  },

  methods: {
    dismount () {
      new GymRouteApi(this.$axios, this.$auth)
        .dismount(
          this.gymRoute.gym.id,
          this.gymRoute.id
        ).then(() => {
          this.getSpaceRoutes()
        }).catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
    }
  }
}
</script>
