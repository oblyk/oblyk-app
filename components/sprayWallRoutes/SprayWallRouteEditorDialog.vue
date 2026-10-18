<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex">
        <v-icon color="primary" left>
          {{ oblykSprayWall }}
        </v-icon>
        Mon Bloc
        <v-btn
          class="ml-auto"
          icon
          @click="dialog = false"
        >
          <v-icon color="primary">
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <spray-wall-route-form
          :spray-wall="sprayWall"
          :gym="gym"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { oblykSprayWall } from '~/assets/oblyk-icons'
import SprayWallRouteForm from '~/components/sprayWallRoutes/forms/SprayWallRouteForm.vue'

export default {
  name: 'SprayWallRouteEditorDialog',
  components: { SprayWallRouteForm },
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWall: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      dialog: false,

      oblykSprayWall,
      mdiClose
    }
  },

  methods: {
    openDialog () {
      this.dialog = true
    }
  }
}
</script>
