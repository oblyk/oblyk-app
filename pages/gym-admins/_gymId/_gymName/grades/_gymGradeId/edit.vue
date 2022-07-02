<template>
  <div>
    <spinner v-if="loadingGymGrade" />

    <v-container v-if="!loadingGymGrade">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit') }}
            "{{ gymGrade.name }}"
          </h2>
          <gym-grade-form
            :gym-id="$route.params.gymId"
            :gym-grade="gymGrade"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GymGradeForm from '~/components/gymGrades/forms/GymGradeForm'
import { GymGradeConcern } from '~/concerns/GymGradeConcern'
import Spinner from '~/components/layouts/Spiner'

export default {
  components: { Spinner, GymGradeForm },
  mixins: [GymGradeConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.grade.edit')
    }
  }
}
</script>
