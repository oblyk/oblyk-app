<template>
  <v-input>
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-0 px-2">
      <legend class="v-label custom-fieldset-label">
        Quel système de compte de point souhaitez-vous utiliser ?
      </legend>
      <v-radio-group
        v-model="category"
        class="mt-1 pb-0"
        hide-details
        @change="onChange()"
      >
        <v-radio
          v-for="(rankingType, rankingTypeIndex) in contestRankingTypes"
          :key="`ranking-type-index-${rankingTypeIndex}`"
          :label="rankingType.text"
          :value="rankingType.value"
          class="mb-2 border rounded pa-2"
        >
          <template #label>
            <div class="pl-3">
              <strong>
                {{ rankingType.text }}
              </strong>
              <div>
                <small v-html="rankingType.explain" />
              </div>
              <v-chip
                v-if="rankingType.recommendation"
                class="font-weight-medium"
              >
                <v-icon
                  left
                  small
                  class="mr-2"
                >
                  {{ mdiCreation }}
                </v-icon>
                {{ rankingType.recommendation }}
              </v-chip>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiCreation } from '@mdi/js'

export default {
  name: 'ContestRankingInput',
  props: {
    value: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      contestRankingTypes: [
        {
          text: this.$t('models.contestRankingType.division'),
          value: 'division',
          explain: this.$t('models.contestRankingTypeExplain.division')
        },
        {
          text: this.$t('models.contestRankingType.division_and_zone'),
          value: 'division_and_zone',
          explain: this.$t('models.contestRankingTypeExplain.division_and_zone'),
          recommendation: 'Conseillé pour les qualifications de bloc !'
        },
        {
          text: this.$t('models.contestRankingType.division_and_attempt'),
          value: 'division_and_attempt',
          explain: this.$t('models.contestRankingTypeExplain.division_and_attempt')
        },
        {
          text: this.$t('models.contestRankingType.attempts_to_top'),
          value: 'attempts_to_top',
          explain: this.$t('models.contestRankingTypeExplain.attempts_to_top')
        },
        {
          text: this.$t('models.contestRankingType.zone_and_top_realised'),
          value: 'zone_and_top_realised',
          explain: this.$t('models.contestRankingTypeExplain.zone_and_top_realised')
        },
        {
          text: this.$t('models.contestRankingType.attempts_to_one_zone_and_top'),
          value: 'attempts_to_one_zone_and_top',
          explain: this.$t('models.contestRankingTypeExplain.attempts_to_one_zone_and_top'),
          recommendation: 'Conseillé pour les finales de bloc !'
        },
        {
          text: this.$t('models.contestRankingType.highest_hold'),
          value: 'highest_hold',
          explain: this.$t('models.contestRankingTypeExplain.highest_hold'),
          recommendation: 'Conseillé pour la voie ! (finale ou qualification)'
        },
        {
          text: this.$t('models.contestRankingType.fixed_points'),
          value: 'fixed_points',
          explain: this.$t('models.contestRankingTypeExplain.fixed_points')
        },
        {
          text: this.$t('models.contestRankingType.point_relative_to_highest_hold'),
          value: 'point_relative_to_highest_hold',
          explain: this.$t('models.contestRankingTypeExplain.point_relative_to_highest_hold')
        },
        {
          text: this.$t('models.contestRankingType.best_times'),
          value: 'best_times',
          explain: this.$t('models.contestRankingTypeExplain.best_times'),
          recommendation: 'Conseillé pour la vitesse !'
        }
      ],
      category: this.value,

      mdiCreation
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.category)
    }
  }
}
</script>
