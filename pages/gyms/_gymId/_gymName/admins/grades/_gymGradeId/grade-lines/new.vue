<template>
  <div>
    <spinner v-if="loadingGymGrade" />

    <v-container v-if="!loadingGymGrade">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.addLevel') }}
          </h2>

          <gym-grade-line-form
            :gym-grade="gymGrade"
            submit-methode="post"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GymGradeLineForm from '~/components/gymGrades/forms/GymGradeLineForm'
import Spinner from '~/components/layouts/Spiner'
import { GymGradeConcern } from '~/concerns/GymGradeConcern'

export default {
  meta: { orphanRoute: true },
  components: { Spinner, GymGradeLineForm },
  mixins: [GymGradeConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.grade.newLine')
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
        },
        {
          text: this.$t('actions.addLevel'),
          to: `${this.gym?.adminPath}/grades/${this.gymGrade.id}/grade-lines/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
