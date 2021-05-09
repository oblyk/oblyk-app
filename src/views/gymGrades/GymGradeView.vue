<template>
  <div>
    <spinner v-if="loadingGymGrade" />

    <v-container v-if="!loadingGymGrade">
      <gym-grade-card :gym-grade="gymGrade" :presentation="false" />
      <div class="mt-4">
        <v-btn
          :to="gymGrade.listPath()"
          icon
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import { GymGradeConcern } from '@/concerns/GymGradeConcern'
import Spinner from '@/components/layouts/Spiner'
import GymGradeCard from '@/components/gymGrades/GymGradeCard'

export default {
  name: 'GymGradeView',
  components: { GymGradeCard, Spinner },
  mixins: [GymGradeConcern],

  metaInfo () {
    return {
      title: (this.gymGrade || {}).name
    }
  }
}
</script>
