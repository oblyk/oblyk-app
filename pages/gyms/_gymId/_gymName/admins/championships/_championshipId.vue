<template>
  <v-container>
    <spinner v-if="!championship" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <h1 class="mb-2">
        {{ championship.name }}
      </h1>
      <v-row>
        <v-col
          cols="12"
          lg="7"
          class="pr-lg-1"
        >
          <v-sheet class="pa-2 rounded full-height d-flex flex-column">
            <div>
              <p class="text-decoration-underline mb-1 mt-4">
                Présentation du championnat :
              </p>
              <div
                v-if="championship.description"
                class="pa-2 rounded-sm back-app-color"
              >
                <markdown-text :text="championship.description" />
              </div>
              <div>
                <p class="text-decoration-underline mt-4 mb-1">
                  {{ $t('models.contestCombinedRanking.title') }} :
                </p>
                <div class="pl-3">
                  <p class="mb-0">
                    {{ $t(`models.contestCombinedRanking.type.${championship.combined_ranking_type}`) }}
                  </p>
                  <p class="mb-0">
                    <small v-html="$t(`models.contestCombinedRanking.explain.${championship.combined_ranking_type}`)" />
                  </p>
                </div>
              </div>
            </div>
            <v-alert
              v-if="championship.archived_at !== null"
              text
              type="info"
              class="mt-3"
            >
              <div class="d-flex">
                <div>Championnats archivé.</div>
                <v-btn
                  :loading="loadingArchive"
                  outlined
                  small
                  light
                  class="ml-auto"
                  @click="archived(false)"
                >
                  <v-icon left>
                    {{ mdiBookshelf }}
                  </v-icon>
                  {{ $t('actions.unArchive') }}
                </v-btn>
              </div>
            </v-alert>
            <div class="text-right mt-auto pt-2">
              <v-btn
                outlined
                text
                :to="championship.path"
              >
                <v-icon left>
                  {{ mdiEarth }}
                </v-icon>
                Page publique
              </v-btn>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn
                    outlined
                    text
                    :loading="loadingAction"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Plus
                    <v-icon right>
                      {{ mdiDotsVertical }}
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editModal = true">
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiPencil }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('actions.edit') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider />
                  <v-list-item
                    v-if="championship.archived_at === null"
                    @click="archived(championship.archived_at === null)"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiBookshelf }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="red--text">
                      {{ championship.archived_at === null ? $t('actions.archive') : $t('actions.unArchive') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="deleteModal = true"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiDelete }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="red--text">
                      {{ $t('actions.delete') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- Edit modal -->
              <v-dialog
                v-model="editModal"
                width="700"
              >
                <v-card>
                  <v-card-title>
                    Modifier {{ championship.name }}
                  </v-card-title>
                  <div class="px-4 pb-4">
                    <championship-form
                      :gym="championship.gym"
                      :championship="championship"
                      :callback="successEdit"
                      submit-methode="put"
                    />
                  </div>
                </v-card>
              </v-dialog>

              <!-- Delete modal -->
              <v-dialog
                v-model="deleteModal"
                width="700"
              >
                <v-card>
                  <v-card-title>
                    Supprimer - {{ championship.name }}
                  </v-card-title>
                  <div class="px-4 pb-4">
                    <p>
                      Vous êtes sur le point de supprimer <strong>{{ championship.name }}</strong>.<br>
                      Votre championnat ne sera plus accéssible ni par vous, ni par les participant·e·s.
                    </p>
                    <p class="red--text font-weight-bold text-center">
                      Aucun retour n'est possible !
                    </p>
                    <v-text-field
                      v-model="unlockWord"
                      outlined
                      class="mt-4"
                      :label="`Tapez : '${$t('actions.delete').toLowerCase()}' pour déverrouiller la suppression`"
                    />
                    <div class="text-right">
                      <v-btn
                        elevation="0"
                        :disabled="unlockWord === null || $t('actions.delete').toLowerCase() !== unlockWord.toLowerCase()"
                        color="red"
                        class="white--text"
                        @click="deleteChampionship()"
                      >
                        {{ $t('actions.delete') }}
                      </v-btn>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </v-sheet>
        </v-col>

        <!-- Cover part -->
        <v-col
          cols="12"
          lg="5"
          class="pl-lg-1"
        >
          <v-sheet class="pa-2 rounded full-height d-flex flex-column">
            <div>
              <v-img
                v-if="championship.banner"
                :lazy-src="imageVariant(championship.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
                :src="imageVariant(championship.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })"
                class="rounded-sm"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
              <div
                v-else
                class="text-center py-5"
              >
                <v-icon large>
                  {{ mdiTrophy }}
                </v-icon>
              </div>
            </div>
            <div class="mt-auto pt-2">
              <v-btn
                outlined
                class="rounded-sm"
                block
                text
                @click="coverModal = true"
              >
                {{ $t('actions.uploadIllustration') }}
              </v-btn>
              <v-dialog
                v-model="coverModal"
                width="500"
              >
                <v-card>
                  <v-card-title>
                    {{ $t('actions.uploadIllustration') }}
                  </v-card-title>
                  <div class="px-4 pb-4">
                    <championship-banner-form
                      :championship="championship"
                      :callback="successEdit"
                    />
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- Tabs -->
      <v-tabs
        id="contest-tabs"
        class="rounded mt-2"
      >
        <v-tab
          exact-path
          :to="championship.adminPath"
        >
          <v-icon left>
            {{ mdiDatabase }}
          </v-icon>
          Contests
        </v-tab>
        <v-tab
          exact-path
          :to="`${championship.adminPath}/results`"
        >
          <v-icon left>
            {{ mdiPodium }}
          </v-icon>
          Résultats
        </v-tab>
      </v-tabs>
      <nuxt-child
        :key="$route.params.championshipId"
        :championship="championship"
      />
    </div>
  </v-container>
</template>

<script>
import {
  mdiTrophy,
  mdiEarth,
  mdiDatabase,
  mdiPodium,
  mdiDotsVertical,
  mdiPencil,
  mdiBookshelf,
  mdiDelete
} from '@mdi/js'
import { ChampionshipConcern } from '~/concerns/ChampionshipConcern'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import Spinner from '~/components/layouts/Spiner'
import ChampionshipBannerForm from '~/components/championships/forms/ChampionshipBannerForm'
import ChampionshipForm from '~/components/championships/forms/ChampionshipForm'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
const MarkdownText = () => import('~/components/ui/MarkdownText')

export default {
  components: {
    ChampionshipForm,
    ChampionshipBannerForm,
    MarkdownText,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [ChampionshipConcern, ImageVariantHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      coverModal: false,
      editModal: false,
      deleteModal: false,
      loadingArchive: false,
      loadingAction: false,
      unlockWord: null,

      mdiTrophy,
      mdiEarth,
      mdiDatabase,
      mdiPodium,
      mdiDotsVertical,
      mdiPencil,
      mdiBookshelf,
      mdiDelete
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.championship?.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.championship?.Gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.championships'),
          to: `${this.championship?.Gym?.adminPath}/championships`,
          exact: true
        },
        {
          text: this.championship?.name,
          to: this.championship?.adminPath,
          exact: true
        }
      ]
    }
  },

  methods: {
    successEdit () {
      window.location.reload()
    },

    archived (archived) {
      if (!archived || confirm('Êtes vous sûr de vouloir archiver ce championnat ?')) {
        if (archived) {
          this.loadingAction = true
        } else {
          this.loadingArchive = true
        }
        new ChampionshipApi(this.$axios, this.$auth)
          .archived(this.championship.gym_id, this.championship.id, archived)
          .then(() => {
            if (archived) {
              this.$router.push(`${this.championship.Gym.adminPath}/championships`)
            } else {
              window.location.reload()
            }
          })
          .catch(() => {
            if (archived) {
              this.loadingAction = false
            } else {
              this.loadingArchive = false
            }
          })
      }
    },

    deleteChampionship () {
      this.loadingAction = true
      this.deleteModal = false
      new ChampionshipApi(this.$axios, this.$auth)
        .delete(this.championship.gym_id, this.championship.id)
        .then(() => {
          this.$router.push(`${this.championship.Gym.adminPath}/championships`)
        })
        .catch(() => {
          this.loadingAction = false
        })
    }
  }
}
</script>
