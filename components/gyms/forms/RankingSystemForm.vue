<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            {{ $t(`models.climbs.sport_climbing`) }}
          </v-card-title>
          <v-card-text class="pt-4">
            <ranking-system-input
              v-model="data.sport_climbing_ranking"
              hide-details
              @input="changes = true"
            />
            <div
              v-if="data.sport_climbing_ranking"
              class="mt-4"
              v-html="$t(`models.rankingSystemExplain.${data.sport_climbing_ranking}`)"
            />
            <p
              v-else
              class="text--disabled text-center mt-5"
            >
              {{ $t('components.gymRankingSystems.chooseSystem') }}
            </p>
            <div
              v-if="levels.sport_climbing && levels.sport_climbing.levels && data.sport_climbing_ranking === 'fixed_points'"
              class="mt-5 border-top pt-4"
            >
              <p>
                {{ $t('components.gymRanking.giveDefaultPoints') }}
              </p>
              <div
                v-for="(level, levelIndex) in levels.sport_climbing.levels"
                :key="`level-index-bouldering-${levelIndex}`"
                class="d-flex mb-2"
              >
                <v-icon
                  large
                  left
                  class="mt-1"
                  :color="level.color"
                >
                  {{ mdiCircle }}
                </v-icon>
                <v-text-field
                  v-model="level.default_point"
                  outlined
                  label="point par defaut"
                  hide-details
                  dense
                  type="number"
                  @input="changes = true"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            {{ $t(`models.climbs.bouldering`) }}
          </v-card-title>
          <v-card-text class="pt-4">
            <ranking-system-input
              v-model="data.boulder_ranking"
              hide-details
              @input="changes = true"
            />
            <div
              v-if="data.boulder_ranking"
              class="mt-4"
              v-html="$t(`models.rankingSystemExplain.${data.boulder_ranking}`)"
            />
            <p
              v-else
              class="text--disabled text-center mt-5"
            >
              {{ $t('components.gymRankingSystems.chooseSystem') }}
            </p>
            <div
              v-if="levels.bouldering && levels.bouldering.levels && data.boulder_ranking === 'fixed_points'"
              class="mt-5 border-top pt-4"
            >
              <p>
                {{ $t('components.gymRanking.giveDefaultPoints') }}
              </p>
              <div
                v-for="(level, levelIndex) in levels.bouldering.levels"
                :key="`level-index-bouldering-${levelIndex}`"
                class="d-flex mb-2"
              >
                <v-icon
                  large
                  left
                  class="mt-1"
                  :color="level.color"
                >
                  {{ mdiCircle }}
                </v-icon>
                <v-text-field
                  v-model="level.default_point"
                  outlined
                  label="point par defaut"
                  hide-details
                  dense
                  type="number"
                  @input="changes = true"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            {{ $t(`models.climbs.pan`) }}
          </v-card-title>
          <v-card-text class="pt-4">
            <ranking-system-input
              v-model="data.pan_ranking"
              hide-details
              @input="changes = true"
            />
            <div
              v-if="data.pan_ranking"
              class="mt-4"
              v-html="$t(`models.rankingSystemExplain.${data.pan_ranking}`)"
            />
            <p
              v-else
              class="text--disabled text-center mt-5"
            >
              {{ $t('components.gymRankingSystems.chooseSystem') }}
            </p>
            <div
              v-if="levels.pan && levels.pan.levels && data.pan_ranking === 'fixed_points'"
              class="mt-5 border-top pt-4"
            >
              <p>
                {{ $t('components.gymRanking.giveDefaultPoints') }}
              </p>
              <div
                v-for="(level, levelIndex) in levels.pan.levels"
                :key="`level-index-bouldering-${levelIndex}`"
                class="d-flex mb-2"
              >
                <v-icon
                  large
                  left
                  class="mt-1"
                  :color="level.color"
                >
                  {{ mdiCircle }}
                </v-icon>
                <v-text-field
                  v-model="level.default_point"
                  outlined
                  label="point par defaut"
                  hide-details
                  dense
                  type="number"
                  @input="changes = true"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-right mt-4">
      <v-btn
        text
        small
        @click="deleteRanking()"
      >
        {{ $t('components.gymRankingSystems.deleteSystem') }}
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        :loading="saving"
        :disabled="!changes"
        @click="submit()"
      >
        {{ $t('actions.save') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiCircle } from '@mdi/js'
import RankingSystemInput from '~/components/forms/RankingSystemInput'
import GymApi from '~/services/oblyk-api/GymApi'
import GymLevelApi from '~/services/oblyk-api/GymLevelApi'
import GymLevel from '~/models/GymLevel'

export default {
  name: 'RankingSystemForm',
  components: { RankingSystemInput },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      saving: false,
      changes: false,
      levelChanges: false,
      loadingLevel: true,
      levels: {},
      data: {
        id: this.gym?.id,
        boulder_ranking: this.gym?.boulder_ranking,
        pan_ranking: this.gym?.pan_ranking,
        sport_climbing_ranking: this.gym?.sport_climbing_ranking
      },

      mdiCircle
    }
  },

  mounted () {
    this.getLevels()
  },

  methods: {
    submit () {
      this.saving = true
      new GymApi(this.$axios, this.$auth)
        .update(this.data)
        .then(() => {
          new GymLevelApi(this.$axios, this.$auth)
            .updateAll(
              {
                gym_id: this.gym.id,
                sport_climbing: this.levels.sport_climbing,
                bouldering: this.levels.bouldering,
                pan: this.levels.pan
              }
            )
            .finally(() => {
              this.saving = false
              this.changes = false
            })
        })
    },

    deleteRanking () {
      this.data.boulder_ranking = null
      this.data.pan_ranking = null
      this.data.sport_climbing_ranking = null
      this.saving = true
      new GymApi(this.$axios, this.$auth)
        .update(this.data)
        .finally(() => {
          this.saving = false
          this.changes = false
        })
    },

    getLevels () {
      this.loadingLevel = false
      new GymLevelApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          this.levels = {
            bouldering: null,
            pan: null,
            sport_climbing: null
          }
          for (const level of resp.data) {
            this.levels[level.climbing_type] = new GymLevel({ attributes: level })
          }
        })
        .finally(() => {
          this.loadingLevel = false
        })
    }
  }
}
</script>
