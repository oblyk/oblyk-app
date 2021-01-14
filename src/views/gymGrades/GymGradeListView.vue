<template>
  <div>
    <spinner v-if="loadingGymGrades"></spinner>

    <v-container v-if="!loadingGymGrades">
      <div
        class="mb-4"
        v-for="gymGrade in gymGrades"
        :key="gymGrade.id"
      >
        <gym-grade-card :gym-grade="gymGradeModel(gymGrade)" />
      </div>

      <p class="text-center mt-10 mb-10" v-if="gymGrades.length === 0">
        {{ $t('components.gymGrade.noSystem') }}
      </p>

      <p class="mt-3" v-bind:class="gymGrades.length === 0 ? 'text-center' : 'text-right'">
        <v-btn
          color="primary"
          outlined
          :to="`/gyms/${gymId}/${gymSlug}/grades/new`"
        >
          {{ $t('actions.addSystem') }}
        </v-btn>
      </p>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '@/services/oblyk-api/GymGradeApi'
import GymGradeCard from '@/components/gymGrades/GymGradeCard'
import GymGrade from '@/models/GymGrade'

export default {
  name: 'GymGradListView',
  components: { GymGradeCard, Spinner },

  data () {
    return {
      loadingGymGrades: true,
      gymGrades: [],
      gymId: this.$route.params.gymId,
      gymSlug: this.$route.params.gymSlug
    }
  },

  created () {
    this.getGymGrades()
  },

  methods: {
    getGymGrades: function () {
      GymGradeApi
        .all(this.gymId)
        .then(resp => {
          this.gymGrades = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymGrade')
        })
        .finally(() => {
          this.loadingGymGrades = false
        })
    },

    gymGradeModel: function (data) {
      return new GymGrade(data)
    }
  }
}
</script>
