<template>
  <div>
    <div v-if="loadingResult">
      <v-skeleton-loader type="table-heading" />
    </div>
    <div v-else>
      <div
        v-for="(category, categoryIndex) in results"
        :key="`category-${categoryIndex}`"
      >
        <p class="font-weight-bold mb-1 pl-1">
          {{ category.category_name }} <span v-if="!category.unisex"> - {{ $t(`models.genres.${category.genre}`).toLowerCase() }}</span>
        </p>
        <v-simple-table
          dense
          class="border mb-4"
        >
          <thead>
            <tr>
              <th
                rowspan="2"
                class="border-bottom vertical-align-bottom pb-2"
              >
                Classement
              </th>
              <th
                rowspan="2"
                class="border-bottom vertical-align-bottom pb-2 border-right"
              >
                Compétiteur
              </th>
              <th
                v-for="(stage, stageIndex) in category.participants[0].stages"
                :key="`stage-${stageIndex}`"
                :colspan="stage.steps.length"
                class="text-center border-bottom"
              >
                {{ $t(`models.climbs.${stage.climbing_type}`) }}
              </th>
            </tr>
            <tr>
              <template v-for="stage in category.participants[0].stages">
                <th
                  v-for="(step, thStepIndex) in stage.steps"
                  :key="`step-${thStepIndex}`"
                  class="text-center"
                >
                  {{ step.name }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participant, participantIndex) in category.participants"
              :key="`participant-${participantIndex}`"
            >
              <td class="border-right">
                {{ participant.global_rank }}
              </td>
              <td class="border-right">
                {{ participant.first_name }} {{ participant.last_name }}
              </td>
              <template v-for="stage in participant.stages">
                <td
                  v-for="(step, stepIndex) in stage.steps"
                  :key="`step-${stepIndex}`"
                  class="text-center border-right"
                >
                  <div
                    :class="classForNextStep(step)"
                  >
                    <strong v-if="step.subscribe">
                      {{ step.rank || '-' }}
                    </strong>
                    <small
                      v-if="step.points && step.subscribe"
                      class="text--disabled"
                    >
                      {{ details(step) }}
                    </small>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
import ContestApi from '~/services/oblyk-api/ContestApi'

export default {
  name: 'ContestResultTable',

  props: {
    contest: {
      type: Object,
      required: true
    },
    admin: {
      type: Boolean,
      required: false
    }
  },

  data () {
    return {
      loadingResult: true,
      results: null
    }
  },

  mounted () {
    this.getResults()
  },

  methods: {
    getResults () {
      this.loadingResult = true
      new ContestApi(this.$axios, this.$auth)
        .results(
          this.contest.gym_id,
          this.contest.id
        )
        .then((resp) => {
          this.results = resp.data
        })
        .finally(() => {
          this.loadingResult = false
        })
    },

    details (step) {
      let index = 0
      const details = []
      for (const detail of step.score_details) {
        details.push(`${detail} ${step.unit_details[index]}`)
        index += 1
      }
      return details.join(', ')
    },

    classForNextStep (step) {
      const color = this.$vuetify.theme.dark ? 'darken-4' : 'lighten-5'
      return step.rank && step.participant_for_next_step && step.index <= step.participant_for_next_step ? `blue-grey ${color} d-inline py-1 px-2 rounded-sm` : null
    }
  }
}
</script>
