<template>
  <div>
    <spinner v-if="loadingGymGrade" />

    <v-container v-if="!loadingGymGrade">
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
  components: { Spinner, GymGradeLineForm },
  mixins: [GymGradeConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.grade.newLine')
    }
  }
}
</script>
