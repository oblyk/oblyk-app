<template>
  <div>
    <v-list class="rounded">
      <v-slide-y-transition group>
        <template v-for="participant in participantsList">
          <div :key="`participant-index-${participant.participant_id}`">
            <v-list-item
              v-if="byTeam && !participant.same_team"
              class="mt-2 pl-4 mb-n3"
            >
              <v-list-item-avatar>
                <v-avatar
                  class="font-weight-bold back-app-color"
                  :style="participant.global_rank < 10 ? 'font-size: 1.5em' : participant.global_rank < 100 ? 'font-size: 1.3em' : 'font-size: 1em'"
                >
                  {{ participant.global_rank }}
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="text-h6 font-weight-bold border-bottom pb-2"
                  :class="!participant.team_name ? 'font-italic' : null"
                >
                  {{ participant.team_name || 'Sans équipe' }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar
                  v-if="!byTeam"
                  class="font-weight-bold back-app-color"
                  :style="participant.global_rank < 10 ? 'font-size: 1.5em' : participant.global_rank < 100 ? 'font-size: 1.3em' : 'font-size: 1em'"
                >
                  {{ participant.global_rank }}
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content :class="byTeam ? 'py-2' : null">
                <v-list-item-title class="font-weight-bold">
                  {{ participant.first_name }} {{ participant.last_name }}
                  <strong v-if="participant.affiliation">·</strong>
                  <small v-if="participant.affiliation" class="text--disabled font-weight-regular">
                    {{ participant.affiliation }}
                  </small>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <p
                    v-for="(stage, stageIndex) in participant.stages"
                    :key="`stage-index-${stageIndex}`"
                    class="mb-0 span-comma"
                  >
                    <template v-for="(step, stepIndex) in stage.steps">
                      <span
                        v-if="step.subscribe"
                        :key="`step-index-${stepIndex}`"
                      >
                        {{ step.name }} {{ stage.stage_name }} :
                        <span v-if="step.rank">{{ step.rank }}{{ step.rank === 1 ? 'er' : 'ème' }}</span>
                        <span v-else>-</span>
                      </span>
                    </template>
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </template>
      </v-slide-y-transition>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ContestRankerParticipant',
  props: {
    participants: {
      type: Array,
      required: true
    },

    byTeam: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      participantsList: structuredClone(this.participants)
    }
  },

  watch: {
    participants () {
      this.participantsList = structuredClone(this.participants)
      this.sort()
    }
  },

  methods: {
    sort () {
      this.participantsList = this.participantsList.sort((a, b) => a.global_rank - b.global_rank)
    }
  }
}
</script>
