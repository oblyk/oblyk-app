<template>
  <v-menu offset-y right>
    <template v-slot:activator="{ on, attrs }">
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
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- Edit route -->
      <v-list-item
        link
        :to="gymRoute.url('edit')"
      >
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
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
        :to="gymRoute.url('picture')"
      >
        <v-list-item-icon>
          <v-icon>mdi-camera</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.addPicture') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Define thumbnail -->
      <v-list-item
        link
        v-if="gymRoute.hasPicture"
        :to="gymRoute.url('thumbnail')"
      >
        <v-list-item-icon>
          <v-icon>mdi-crop</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.defineThumbnail') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider/>

      <v-list-item
        link
        @click="dismount()"
      >
        <v-list-item-icon>
          <v-icon>mdi-backburger</v-icon>
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
import gymRouteApi from '@/services/oblyk-api/GymRouteApi'

export default {
  name: 'GymRouteActionMenu',
  props: {
    gymRoute: Object,
    getSpaceRoutes: Function
  },

  methods: {
    dismount: function () {
      gymRouteApi
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
