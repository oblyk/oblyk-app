<template>
  <div>
    <spinner v-if="loadingGymGrade" />

    <v-container v-if="!loadingGymGrade">
      <v-breadcrumbs :items="breadcrumbs" />
      <gym-grade-card :gym-grade="gymGrade" :presentation="false" />
      <div class="mt-4">
        <v-btn
          :to="gymGrade.listPath"
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
  meta: { orphanRoute: true },
  components: { GymGradeCard, Spinner },
  mixins: [GymGradeConcern],

  data () {
    return {
      mdiArrowLeft
    }
  },

  head () {
    return {
      title: this.gymGrade?.name
    }
  },

  computed: {
    gym () {
      return this.gymGrade?.Gym
    },

    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: this.gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.difficultySystem'),
          to: `${this.gym?.adminPath}/grades`,
          exact: true
        },
        {
          text: this.gymGrade.name,
          to: `${this.gym?.adminPath}/grades/${this.gymGrade.id}`,
          exact: true
        }
      ]
    }
  }
}
</script>
