<template>
  <v-dialog
    v-model="pipelinesDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon color="green accent-2" class="mr-3" left>
          {{ mdiCreation }}
        </v-icon>
        Détéction des prises
        <v-btn class="ml-auto" icon @click="pipelinesDialog = false">
          <v-icon color="primary">
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p>
          La détéction des prises permet de détourer automatiquement la plus part des prises de votre Spray Wall.
        </p>
        <p>
          Une fois la détéction finis, passer en revu les prises générées, corrigez-les, et ajoutez les manquantes.
        </p>
        <div class="text-center">
          <v-btn
            v-if="sprayWallHolds.length === 0"
            :loading="runningPipeline"
            color="deep-purple accent-3"
            elevation="0"
            dark
            @click="runPipeline"
          >
            <v-icon color="green accent-2" left>
              {{ mdiCreation }}
            </v-icon>
            Lancer la détection
          </v-btn>
          <div class="pt-2">
            <small>
              La détéction des prises peut prendre plusieurs minutes.
            </small>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCreation, mdiClose } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'SprayWallEditorPipelineDialog',
  props: {
    sprayWall: {
      type: Object,
      required: true
    },
    sprayWallHolds: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      pipelinesDialog: false,
      runningPipeline: false,

      mdiCreation,
      mdiClose
    }
  },

  methods: {
    togglePipelineDialog (force = null) {
      this.pipelinesDialog = force || !this.pipelinesDialog
    },

    runPipeline () {
      this.pipelinesDialog = true
      this.runningPipeline = true
      new OblykApi(this.$axios, this.$auth)
        .post(`/gyms/${this.sprayWall.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_pipelines`)
        .then(() => {
          this.pipelinesDialog = false
        })
        .finally(() => {
          this.runningPipeline = false
        })
    }
  }
}
</script>
