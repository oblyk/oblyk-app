<template>
  <v-container style="min-height: 200vh">
    <spinner v-if="!contest" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <h1 class="mb-2">
        {{ contest.name }}
      </h1>
      <v-row>
        <v-col
          cols="12"
          lg="7"
          class="pr-lg-1"
        >
          <v-sheet class="pa-2 rounded full-height d-flex flex-column">
            <div>
              <v-row>
                <v-col cols="6">
                  <div class="border pa-2 px-3 mb-3 rounded">
                    <h3>Compétiteurs, Compétitrices</h3>
                    <p class="text-h4 text-lg-h2 my-4 font-weight-bold">
                      {{ contest.contest_participants_count || 0 }} <small class="font-weight-regular"> / {{ contest.total_capacity || '∞' }}</small>
                    </p>
                  </div>
                </v-col>
                <v-col cols="6">
                  <description-line
                    class="mb-4"
                    :item-title="$t('models.contest.start_date')"
                  >
                    <template #content>
                      <v-chip
                        small
                        @click="openEditModal()"
                      >
                        {{ humanizeDate(contest.start_date) }}
                      </v-chip>
                    </template>
                  </description-line>
                  <description-line
                    v-if="contest.start_date !== contest.end_date"
                    class="mb-4"
                    :item-title="$t('models.contest.end_date')"
                  >
                    <template #content>
                      <v-chip
                        small
                        @click="openEditModal()"
                      >
                        {{ humanizeDate(contest.end_date) }}
                      </v-chip>
                    </template>
                  </description-line>
                  <description-line
                    item-title="Période d'inscription"
                  >
                    <template #content>
                      <v-chip
                        small
                        @click="openEditModal()"
                      >
                        {{ humanizeDate(contest.subscription_start_date, 'DATE_SHORT') }} au {{ humanizeDate(contest.subscription_end_date, 'DATE_SHORT') }}
                      </v-chip>
                    </template>
                  </description-line>
                </v-col>
              </v-row>
              <description-line
                :item-title="$t('models.contest.categorization_type')"
                :item-value="$t(`models.contestCategoryType.${contest.categorization_type}`)"
              />
              <p class="text-decoration-underline mb-1 mt-4">
                Présentation du contest :
              </p>
              <div
                v-if="contest.description"
                class="pa-2 rounded-sm back-app-color d-flex align-end"
              >
                <div>
                  <markdown-text :text="contest.description" />
                </div>
                <div class="ml-auto">
                  <v-btn
                    icon
                    small
                    @click="openEditModal()"
                  >
                    <v-icon small>
                      {{ mdiPencil }}
                    </v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="rounded-sm border pa-2 mt-2">
                <p
                  v-if="contest.team_contest"
                  class="mb-0"
                >
                  {{ $t('models.contest.participant_per_team') }}:
                  <v-chip
                    small
                    @click="openEditModal()"
                  >
                    {{ contest.participant_per_team }}
                  </v-chip>
                </p>
                <p class="mb-0">
                  {{ $t('models.contest.authorise_public_subscription') }}:
                  <v-chip
                    small
                    @click="openEditModal()"
                  >
                    {{ contest.authorise_public_subscription ? 'oui' : 'non' }}
                  </v-chip>
                </p>
                <p class="mb-0">
                  {{ $t('models.contest.private') }}:
                  <v-chip
                    small
                    @click="openEditModal()"
                  >
                    {{ contest.private ? 'oui' : 'non' }}
                  </v-chip>
                </p>
                <p class="mb-0">
                  {{ $t('models.contest.hide_results') }}:
                  <v-chip
                    small
                    @click="openEditModal()"
                  >
                    {{ contest.hide_results ? 'oui' : 'non' }}
                  </v-chip>
                </p>
                <p class="mb-0">
                  {{ $t('models.contest.optional_gender') }}:
                  <v-chip
                    small
                    @click="openEditModal()"
                  >
                    {{ contest.optional_gender ? 'oui' : 'non' }}
                  </v-chip>
                </p>
              </div>
              <v-alert
                v-if="contest.archived_at !== null"
                text
                type="info"
                class="mt-3"
              >
                <div class="d-flex">
                  <div>Contest archivé.</div>
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
              <v-alert
                v-if="contest.draft && contest.archived_at === null"
                text
                type="warning"
                class="mt-4"
              >
                Ce contest n'est pas publié. Publiez-le quand vous aurez fini de le paramétrer.
                <div class="text-center mt-2">
                  <v-btn
                    :loading="loadingPublish"
                    outlined
                    small
                    color="amber darken-3"
                    @click="draft(false)"
                  >
                    <v-icon left>
                      {{ mdiPublish }}
                    </v-icon>
                    {{ $t('actions.publish') }}
                  </v-btn>
                </div>
              </v-alert>
            </div>
            <div class="text-right mt-auto pt-2">
              <v-btn
                outlined
                text
                :to="contest.path"
              >
                <v-icon left>
                  {{ mdiEarth }}
                </v-icon>
                Page publique
              </v-btn>
              <contest-tombola :contest="contest" />
              <v-btn
                outlined
                text
                :to="contest.rankersPath"
              >
                <v-icon
                  left
                  color="red"
                >
                  {{ mdiRecord }}
                </v-icon>
                Résultat en direct
              </v-btn>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn
                    :loading="loadingAction"
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
                  <v-list-item @click="openEditModal()">
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiPencil }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('actions.edit') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="contestQrCode()"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiQrcode }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      Télécharger le QrCode du contest
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider />
                  <v-list-item
                    v-if="contest.draft"
                    @click="draft(false)"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiPublish }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ $t('actions.publish') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-else
                    @click="draft(true)"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiPublishOff }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="red--text">
                      {{ $t('actions.unPublish') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="contest.archived_at === null"
                    @click="archived(contest.archived_at === null)"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiBookshelf }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="red--text">
                      {{ contest.archived_at === null ? $t('actions.archive') : $t('actions.unArchive') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-else
                    @click="archived(true)"
                  >
                    <v-list-item-icon>
                      <v-icon>
                        {{ mdiPublishOff }}
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="red--text">
                      {{ $t('actions.unPublish') }}
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
                    Modifier {{ contest.name }}
                  </v-card-title>
                  <div class="px-4 pb-4">
                    <contest-form
                      :gym="contest.gym"
                      :contest="contest"
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
                    Supprimer - {{ contest.name }}
                  </v-card-title>
                  <div class="px-4 pb-4">
                    <div
                      v-if="!contest.draft"
                      class="text-center my-4 text--disabled"
                    >
                      Vous ne pouvez pas supprimer un contest publié.
                    </div>
                    <div v-else>
                      <p>
                        Vous êtes sur le point de supprimer <strong>{{ contest.name }}</strong>.<br>
                        Votre contest ne sera plus accéssible ni par vous, ni par les participant·e·s.
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
                          @click="deleteContest()"
                        >
                          {{ $t('actions.delete') }}
                        </v-btn>
                      </div>
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
                v-if="contest.attachments.banner.attached"
                :lazy-src="imageVariant(contest.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
                :src="imageVariant(contest.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })"
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
                    <contest-banner-form
                      :contest="contest"
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
          :to="contest.adminPath"
        >
          <v-icon left>
            {{ mdiDatabase }}
          </v-icon>
          Structure
        </v-tab>
        <v-tab
          exact-path
          :to="`${contest.adminPath}/time-line`"
        >
          <v-icon left>
            {{ mdiTimelineClock }}
          </v-icon>
          Programme
        </v-tab>
        <v-tab
          exact-path
          :to="`${contest.adminPath}/participants`"
        >
          <v-icon left>
            {{ mdiAccountMultiple }}
          </v-icon>
          Participant·e·s
        </v-tab>
        <v-tab
          v-if="contest.team_contest"
          exact-path
          :to="`${contest.adminPath}/teams`"
        >
          <v-icon left>
            {{ mdiAccountGroup }}
          </v-icon>
          Équipes
        </v-tab>
        <v-tab
          exact-path
          :to="`${contest.adminPath}/results`"
        >
          <v-icon left>
            {{ mdiPodium }}
          </v-icon>
          Résultats
        </v-tab>
        <v-tab
          exact-path
          :to="`${contest.adminPath}/statistics`"
        >
          <v-icon left>
            {{ mdiChartLine }}
          </v-icon>
          Stats
        </v-tab>
      </v-tabs>
      <nuxt-child
        :key="$route.params.contestId"
        :contest="contest"
        :edit-contest-modal="openEditModal"
      />
    </div>
  </v-container>
</template>

<script>
import {
  mdiTrophy,
  mdiEarth,
  mdiTimelineClock,
  mdiDatabase,
  mdiAccountMultiple,
  mdiPodium,
  mdiPublish,
  mdiPublishOff,
  mdiDotsVertical,
  mdiPencil,
  mdiRecord,
  mdiQrcode,
  mdiDelete,
  mdiBookshelf,
  mdiAccountGroup,
  mdiChartLine
} from '@mdi/js'
import { ContestConcern } from '~/concerns/ContestConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import Spinner from '~/components/layouts/Spiner'
import DescriptionLine from '~/components/ui/DescriptionLine'
import MarkdownText from '~/components/ui/MarkdownText'
import ContestForm from '~/components/contests/forms/ContestForm.vue'
import ContestBannerForm from '~/components/contests/forms/ContestBannerForm.vue'
import ContestApi from '~/services/oblyk-api/ContestApi'
import ToolApi from '~/services/oblyk-api/ToolApi'
import ContestTombola from '~/components/contests/ContestTombola.vue'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  components: {
    ContestTombola,
    ContestBannerForm,
    ContestForm,
    MarkdownText,
    DescriptionLine,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [ContestConcern, DateHelpers, ImageVariantHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      editModal: false,
      deleteModal: false,
      coverModal: false,
      loadingPublish: false,
      unlockWord: null,
      loadingAction: false,
      loadingArchive: false,

      mdiTrophy,
      mdiEarth,
      mdiTimelineClock,
      mdiDatabase,
      mdiAccountMultiple,
      mdiPodium,
      mdiPublish,
      mdiPublishOff,
      mdiDotsVertical,
      mdiPencil,
      mdiRecord,
      mdiQrcode,
      mdiDelete,
      mdiBookshelf,
      mdiAccountGroup,
      mdiChartLine
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.contest?.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.contest?.Gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.contests'),
          to: `${this.contest?.Gym?.adminPath}/contests`,
          exact: true
        },
        {
          text: this.contest?.name,
          to: this.contest?.adminPath,
          exact: true
        }
      ]
    }
  },

  methods: {
    successEdit () {
      window.location.reload()
    },

    openEditModal () {
      this.editModal = true
    },

    draft (draft) {
      this.loadingPublish = true
      new ContestApi(this.$axios, this.$auth)
        .draft(this.contest.gym_id, this.contest.id, draft)
        .then(() => {
          window.location.reload()
        })
        .catch(() => {
          this.loadingPublish = false
        })
    },

    archived (archived) {
      if (!archived || confirm('Êtes vous sûr de vouloir archiver ce contest ?')) {
        if (archived) {
          this.loadingAction = true
        } else {
          this.loadingArchive = true
        }
        new ContestApi(this.$axios, this.$auth)
          .archived(this.contest.gym_id, this.contest.id, archived)
          .then(() => {
            if (archived) {
              this.$router.push(`${this.contest.Gym.adminPath}/contests`)
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

    deleteContest () {
      this.loadingAction = true
      this.deleteModal = false
      new ContestApi(this.$axios, this.$auth)
        .delete(this.contest.gym_id, this.contest.id)
        .then(() => {
          this.$router.push(`${this.contest.Gym.adminPath}/contests`)
        })
        .catch(() => {
          this.loadingAction = false
        })
    },

    contestQrCode () {
      new ToolApi(this.$axios, this.$auth)
        .qrCoder({ message: `${process.env.VUE_APP_OBLYK_APP_URL}${this.contest.path}` })
        .then((resp) => {
          const url = window.URL.createObjectURL(new Blob([resp.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `qr-code-${this.contest.slug_name}.svg`)
          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
</script>
