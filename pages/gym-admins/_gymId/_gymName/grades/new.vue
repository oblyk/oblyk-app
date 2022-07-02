<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymGrade.add') }}
        </h2>
        <p class="subtitle-2 mb-8">
          {{ $t('components.gymGrade.explain') }}}
        </p>

        <gym-grade-form
          :gym-id="$route.params.gymId"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymGradeForm from '~/components/gymGrades/forms/GymGradeForm'

export default {
  components: { GymGradeForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.grade.new')
    }
  }
}
</script>
