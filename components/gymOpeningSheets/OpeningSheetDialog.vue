<template>
  <v-dialog
    v-model="dialog"
    width="450"
  >
    <v-card>
      <v-card-title class="d-flex">
        <div>
          <v-icon left>
            {{ mdiFileRefreshOutline }}
          </v-icon>
          Nouvelle fiche d'ouverture
        </div>
        <v-btn
          class="ml-auto"
          icon
          @click="dialog = false"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <div class="pa-4">
        <v-text-field
          v-model="data.title"
          :label="$t('models.gymOpeningSheet.title')"
          required
          class="required-field"
          outlined
        />
        <v-textarea
          v-model="data.description"
          outlined
          :label="$t('models.gymOpeningSheet.description')"
        />
        <v-text-field
          v-model="data.number_of_columns"
          outlined
          type="number"
          :label="$t('models.gymOpeningSheet.number_of_columns')"
          class="required-field"
          required
        />
        <div class="text-right">
          <v-btn
            elevation="0"
            color="primary"
            :loading="loadingSheet"
            @click="createOpeningSheet"
          >
            Créer la fiche
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiFileRefreshOutline, mdiClose } from '@mdi/js'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymOpeningSheet from '~/models/GymOpeningSheet'

export default {
  name: 'OpeningSheetDialog',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      dialog: false,
      loadingSheet: false,

      data: {
        gym_id: this.gym.id,
        title: null,
        description: null,
        number_of_columns: 8,
        gym_route_ids: []
      },

      mdiFileRefreshOutline,
      mdiClose
    }
  },

  methods: {
    openDialog (gymRouteIds) {
      this.data.gym_route_ids = gymRouteIds
      this.dialog = true
    },

    createOpeningSheet () {
      this.loadingSheet = true
      new GymRouteApi(this.$axios, this.$auth)
        .openingSheetCollection(this.data)
        .then((resp) => {
          const openingSheet = new GymOpeningSheet({ attributes: resp.data })
          this.$router.push(openingSheet.path)
        })
    }
  }
}
</script>
