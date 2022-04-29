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
          <v-icon>{{ mdiArrowLeft }}</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { GymGradeConcern } from '@/concerns/GymGradeConcern'
import Spinner from '@/components/layouts/Spiner'
import GymGradeCard from '@/components/gymGrades/GymGradeCard'

export default {
  components: { GymGradeCard, Spinner },
  mixins: [GymGradeConcern],

  data () {
    return {
      mdiArrowLeft
    }
  },

  head () {
    return {
      title: (this.gymGrade || {}).name
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
