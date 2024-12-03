<template>
  <v-dialog
    v-model="difficultyModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        v-bind="attrs"
        class="text-lowercase font-weight-regular pl-0"
        v-on="on"
      >
        <crag-route-difficulty-icon
          class="mr-2"
          :crag-route="cragRoute"
        />
        {{ $t(`components.difficulty.${cragRoute.difficultyAppreciationStatus}`) }}
        <small class="text--disabled ml-1">
          ({{ countVote() }})
        </small>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('components.note.votes') }}
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          {{ cragRoute.votes }}
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t('models.ascentCragRoute.hardness_status') }}
                </th>
                <th class="text-left">
                  {{ $t('common.votes') }}
                </th>
                <th class="text-left">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="difficulty.easy_for_the_grade">
                <td>
                  {{ $t('models.hardnessStatus.easy_for_the_grade') }}
                </td>
                <td>
                  {{ difficulty.easy_for_the_grade.count }}
                </td>
                <td>
                  {{ Math.round(difficulty.easy_for_the_grade.count / countVote() * 100) }}%
                </td>
              </tr>
              <tr v-if="difficulty.this_grade_is_accurate">
                <td>
                  {{ $t('models.hardnessStatus.this_grade_is_accurate') }}
                </td>
                <td>
                  {{ difficulty.this_grade_is_accurate.count }}
                </td>
                <td>
                  {{ Math.round(difficulty.this_grade_is_accurate.count / countVote() * 100) }}%
                </td>
              </tr>
              <tr v-if="difficulty.sandbagged">
                <td>
                  {{ $t('models.hardnessStatus.sandbagged') }}
                </td>
                <td>
                  {{ difficulty.sandbagged.count }}
                </td>
                <td>
                  {{ Math.round(difficulty.sandbagged.count / countVote() * 100) }}%
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CragRouteDifficultyIcon from '@/components/cragRoutes/partial/CragRouteDifficultyIcon'
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'CragRouteDifficultyModal',
  components: { CragRouteDifficultyIcon },
  mixins: [GradeMixin],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      difficultyModal: false,
      difficulty: (this.cragRoute.votes.difficulty_appreciations || {})
    }
  },

  methods: {
    countVote () {
      const votes = (this.cragRoute.votes || {}).difficulty_appreciations
      if (!votes) { return null }

      let countVote = 0
      Object.keys(votes).forEach((key) => {
        countVote += votes[key].count
      })

      return countVote
    }
  }
}
</script>
