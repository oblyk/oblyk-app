<template>
  <div>
    <spinner v-if="loadingGymSector" />

    <v-container
      v-if="gymSpace && !loadingGymSector"
      style="max-width: 500px"
    >
      <h3 class="mb-3">
        <v-btn
          icon
          @click="goBackClick"
        >
          <v-icon color="primary">
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
        Ajouter {{ gymSector.name }} à ma publication
      </h3>
      <p class="text-decoration-underline mb-2">
        Ajoutez à l'un de vos brouillons :
      </p>
      <v-skeleton-loader
        v-if="loadingDrafts"
        type="list-item-two-line"
      />
      <div
        v-else
        class="mb-4"
      >
        <v-card
          v-for="(publication, publicationIndex) in draftPublications"
          :key="`publication-index-${publicationIndex}`"
          class="border"
        >
          <v-card-subtitle class="amber--text font-weight-bold">
            {{ humanizeDate(publication.last_updated_at, 'DATETIME_MED') }}
          </v-card-subtitle>
          <v-card-text>
            <p
              v-if="publication.body"
              class="mb-0"
            >
              {{ publication.body }}
            </p>
            <p
              v-else
              class="text-center font-italic mb-0"
            >
              Pas encore de contenu
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              elevation="0"
              color="primary"
              :loading="loadingAdd"
              class="ml-auto"
              @click="addOnPublication(publication.id)"
            >
              <v-icon left>
                {{ mdiPlus }}
              </v-icon>
              {{ $t('actions.add') }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <p
          v-if="draftPublications.length === 0"
          class="text-center font-italic text--disabled my-4"
        >
          Vous n'avez pas de brouillon en cours
        </p>
      </div>
      <p class="text-decoration-underline mb-2">
        <strong>Ou</strong> créez une nouvelle publication :
      </p>
      <div class="text-center">
        <v-btn
          elevation="0"
          text
          outlined
          color="primary"
          :loading="loadingAdd"
          @click="createPublication"
        >
          <v-icon left>
            {{ oblykArdoisePlus }}
          </v-icon>
          Nouvelle publication
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiPlus, mdiArrowLeft } from '@mdi/js'
import { oblykArdoise, oblykArdoisePlus } from '~/assets/oblyk-icons'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import { GymSectorConcern } from '@/concerns/GymSectorConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import Spinner from '@/components/layouts/Spiner'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  meta: { orphanRoute: true },
  components: { Spinner },
  mixins: [GymSpaceConcern, GymSectorConcern, DateHelpers],

  data () {
    return {
      loadingAdd: false,
      loadingDrafts: false,
      draftPublications: [],
      gymSector: [],

      mdiPlus,
      mdiArrowLeft,
      oblykArdoise,
      oblykArdoisePlus
    }
  },

  head () {
    return {
      title: this.$t('actions.editName', { name: this.gymSector?.name })
    }
  },

  mounted () {
    this.getDraftPublications()
  },

  methods: {
    addOnPublication (publicationId) {
      this.loadingAdd = true
      new OblykApi(this.$axios, this.$auth)
        .post(
          `/publications/${publicationId}/publication_attachments/create_bulk`,
          {
            publication_attachments: [{
              attachable_type: 'GymSector',
              attachable_id: this.gymSector.id,
              publication_id: publicationId
            }]
          }
        )
        .then(() => {
          const publicationPath = `${this.gymSpace.gym.app_path}/publications/${publicationId}/edit`
          const snackbarMessage = this.$tc('components.gymSector.addToPublication', { name: this.gymSector.name })
          this.$router.push(publicationPath)
          this.$store.dispatch('appSnackbarPusher/pushAppSnackbar', {
            message: snackbarMessage,
            color: 'success'
          })
        })
        .catch(() => {
          this.loadingAdd = false
        })
    },

    createPublication () {
      this.loadingAdd = false
      new OblykApi(this.$axios, this.$auth)
        .post(
          '/publications',
          {
            publication: {
              body: '',
              publishable_type: 'Gym',
              publishable_id: this.$route.params.gymId
            }
          })
        .then((resp) => {
          this.addOnPublication(resp.data.id)
        })
        .catch(() => {
          this.loadingAdd = false
        })
    },

    getDraftPublications () {
      this.loadingDrafts = true
      new OblykApi(this.$axios, this.$auth)
        .get(
          '/publications/drafts',
          {
            publishable_type: 'Gym',
            publishable_id: this.$route.params.gymId
          })
        .then((resp) => {
          this.draftPublications = resp.data
        })
        .finally(() => {
          this.loadingDrafts = false
        })
    },

    goBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>
