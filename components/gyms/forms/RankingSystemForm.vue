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
import RankingSystemInput from '~/components/forms/RankingSystemInput'
import GymApi from '~/services/oblyk-api/GymApi'

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
      data: {
        id: this.gym?.id,
        boulder_ranking: this.gym?.boulder_ranking,
        pan_ranking: this.gym?.pan_ranking,
        sport_climbing_ranking: this.gym?.sport_climbing_ranking
      }
    }
  },

  methods: {
    submit () {
      this.saving = true
      new GymApi(this.$axios, this.$auth)
        .update(this.data)
        .finally(() => {
          this.saving = false
          this.changes = false
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
    }
  }
}
</script>
