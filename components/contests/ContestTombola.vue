<template>
  <v-dialog
    v-model="tombolaModal"
    width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        outlined
        text
        v-bind="attrs"
        v-on="on"
        @click="openTombolaModal()"
      >
        <v-icon left>
          {{ mdiDiceMultiple }}
        </v-icon>
        Tombola
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>
          {{ mdiDiceMultiple }}
        </v-icon>
        Tombola
        <v-spacer />
        <v-btn
          icon
          @click="tombola('close')"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <div class="px-4 pb-4">
        <v-alert
          color="blue"
          text
        >
          Si vous utilisez la <strong>page de présentation</strong>, avant de lancer le tirage au sort utilisez le bouton <strong>"Ouvrir la tombola"</strong>
          pour afficher le tirage en temps réel à vos participant(e)s.<br>
          Pensez à fermer la tombola quand vous avez fini votre tirage.
        </v-alert>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              x-large
              outlined
              text
              block
              :disabled="tombolaAction"
              @click="tombola('open')"
            >
              <v-icon
                large
                left
              >
                {{ mdiOpenInApp }}
              </v-icon>
              Ouvrir la tombola
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              x-large
              outlined
              text
              block
              :disabled="tombolaAction"
              @click="tombola('close')"
            >
              <v-icon
                large
                left
              >
                {{ mdiCloseBoxOutline }}
              </v-icon>
              Fermer la tombola
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="contest.contest_waves.length > 1 || contest.contest_categories.length > 1"
          class="my-2"
          no-gutters
        >
          <v-col v-if="contest.contest_waves.length > 1">
            <p class="font-weight-bold text-decoration-underline mb-0">
              Les vagues :
            </p>
            <v-checkbox
              v-for="(wave, waveIndex) in contest.contest_waves"
              :key="`wave-index-${waveIndex}`"
              v-model="data.contest_wave_ids"
              :value="wave.id"
              :label="wave.name"
              hide-details
              class="mt-2"
            />
          </v-col>
          <v-col v-if="contest.contest_categories.length > 1">
            <p class="font-weight-bold text-decoration-underline mb-0">
              Les catégories :
            </p>
            <v-checkbox
              v-for="(category, categoryIndex) in contest.contest_categories"
              :key="`category-index-${categoryIndex}`"
              v-model="data.contest_category_ids"
              :value="category.id"
              :label="category.name"
              hide-details
              class="mt-2"
            />
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn
            x-large
            elevation="0"
            :disabled="tombolaAction"
            :loading="tombolaLaunchLoading"
            class="mt-4"
            color="primary"
            @click="tombola('launch')"
          >
            <v-icon
              large
              left
            >
              {{ mdiDiceMultiple }}
            </v-icon>
            Lancer un tirage <span class="d-none d-lg-inline ml-2">au sort</span>
          </v-btn>
        </div>
        <div v-if="tombolaShowWinner">
          <p class="mb-0 mt-4">
            Le·a gagnant·e est ...
          </p>
          <v-sheet class="back-app-color pa-2 text-h5 text-md-h4 rounded text-center">
            {{ tombolaWinner !== null ? tombolaWinner : '...' }}
          </v-sheet>
        </div>
        <div>
          <div
            v-if="tombolaWinners.length > 0"
            class="mt-5"
          >
            <p class="text-decoration-underline mb-1">
              Gagnant·es précédent·es :
            </p>
            <ul>
              <li
                v-for="(winner, winnerIndex) in tombolaWinners"
                :key="`winner-${winnerIndex}`"
              >
                {{ winnerName(winner) }}
                <v-btn
                  small
                  icon
                  :disabled="tombolaDeleting"
                  @click="deleteWinner(winner)"
                >
                  <v-icon small>
                    {{ mdiTrashCan }}
                  </v-icon>
                </v-btn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  mdiTrashCan,
  mdiDiceMultiple,
  mdiOpenInApp,
  mdiCloseBoxOutline,
  mdiClose
} from '@mdi/js'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'

export default {
  name: 'ContestTombola',
  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      tombolaModal: false,
      tombolaAction: false,
      tombolaWinners: [],
      tombolaWinnersLoading: [],
      tombolaLaunchLoading: false,
      tombolaShowWinner: false,
      tombolaWinner: null,
      tombolaDeleting: false,
      data: {
        contest_wave_ids: this.contest.contest_waves.map(wave => wave.id),
        contest_category_ids: this.contest.contest_categories.map(category => category.id)
      },

      mdiDiceMultiple,
      mdiTrashCan,
      mdiOpenInApp,
      mdiCloseBoxOutline,
      mdiClose
    }
  },

  methods: {
    openTombolaModal () {
      this.tombolaModal = true
      this.tombolaShowWinner = false
      this.tombolaWinner = null
      this.getTombolaWinners()
    },

    tombola (type) {
      this.tombolaAction = true
      if (type === 'launch') {
        this.tombolaShowWinner = true
        this.tombolaWinner = null
        this.tombolaLaunchLoading = true
      }
      new ContestParticipantApi(this.$axios, this.$auth)
        .tombola(this.contest.gym_id, this.contest.id, type, this.data)
        .then((resp) => {
          if (type === 'launch') {
            setTimeout(() => {
              this.tombolaLaunchLoading = false
              if (resp.data.first_name) {
                this.tombolaWinner = `${resp.data.first_name} ${resp.data.last_name} !`
              } else {
                this.tombolaWinner = 'plus de participant·e à tirer'
              }
            }, 2000)
          }
        })
        .finally(() => {
          if (type === 'close') {
            this.tombolaAction = false
            this.tombolaModal = false
          } else if (type === 'open') {
            this.tombolaAction = false
          } else if (type === 'launch') {
            setTimeout(() => {
              this.tombolaAction = false
              this.tombolaLaunchLoading = false
              this.getTombolaWinners()
            }, 2500)
          }
        })
    },

    getTombolaWinners () {
      this.tombolaWinnersLoading = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .tombolaWinners(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          this.tombolaWinners = []
          for (const participant of resp.data) {
            this.tombolaWinners.push(participant)
          }
        })
        .finally(() => {
          this.tombolaWinnersLoading = false
          this.tombolaDeleting = false
        })
    },

    deleteWinner (participant) {
      this.tombolaDeleting = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .update({
          gym_id: this.contest.gym_id,
          contest_id: this.contest.id,
          id: participant.id,
          tombola_winner: false
        })
        .finally(() => {
          this.getTombolaWinners()
        })
    },

    winnerName (winner) {
      const name = `${winner.first_name} ${winner.last_name.toUpperCase()}`
      const names = [name]
      const additionalInformation = []
      if (this.contest.contest_categories.length > 1) {
        additionalInformation.push(winner.contest_category.name)
      }
      if (winner.contest_wave.id !== null && this.contest.contest_waves.length > 1) {
        additionalInformation.push(winner.contest_wave.name)
      }
      if (additionalInformation.length > 0) {
        names.push(additionalInformation.join(' - '))
      }
      return names.join(' · ')
    }
  }
}
</script>
