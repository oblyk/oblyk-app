<template>
  <v-dialog
    v-model="dialog"
    width="450"
  >
    <v-card>
      <v-card-title class="d-flex">
        <div>
          <v-icon left>
            {{ oblykArdoise }}
          </v-icon>
          Ajouter {{ gymRouteIds.length }} ligne(s) à ma publication
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
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose, mdiPlus } from '@mdi/js'
import { oblykArdoise, oblykArdoisePlus } from '~/assets/oblyk-icons'
import OblykApi from '~/services/oblyk-api/OblykApi'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'AddGymRoutesToPublicationModal',
  mixins: [DateHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    postAddedMethod: {
      type: String,
      default: 'goToPublication'
    }
  },

  data () {
    return {
      dialog: false,
      loadingAdd: false,
      loadingDrafts: false,
      draftPublications: [],
      gymRouteIds: [],

      mdiClose,
      oblykArdoise,
      oblykArdoisePlus,
      mdiPlus
    }
  },

  methods: {
    openDialog (gymRouteIds) {
      this.gymRouteIds = gymRouteIds
      this.getDraftPublications()
      this.dialog = true
    },

    addOnPublication (publicationId) {
      this.loadingAdd = true
      const routeParams = this.gymRouteIds.map((routeId) => {
        return {
          attachable_type: 'GymRoute',
          attachable_id: routeId,
          publication_id: publicationId
        }
      })
      new OblykApi(this.$axios, this.$auth)
        .post(
          `/publications/${publicationId}/publication_attachments/create_bulk`,
          { publication_attachments: routeParams }
        )
        .then(() => {
          this.snackAndFinish(publicationId)
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
              publishable_id: this.gym.id
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
            publishable_id: this.gym.id
          })
        .then((resp) => {
          this.draftPublications = resp.data
        })
        .finally(() => {
          this.loadingDrafts = false
        })
    },

    snackAndFinish (publicationId) {
      const publicationPath = `${this.gym.app_path}/publications/${publicationId}/edit`
      const snackbarMessage = this.$tc('components.gymRoute.addToPublicationCount', this.gymRouteIds, { count: this.gymRouteIds.length })

      if (this.postAddedMethod === 'goToPublication') {
        this.$router.push(publicationPath)
        this.$store.dispatch('appSnackbarPusher/pushAppSnackbar', {
          message: snackbarMessage,
          color: 'success'
        })
      } else if (this.postAddedMethod === 'closeModal') {
        this.dialog = false
        this.loadingAdd = false
        this.$store.dispatch('appSnackbarPusher/pushAppSnackbar', {
          message: snackbarMessage,
          color: 'success',
          to: {
            path: publicationPath,
            text: this.$t('actions.see')
          }
        })
      }
    }
  }
}
</script>
