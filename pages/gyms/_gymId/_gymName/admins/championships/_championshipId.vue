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
                </v-list>
              </v-menu>
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
                :lazy-src="championship.thumbnailBannerUrl"
                :src="championship.bannerUrl"
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
  mdiPencil
} from '@mdi/js'
import { ChampionshipConcern } from '~/concerns/ChampionshipConcern'
import Spinner from '~/components/layouts/Spiner'
import ChampionshipBannerForm from '~/components/championships/forms/ChampionshipBannerForm'
import ChampionshipForm from '~/components/championships/forms/ChampionshipForm.vue'
const MarkdownText = () => import('~/components/ui/MarkdownText')

export default {
  components: {
    ChampionshipForm,
    ChampionshipBannerForm,
    MarkdownText,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [ChampionshipConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      coverModal: false,
      editModal: false,

      mdiTrophy,
      mdiEarth,
      mdiDatabase,
      mdiPodium,
      mdiDotsVertical,
      mdiPencil
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
    }
  }
}
</script>
