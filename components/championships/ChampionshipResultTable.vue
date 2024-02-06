<template>
  <div>
    <div v-if="firstLoad">
      <v-skeleton-loader type="table-heading" />
    </div>
    <div v-if="!firstLoad && results">
      <v-sheet
        v-for="(category, categoryIndex) in results.championship_results"
        :key="`category-${categoryIndex}`"
        class="rounded px-4 py-1 mb-4"
      >
        <div class="d-flex">
          <p class="font-weight-bold mb-1 pl-1 pt-2">
            {{ category.category_name }} - {{ $t(`models.genres.${category.genre}`).toLowerCase() }}
          </p>
          <v-spacer />
          <v-btn
            icon
            :loading="loadingResult"
            @click="getResults"
          >
            <v-icon>
              {{ mdiRefresh }}
            </v-icon>
          </v-btn>
        </div>
        <v-simple-table
          dense
          class="border mb-4"
        >
          <thead>
            <tr>
              <th
                rowspan="2"
                class="border-bottom vertical-align-bottom pb-2"
              >
                Classement
              </th>
              <th
                rowspan="2"
                class="border-bottom vertical-align-bottom pb-2"
              >
                {{ competitorLabel(category) }}
              </th>
              <th
                v-for="(contest, contestIndex) in contests"
                :key="`contest-header-index-${contestIndex}`"
                class="border-bottom"
              >
                <div class="d-flex">
                  <div class="pt-1">
                    <v-avatar size="28">
                      <v-img :src="contest.thumbnailBannerUrl" />
                    </v-avatar>
                  </div>
                  <div class="ml-auto flex-grow-1 text-center">
                    <nuxt-link :to="contest.path">
                      {{ contest.name }}
                    </nuxt-link><br>
                    <small>
                      {{ contest.gym.name }}
                    </small>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participant, participantIndex) in category.participants"
              :key="`participant-${participantIndex}`"
            >
              <td
                class="border-right"
                :title="participant.rank_point"
              >
                <strong>
                  {{ participant.global_rank }}
                </strong>
                <small>
                  {{ Math.round(participant.rank_point) }} pts
                </small>
              </td>
              <td class="border-right">
                {{ participant.first_name }} {{ participant.last_name }}
              </td>
              <template v-for="(contest, contestIndex) in results.contests">
                <td
                  :key="`contest-${participantIndex}-${contestIndex}`"
                  class="text-center"
                  :class="borderRight(contestIndex)"
                >
                  {{ participant.contests[contest.id] && participant.contests[contest.id].present ? participant.contests[contest.id].rank : '-' }}
                </td>
              </template>
            </tr>
          </tbody>
        </v-simple-table>
      </v-sheet>
    </div>
    <p
      v-else
      class="text-center text--disabled my-6"
    >
      Ajouter des contests et des correspondances de catégories à votre championnat pour voir les résultats.
    </p>
  </div>
</template>

<script>
import { mdiRefresh } from '@mdi/js'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import Contest from '~/models/Contest'

export default {
  name: 'ChampionshipResultTable',

  props: {
    championship: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingResult: true,
      results: null,
      participantsStep: null,
      firstLoad: true,

      mdiRefresh
    }
  },

  computed: {
    contests () {
      const contests = []
      for (const contest of this.championship.contests) {
        contests.push(new Contest({ attributes: contest }))
      }
      return contests
    }
  },

  mounted () {
    this.getResults()
  },

  methods: {
    getResults () {
      this.loadingResult = true
      new ChampionshipApi(this.$axios, this.$auth)
        .results(this.championship.gym_id, this.championship.id)
        .then((resp) => {
          this.results = resp.data
        })
        .finally(() => {
          this.loadingResult = false
          this.firstLoad = false
        })
    },

    borderRight (index) {
      if (index < this.contests.length - 1) {
        return 'border-right'
      } else {
        return ''
      }
    },

    competitorLabel (category) {
      if (category.unisex) {
        return this.$t('models.genres.competitors.unisex')
      } else {
        return this.$t(`models.genres.competitors.${category.genre}`)
      }
    }
  }
}
</script>
