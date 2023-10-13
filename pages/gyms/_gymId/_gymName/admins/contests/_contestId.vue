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
        >
          <v-sheet class="pa-2 rounded full-height d-flex flex-column">
            <div>
              <v-row>
                <v-col cols="6">
                  <div class="border pa-2 px-3 mb-3 rounded">
                    <h3>Compétiteurs, Compétitrices</h3>
                    <p class="text-h4 text-lg-h2 my-4 font-weight-bold">
                      {{ contest.contest_participants_count || 0 }} <small class="font-weight-regular"> / {{ contest.total_capacity }}</small>
                    </p>
                  </div>
                </v-col>
                <v-col cols="6">
                  <description-line
                    class="mb-4"
                    :item-title="$t('models.contest.start_date')"
                    :item-value="humanizeDate(contest.start_date)"
                  />
                  <description-line
                    v-if="contest.start_date !== contest.end_date"
                    class="mb-4"
                    :item-title="$t('models.contest.end_date')"
                    :item-value="humanizeDate(contest.end_date)"
                  />
                  <description-line
                    item-title="Période d'inscription"
                    :item-value="`du ${humanizeDate(contest.subscription_start_date, 'DATE_SHORT')} au ${humanizeDate(contest.subscription_end_date, 'DATE_SHORT')}`"
                  />
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
                class="pa-2 rounded-sm back-app-color"
              >
                <markdown-text :text="contest.description" />
              </div>
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
              <v-btn
                outlined
                text
                @click="openEditModal()"
              >
                {{ $t('actions.edit') }}
              </v-btn>
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
            </div>
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          lg="5"
        >
          <v-sheet class="pa-2 rounded full-height d-flex flex-column">
            <div>
              <v-img
                v-if="contest.banner"
                :lazy-src="contest.thumbnailBannerUrl"
                :src="contest.bannerUrl"
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
          exact-path
          :to="`${contest.adminPath}/results`"
        >
          <v-icon left>
            {{ mdiPodium }}
          </v-icon>
          Résultats
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
import { mdiTrophy, mdiEarth, mdiTimelineClock, mdiDatabase, mdiAccountMultiple, mdiPodium } from '@mdi/js'
import { ContestConcern } from '~/concerns/ContestConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import Spinner from '~/components/layouts/Spiner'
import DescriptionLine from '~/components/ui/DescriptionLine'
import MarkdownText from '~/components/ui/MarkdownText'
import ContestForm from '~/components/contests/forms/ContestForm.vue'
import ContestBannerForm from '~/components/contests/forms/ContestBannerForm.vue'

export default {
  components: {
    ContestBannerForm,
    ContestForm,
    MarkdownText,
    DescriptionLine,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [ContestConcern, DateHelpers],

  data () {
    return {
      editModal: false,
      coverModal: false,

      mdiTrophy,
      mdiEarth,
      mdiTimelineClock,
      mdiDatabase,
      mdiAccountMultiple,
      mdiPodium
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
    }
  }
}
</script>
