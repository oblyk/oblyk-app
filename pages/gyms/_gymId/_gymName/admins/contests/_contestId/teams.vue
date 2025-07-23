<template>
  <div>
    <div class="text-right mt-2">
      <v-btn
        elevation="0"
        color="primary"
        @click="openFormModal('post')"
      >
        Ajouter une équipe
      </v-btn>
    </div>

    <!-- Add / Edit Modal -->
    <v-dialog
      v-model="formModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ formMethode === 'put' ? `Éditer ${team.name}` : 'Ajouter une équipe' }}
        </v-card-title>
        <div class="px-4 pb-4">
          <contest-team-form
            :key="`add-team-form-index-${teamFormKey}`"
            :contest="contest"
            :contest-team="team"
            :callback="formCallback"
            :submit-methode="formMethode"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Show team -->
    <v-dialog
      v-model="showModal"
      width="600"
    >
      <v-card :loading="loadingTeam">
        <v-card-title class="border-bottom d-flex">
          <div>
            {{ team?.name || '...' }}
          </div>
          <v-btn
            class="ml-auto"
            icon
            @click="showModal = false"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text
          v-if="team"
          class="mt-3"
        >
          <p class="mb-1 font-weight-bold">
            Les participants, participantes
          </p>
          <v-list
            v-if="team.contest_participants.length > 0"
            class="rounded border py-0"
          >
            <v-list-item
              v-for="(participant, participantIndex) in team.contest_participants"
              :key="`participant-index-${participantIndex}`"
            >
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  {{ participant.first_name }} {{ participant.last_name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="my-0">
                <v-btn
                  icon
                  @click="removeFromTeam(participant.id, team.id)"
                >
                  <v-icon>
                    {{ mdiTrashCan }}
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <p
            v-if="team.contest_participants.length === 0"
            class="text--disabled text-center my-4"
          >
            Il n'y a pas encore de participant, participante dans cette équipe
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            outlined
            color="red"
            class="ml-auto"
            @click="deleteTeam(team.id)"
          >
            <v-icon left>
              {{ mdiTrashCan }}
            </v-icon>
            Supprimer
          </v-btn>
          <v-btn
            text
            outlined
            @click="openFormModal('put', team.id)"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-sheet class="mt-2 pa-4 rounded">
      <v-text-field
        v-model="search"
        :append-icon="mdiMagnify"
        :label="$t('actions.search')"
        outlined
        hide-details
        dense
      />
      <v-data-table
        :loading="loadingTeams"
        :headers="teamHeaders"
        :items="teamItems"
        :search="search"
      >
        <template #[`item.name`]="{ item }">
          <v-chip @click="showTeamModal(item.id)">
            {{ item.name }}
          </v-chip>
        </template>
        <template #[`item.number_of_participants`]="{ item }">
          <span :class="celColor(item)">
            {{ item.number_of_participants }} / {{ contest.participant_per_team }}
          </span>
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script>
import {
  mdiTrashCan,
  mdiMagnify,
  mdiClose
} from '@mdi/js'
import { AppConcern } from '~/concerns/AppConcern'
import ContestTeamForm from '~/components/contests/forms/ContestTeamForm'
import ContestTeamApi from '~/services/oblyk-api/ContestTeamApi'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'

export default {
  components: { ContestTeamForm },
  mixins: [AppConcern],
  middleware: ['auth', 'gymAdmin'],

  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      formMethode: 'post',
      formModal: false,
      showModal: false,
      loadingTeam: true,
      team: null,
      teamId: null,
      loadingTeams: true,
      refreshKey: 0,
      teamFormKey: 0,
      teams: [],
      search: null,
      teamHeaders: [
        {
          text: this.$t('models.contestTeam.name'),
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Participants',
          align: 'start',
          sortable: true,
          value: 'number_of_participants'
        }
      ],

      mdiTrashCan,
      mdiMagnify,
      mdiClose
    }
  },

  computed: {
    teamItems () {
      const refreshKey = this.refreshKey
      const teams = []
      for (const team of this.teams) {
        teams.push({
          id: team.id,
          name: team.name,
          number_of_participants: team.number_of_participants,
          refreshKey
        })
      }
      return teams
    }
  },

  mounted () {
    this.getTeams()
  },

  methods: {
    getTeams () {
      this.loadingTeams = true
      new ContestTeamApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.teams = []
          for (const team of resp.data) {
            this.teams.push(team)
          }
        })
        .finally(() => {
          this.loadingTeams = false
        })
    },

    async showTeamModal (teamId) {
      this.showModal = true
      await this.getTeam(teamId)
    },

    getTeam (teamId) {
      return new Promise((resolve) => {
        this.loadingTeam = true
        new ContestTeamApi(this.$axios, this.$auth)
          .find(this.contest.gym_id, this.contest.id, teamId)
          .then((resp) => {
            this.team = resp.data
            this.formMethode = 'put'
            this.formCallback(resp.data)
          })
          .finally(() => {
            this.loadingTeam = false
            resolve()
          })
      })
    },

    formCallback (team) {
      this.formModal = false
      if (this.formMethode === 'put') {
        for (const teamIndex in this.teams) {
          if (this.teams[teamIndex].id === team.id) {
            this.teams[teamIndex] = team
            this.refreshKey++
            return
          }
        }
      } else {
        this.teams.push(team)
        this.teamFormKey += 1
      }
    },

    deleteTeam (teamId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette équipe ? Il n'y a aucun retour possible")) {
        this.loadingTeams = true
        new ContestTeamApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, teamId)
          .finally(() => {
            this.showModal = false
            this.getTeams()
          })
      }
    },

    async openFormModal (methode = 'post', teamId = null) {
      this.showModal = false
      if (methode === 'put') {
        await this.getTeam(teamId)
      } else {
        this.team = null
      }
      this.formMethode = methode
      this.formModal = true
    },

    removeFromTeam (participantId, teamId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce compétiteur de cette équipe ?')) {
        this.loadingTeam = true
        new ContestParticipantApi(this.$axios, this.$auth)
          .update({
            gym_id: this.contest.gym_id,
            contest_id: this.contest.id,
            id: participantId,
            contest_team_id: null
          })
          .then(() => {
            this.getTeam(teamId)
          })
      }
    },

    celColor (team) {
      if (team.number_of_participants < this.contest.participant_per_team) {
        return 'orange--text'
      } else if (team.number_of_participants === this.contest.participant_per_team) {
        return 'green--text'
      } else {
        return 'red--text'
      }
    }
  }
}
</script>
