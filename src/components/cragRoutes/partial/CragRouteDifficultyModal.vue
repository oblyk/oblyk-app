<template>
  <v-dialog
    v-model="difficultyModal"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        v-bind="attrs"
        v-on="on"
        class="text-lowercase font-weight-regular pl-0"
      >
        <crag-route-difficulty-icon
          class="mr-2"
          :crag-route="cragRoute"
        />
        <span v-if="cragRoute.difficultyAverage() > cragRoute.grade_gap.min_grade_value">
          {{ $t('components.difficulty.hard') }}
        </span>
        <span v-if="cragRoute.difficultyAverage() === cragRoute.grade_gap.min_grade_value">
          {{ $t('components.difficulty.just') }}
        </span>
        <span v-if="cragRoute.difficultyAverage() < cragRoute.grade_gap.min_grade_value">
          {{ $t('components.difficulty.soft') }}
        </span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('components.note.votes') }}
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          {{cragRoute.votes }}
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Cotation proposé
                </th>
                <th class="text-left">
                  Nombre
                </th>
                <th class="text-left">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(grade, index) in grades()"
                :key="`grade-${index}`"
              >
                <td>
                  {{ grade.gradeText }}
                </td>
                <td>
                  {{ grade.count }}
                </td>
                <td>
                  {{ Math.round(grade.ratio) }}%
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
    cragRoute: Object
  },

  data () {
    return {
      difficultyModal: false
    }
  },

  methods: {
    grades: function () {
      const votes = (this.cragRoute.votes || {}).difficulty_appreciations
      if (!votes) return null

      let countVote = 0
      Object.keys(votes).forEach(key => {
        countVote += votes[key].count
      })

      const grades = []
      Object.keys(votes).forEach(key => {
        grades.push({
          gradeValue: key,
          gradeText: this.gradeValueToText(parseInt(key) - 1),
          count: votes[key].count,
          ratio: votes[key].count / countVote * 100
        })
      })
      return grades
    }
  }
}
</script>
