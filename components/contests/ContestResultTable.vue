<template>
  <div>
    <div v-if="firstLoad">
      <v-skeleton-loader type="table-heading" />
    </div>
    <div v-else>
      <v-sheet
        v-for="(category, categoryIndex) in results"
        :key="`category-${categoryIndex}`"
        class="rounded px-4 py-1 mb-4"
        :style="printer ? 'page-break-after: always;' : null"
      >
        <div class="d-flex">
          <p class="font-weight-bold mb-1 pl-1 pt-2">
            {{ category.category_name }} <span v-if="!category.unisex"> - {{ $t(`models.genres.${category.genre}`).toLowerCase() }}</span>
          </p>
          <v-spacer />
          <v-btn
            icon
            :loading="loadingResult"
            @click="getResults"
          >
            <v-icon>
              {{ mdiRefresh }}
            </v-icon>
          </v-btn>
        </div>
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
                <v-chip
                  v-if="admin"
                  @click="openParticipantModal(participant)"
                >
                  {{ participant.first_name }} {{ participant.last_name }}
                </v-chip>
                <span
                  v-else
                  v-text="`${participant.first_name} ${participant.last_name}`"
                />
              </td>
              <template v-for="stage in participant.stages">
                <td
                  v-for="(step, stepIndex) in stage.steps"
                  :key="`step-${stepIndex}`"
                  class="text-center border-right"
                >
                  <v-checkbox
                    v-if="showSubscribeCheckbox && step.step_order > 1"
                    v-model="participantsStep[participant.participant_id][step.step_id]"
                    color="primary"
                    hide-details
                    dense
                    class="d-inline-block vertical-align-middle mt-n1"
                    @click="subscribeParticipantOnStep(participant, step)"
                  />
                  <div
                    :class="classForNextStep(step)"
                  >
                    <strong v-if="step.subscribe">
                      {{ step.rank || '-' }}
                    </strong>
                    <small
                      v-if="step.points && step.subscribe && step.unit_details !== 'zone_and_top_blocks'"
                      class="text--disabled"
                    >
                      {{ details(step) }}
                    </small>
                    <div
                      v-if="step.points && step.subscribe && step.unit_details === 'zone_and_top_blocks'"
                      class="d-inline-block ml-2"
                    >
                      <div
                        v-for="(detail, detailIndex) in step.score_details"
                        :key="`detail-index-${detailIndex}`"
                        class="d-inline-block border vertical-align-middle black--text text-center font-weight-bold"
                        style="border-radius: 2px; margin-right: 2px; width: 16px"
                      >
                        <div
                          style="font-size: 8px; border-radius: 2px 2px 0 0; height: 14px"
                          :style="detail.top > 0 ? `background-color: #ffc107` : null"
                        >
                          <v-icon
                            v-if="detail.top === 1"
                            size="9"
                            color="black"
                          >
                            {{ mdiFlash }}
                          </v-icon>
                          <span
                            v-else
                            style="padding-top: 2px"
                            class="vertical-align-text-bottom d-inline-block"
                          >
                            {{ detail.top > 0 ? detail.top : '-' }}
                          </span>
                        </div>
                        <div
                          style="font-size: 8px; border-radius: 0 0 2px 2px; height: 14px"
                          :style="detail.zone > 0 ? `background-color: #ffc107` : null"
                        >
                          <v-icon
                            v-if="detail.zone === 1"
                            size="9"
                            color="black"
                          >
                            {{ mdiFlash }}
                          </v-icon>
                          <span
                            v-else
                            style="padding-top: 2px"
                            class="vertical-align-text-bottom d-inline-block"
                          >
                            {{ detail.zone > 0 ? detail.zone : '-' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </v-simple-table>
      </v-sheet>

      <!-- Participant modal -->
      <v-dialog
        v-model="showParticipantModal"
        width="800"
      >
        <v-card>
          <div class="pa-4">
            <contest-participant-card
              v-if="showParticipantModal && participantId"
              :ref="`participant-card-${participantId}`"
              :contest-participant-id="participantId"
              :contest="contest"
              :close-modal="closeParticipantModal"
            />
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mdiRefresh, mdiFlash } from '@mdi/js'
import ContestApi from '~/services/oblyk-api/ContestApi'
import ContestParticipantStepApi from '~/services/oblyk-api/ContestParticipantStepApi'
const ContestParticipantCard = () => import('~/components/contests/ContestParticipantCard')

export default {
  name: 'ContestResultTable',
  components: { ContestParticipantCard },

  props: {
    contest: {
      type: Object,
      required: true
    },
    admin: {
      type: Boolean,
      required: false
    },
    printer: {
      type: Boolean,
      default: false
    },
    showSubscribeCheckbox: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loadingResult: true,
      results: null,
      participantsStep: null,
      loadingSubscribe: false,
      showParticipantModal: false,
      participantId: null,
      firstLoad: true,

      mdiRefresh,
      mdiFlash
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
          this.buildParticipantsStep()
          if (this.printer) {
            setTimeout(() => {
              window.print()
            }, 300)
          }
        })
        .finally(() => {
          this.firstLoad = false
          this.loadingResult = false
        })
    },

    buildParticipantsStep () {
      this.participantsStep = {}
      for (const category of this.results) {
        for (const participant of category.participants) {
          this.participantsStep[participant.participant_id] = {}
          for (const stage of participant.stages) {
            for (const step of stage.steps) {
              this.participantsStep[participant.participant_id][step.step_id] = step.subscribe
            }
          }
        }
      }
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
      return step.rank && step.participant_for_next_step && step.index <= step.participant_for_next_step && !this.printer ? `blue-grey ${color} d-inline py-1 px-2 rounded-sm` : 'd-inline'
    },

    subscribeParticipantOnStep (participant, step) {
      const participantId = participant.participant_id
      const stepId = step.step_id
      this.loadingSubscribe = true
      new ContestParticipantStepApi(this.$axios, this.$auth)
        .subscribe({
          gymId: this.contest.gym_id,
          contestId: this.contest.id,
          participantId,
          stepId,
          subscribe: this.participantsStep[participantId][stepId]
        })
        .finally(() => {
          this.loadingSubscribe = false
        })
    },

    openParticipantModal (participant) {
      this.participantId = participant.participant_id
      this.showParticipantModal = true
    },

    closeParticipantModal () {
      this.participantId = null
      this.showParticipantModal = false
    }
  }
}
</script>
