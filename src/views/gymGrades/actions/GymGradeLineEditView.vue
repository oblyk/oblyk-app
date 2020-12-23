<template>
  <div>
    <spinner v-if="loadingGymGrade || loadingGymGradeLine" />

    <v-container v-if="!loadingGymGrade && !loadingGymGradeLine">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.edit')}}
            "{{ gymGradeLine.name }}"
          </h2>

          <gym-grade-line-form
            :gym-grade="gymGrade"
            :gym-grade-line="gymGradeLine"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GymGradeLineForm from '@/components/gymGrades/forms/GymGradeLineForm'
import Spinner from '@/components/layouts/Spiner'
import { GymGradeConcern } from '@/concerns/GymGradeConcern'
import { GymGradeLineConcern } from '@/concerns/GymGradeLineConcern'

export default {
  name: 'GymGradeNewView',
  mixins: [GymGradeConcern, GymGradeLineConcern],
  components: { Spinner, GymGradeLineForm }
}
</script>
