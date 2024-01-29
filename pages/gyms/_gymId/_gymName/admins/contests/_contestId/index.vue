<template>
  <div class="mt-2">
    <!-- Categories -->
    <div class="d-flex mt-6 mb-4 border-bottom">
      <h2>
        Les catégories
      </h2>
      <v-spacer />
      <add-contest-category-btn
        ref="add-category-btn"
        :contest="contest"
        :callback="successSaveCategory"
        :show-category-name-tips="categories.length === 0"
      />
      <v-btn
        :loading="loadingCategories"
        icon
        @click="getCategories()"
      >
        <v-icon>
          {{ mdiRefresh }}
        </v-icon>
      </v-btn>
    </div>
    <v-row v-if="categories.length > 0">
      <v-col
        v-for="(category, categoryIndex) in categories"
        :key="`category-index-${categoryIndex}`"
        cols="12"
        lg="3"
        class="align-stretch"
      >
        <contest-category-card
          :contest="contest"
          :contest-category="category"
          :get-categories="successSaveCategory"
        />
      </v-col>
    </v-row>
    <p
      v-if="categories.length === 0"
      class="text-center text--disabled my-5"
    >
      Cliquer sur "Ajouter" pour ajouter une catégorie
    </p>

    <!-- Waves -->
    <div v-if="showWaves">
      <div class="d-flex mt-6 mb-4 border-bottom">
        <h2>
          Les vagues
        </h2>
        <v-spacer />
        <add-contest-wave-btn
          :contest="contest"
          :callback="getWaves"
        />
        <v-btn
          :loading="loadingWaves"
          icon
          @click="getWaves()"
        >
          <v-icon>
            {{ mdiRefresh }}
          </v-icon>
        </v-btn>
      </div>
      <v-row v-if="waves.length > 0">
        <v-col
          v-for="(wave, waveIndex) in waves"
          :key="`wave-index-${waveIndex}`"
          cols="12"
          lg="4"
          class="align-stretch"
        >
          <contest-wave-card
            :key="`wave-card-${waveIndex}`"
            :contest="contest"
            :contest-wave="wave"
            :get-waves="getWaves"
          />
        </v-col>
      </v-row>
      <p
        v-else
        class="text-center text--disabled my-5"
      >
        Cliquer sur "Ajouter" pour ajouter une vague
      </p>
    </div>

    <!-- Contest stages -->
    <div v-if="showStages">
      <div class="d-flex mt-6 mb-4 border-bottom">
        <h2>
          Les épreuves
        </h2>
      </div>

      <!-- If combined -->
      <v-sheet
        v-if="stages.length > 1"
        class="pa-4 rounded mb-4"
      >
        <div class="mb-2">
          <strong>
            Type de classement du combiné :
          </strong>
          <v-menu>
            <template #activator="{ on, attrs }">
              <v-btn
                text
                outlined
                small
                :loading="loadingRankingType"
                v-bind="attrs"
                v-on="on"
              >
                {{ $t(`models.contestCombinedRanking.type.${contest.combined_ranking_type}`) }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="updateCombinedRankingType('addition')">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon
                      class="vertical-align-text-bottom ml-1"
                      :color="contest.combined_ranking_type === 'addition' ? 'primary' : null"
                    >
                      {{ contest.combined_ranking_type === 'addition' ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    {{ $t('models.contestCombinedRanking.type.addition') }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="--full-subtitle"
                    v-html="$t('models.contestCombinedRanking.explain.addition')"
                  />
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="updateCombinedRankingType('multiplication')">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon
                      class="vertical-align-text-bottom ml-1"
                      :color="contest.combined_ranking_type === 'multiplication' ? 'primary' : null"
                    >
                      {{ contest.combined_ranking_type === 'multiplication' ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    {{ $t('models.contestCombinedRanking.type.multiplication') }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="--full-subtitle"
                    v-html="$t('models.contestCombinedRanking.explain.multiplication')"
                  />
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="updateCombinedRankingType('decrement_points')">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon
                      class="vertical-align-text-bottom ml-1"
                      :color="contest.combined_ranking_type === 'decrement_points' ? 'primary' : null"
                    >
                      {{ contest.combined_ranking_type === 'decrement_points' ? mdiRadioboxMarked : mdiRadioboxBlank }}
                    </v-icon>
                    {{ $t('models.contestCombinedRanking.type.decrement_points') }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="--full-subtitle"
                    v-html="$t('models.contestCombinedRanking.explain.decrement_points')"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <p
            class="text--disabled mt-2 mb-0"
            v-html="$t(`models.contestCombinedRanking.explain.${contest.combined_ranking_type}`)"
          />
        </div>
      </v-sheet>
      <div class="d-flex mt-2">
        <v-tabs
          v-if="stages.length > 0"
          v-model="stageTab"
          class="rounded-sm mt-n2 mb-2"
        >
          <v-tab
            v-for="(contestStage, stageIndex) in stages"
            :key="`stage-index-${stageIndex}`"
            @click="getStage(contestStage.id)"
          >
            {{ $t(`models.climbs.${contestStage.climbing_type}`) }}
          </v-tab>
        </v-tabs>
        <div class="text-no-wrap pl-2">
          <add-contest-stage-btn
            :contest="contest"
            :callback="getStages"
            :disabled="stages.length > 1"
          />
        </div>
      </div>
      <div>
        <contest-stage-card
          v-if="!loadingStage && stage"
          :contest="contest"
          :contest-stage="stage"
          :get-stages="getStages"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mdiRefresh, mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'
import ContestCategory from '~/models/ContestCategory'
import AddContestCategoryBtn from '~/components/contests/btns/AddContestCategoryBtn'
import ContestCategoryCard from '~/components/contests/ContestCategoryCard'
import ContestStageApi from '~/services/oblyk-api/ContestStageApi'
import ContestStage from '~/models/ContestStage'
import AddContestStageBtn from '~/components/contests/btns/AddContestStageBtn'
import ContestStageCard from '~/components/contests/ContestStageCard'
import ContestWaveApi from '~/services/oblyk-api/ContestWaveApi'
import ContestWave from '~/models/ContestWave'
import ContestWaveCard from '~/components/contests/ContestWaveCard'
import AddContestWaveBtn from '~/components/contests/btns/AddContestWaveBtn'
import ContestApi from '~/services/oblyk-api/ContestApi'

export default {
  components: {
    AddContestWaveBtn,
    ContestWaveCard,
    ContestStageCard,
    AddContestStageBtn,
    ContestCategoryCard,
    AddContestCategoryBtn
  },
  meta: { orphanRoute: true },
  mixins: [DateHelpers],
  middleware: ['auth', 'gymAdmin'],

  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      firstLoad: true,

      categories: [],
      loadingCategories: true,

      waves: [],
      loadingWaves: true,

      stageTab: 0,
      stages: [],
      loadingStages: true,

      stage: null,
      loadingStage: true,

      routes: [],
      loadingRoutes: true,

      loadingRankingType: false,

      mdiRefresh,
      mdiRadioboxBlank,
      mdiRadioboxMarked
    }
  },

  computed: {
    showWaves () {
      if (this.waves.length > 0) {
        return true
      }
      const waveableCategories = this.categories.filter(category => category.waveable)

      return waveableCategories.length > 0
    },

    showStages () {
      if (this.waves.length > 0) {
        return true
      }
      const waveableCategories = this.categories.filter(category => category.waveable)
      return this.categories.length >= 1 && waveableCategories.length === 0
    }
  },

  mounted () {
    this.getCategories()
    this.getWaves()
    this.getStages()
  },

  methods: {
    getStages (latest = false) {
      this.loadingStages = true
      new ContestStageApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.stages = []
          this.stage = null
          for (const stage of resp.data) {
            this.stages.push(new ContestStage({ attributes: stage }))
          }
          if (this.firstLoad && this.stages.length > 0) {
            this.getStage(this.stages[0].id)
            this.firstLoad = false
          }
          if (latest) {
            this.getStage(this.stages[this.stages.length - 1].id)
            this.stageTab = this.stages.length - 1
          }
        })
        .finally(() => {
          this.loadingStages = false
        })
    },

    getStage (stageId) {
      this.loadingStage = true
      new ContestStageApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.contestId,
          stageId
        )
        .then((resp) => {
          this.stage = new ContestStage({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingStage = false
        })
    },

    successSaveCategory () {
      this.getCategories()
      if (this.stage) {
        this.getStage(this.stage.id)
      }
    },

    getCategories () {
      this.loadingCategories = true
      new ContestCategoryApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.categories = []
          for (const category of resp.data) {
            this.categories.push(new ContestCategory({ attributes: category }))
          }
        })
        .finally(() => {
          this.loadingCategories = false
        })
    },

    getWaves () {
      this.loadingWaves = true
      new ContestWaveApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.waves = []
          for (const category of resp.data) {
            this.waves.push(new ContestWave({ attributes: category }))
          }
        })
        .finally(() => {
          this.loadingWaves = false
        })
    },

    updateCombinedRankingType (combinedRankingType) {
      this.loadingRankingType = true
      new ContestApi(this.$axios, this.$auth)
        .update({
          id: this.contest.id,
          gym_id: this.contest.gym_id,
          combined_ranking_type: combinedRankingType
        })
        .finally(() => {
          location.reload()
        })
    }
  }
}
</script>
