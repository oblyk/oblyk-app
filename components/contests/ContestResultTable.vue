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
            {{ category.category_name }}
            <span v-if="!category.unisex && !unisex && !byTeam">
              - {{ $t(`models.genres.${category.genre}`).toLowerCase() }}
            </span>
          </p>
          <v-spacer />
          <v-btn
            v-if="!printer"
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
                v-if="contest.team_contest"
                rowspan="2"
                class="border-bottom vertical-align-bottom pb-2"
              >
                Équipe
              </th>
              <th
                rowspan="2"
                class="border-bottom vertical-align-bottom pb-2 border-right"
              >
                {{ competitorLabel(category) }}
              </th>
              <th
                v-for="(stage, stageIndex) in category.participants[0].stages"
                :key="`stage-header-index-${stageIndex}`"
                :colspan="stage.steps.length"
                class="text-center border-bottom"
                :class="stage.steps.length > stageIndex ? 'border-right' : ''"
              >
                {{ stage.stage_name ? stage.stage_name : $t(`models.climbs.${stage.climbing_type}`) }}
              </th>
            </tr>
            <tr>
              <template v-for="(stage, stageIndex) in category.participants[0].stages">
                <th
                  v-for="(step, thStepIndex) in stage.steps"
                  :key="`step-header-index-${thStepIndex}-${stageIndex}`"
                  class="text-center"
                  :class="stage.steps.length === thStepIndex + 1 && category.participants[0].stages.length !== stageIndex + 1 ? 'border-right' : ''"
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
              <td
                v-if="(!contest.team_contest || !byTeam) || (contest.team_contest && byTeam && !participant.same_team)"
                class="border-right"
                :title="participant.global_rank_point"
                :rowspan="contest.team_contest && byTeam ? participant.team_size : 1"
              >
                <strong>
                  {{ participant.global_rank }}
                </strong>
                <small
                  v-if="category.participants[0].stages.length > 1"
                  class="text--disabled ml-1"
                >
                  {{ Math.round(participant.global_rank_point) }} pts
                </small>
              </td>
              <td
                v-if="(contest.team_contest && !byTeam) || (contest.team_contest && byTeam && !participant.same_team)"
                :rowspan="contest.team_contest && byTeam ? participant.team_size : 1"
                class="border-right"
              >
                {{ participant.team_name }}
                <span
                  v-if="participant.team_name === null"
                  class="red--text text--lighten-2 font-italic"
                >
                  sans équipe
                </span>
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
                <small
                  v-if="participant.affiliation"
                  class="font-italic text--disabled"
                >
                  - {{ participant.affiliation }}
                </small>
              </td>
              <template v-for="(stage, stageIndex) in participant.stages">
                <td
                  v-for="(step, stepIndex) in stage.steps"
                  :key="`step-${participantIndex}-${stepIndex}-${stageIndex}`"
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
                    class="text-no-wrap"
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
                        style="border-radius: 3px; margin-right: 3px; margin-top: 2px; margin-bottom: 2px; width: 18px"
                      >
                        <div
                          style="font-size: 11px; border-radius: 3px 3px 0 0; height: 17px"
                          :style="detail.top > 0 ? `background-color: #ffc107` : null"
                        >
                          <span
                            style="padding-top: 0"
                            class="vertical-align-text-bottom d-inline-block"
                          >
                            {{ detail.top > 0 ? detail.top : '-' }}
                          </span>
                        </div>
                        <div
                          style="font-size: 11px; border-radius: 0 0 3px 3px; height: 17px"
                          :style="detail.zone > 0 ? `background-color: #ffc107` : null"
                        >
                          <span
                            style="padding-top: 0"
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
import { mdiRefresh } from '@mdi/js'
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
    },
    byTeam: {
      type: Boolean,
      default: false
    },
    unisex: {
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

      mdiRefresh
    }
  },

  watch: {
    byTeam () {
      this.getResults()
    },
    unisex () {
      this.getResults()
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
          this.contest.id,
          this.byTeam,
          this.unisex
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

    competitorLabel (category) {
      if (category.unisex) {
        return this.$t('models.genres.competitors.unisex')
      } else {
        return this.$t(`models.genres.competitors.${category.genre}`)
      }
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
        const unitDetail = step.unit_details[index] ? step.unit_details[index] : ''
        details.push(`${detail} ${unitDetail}`)
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
