<template>
  <div>
    <p class="mb-0 font-weight-bold">
      {{ $t('models.contestCombinedRanking.title') }} :
    </p>
    <v-radio-group
      v-model="combinedRakingType"
      class="mt-1"
      @change="onChange()"
    >
      <v-radio
        v-for="(rankingType, rankingTypeIndex) in rankingTypes"
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
            <br>
            <small v-html="rankingType.explain" />
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: 'CombinedRankingTypeInput',
  props: {
    value: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      rankingTypes: [
        {
          text: this.$t('models.contestCombinedRanking.type.addition'),
          explain: this.$t('models.contestCombinedRanking.explain.addition'),
          value: 'addition'
        },
        {
          text: this.$t('models.contestCombinedRanking.type.multiplication'),
          explain: this.$t('models.contestCombinedRanking.explain.multiplication'),
          value: 'multiplication'
        },
        {
          text: this.$t('models.contestCombinedRanking.type.decrement_points'),
          explain: this.$t('models.contestCombinedRanking.explain.decrement_points'),
          value: 'decrement_points'
        }
      ],
      combinedRakingType: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.combinedRakingType)
    }
  }
}
</script>
