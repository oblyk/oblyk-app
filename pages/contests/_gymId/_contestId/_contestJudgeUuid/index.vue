<template>
  <v-container>
    <client-only>
      <!-- LOAD INTERFACE  -->
      <p
        v-if="loading"
        class="text-center my-15 text--disabled"
      >
        <v-progress-circular
          indeterminate
          size="12"
          width="2"
          color="deep-purple accent-4"
          class="mr-1 vertical-align-super"
        />
        Préparation de l'interface de juge ...
      </p>

      <div v-else>
        <!-- CONTEST / JUDGE TITLE -->
        <v-list-item class="px-0">
          <v-list-item-avatar tile>
            <v-img
              v-if="contest && contest.attachments.banner.attached"
              :src="imageVariant(contest.attachments.banner, { fit: 'crop', width: 100, height: 100 })"
              class="rounded-sm"
            />
            <v-icon v-else>
              {{ mdiTrophy }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ contest?.name || '...' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ contestJudge?.name || '...' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- UNLOCK FORM --->
        <div v-if="locked">
          <v-form @submit.prevent="unlock">
            <p class="mb-2">
              Rentrez le code pour déverrouiller l'interface de jugement :
            </p>
            <v-text-field
              v-model="code"
              outlined
              hide-details
              label="code"
            />
            <div class="text-right mt-2">
              <v-btn
                color="primary"
                elevation="0"
                type="submit"
                :loading="unLocking"
              >
                Déverrouiller
              </v-btn>
            </div>
          </v-form>
        </div>

        <!-- JUDGEMENT INTERFACE -->
        <div v-else>
          <!-- PARTICIPANT LISTE -->
          <p class="font-weight-medium mb-2">
            Cliquez sur le ou la participante à juger :
          </p>
          <v-text-field
            v-model="search"
            label="Chercher ..."
            outlined
            dense
            hide-details
            clearable
            class="mb-2"
            :prepend-inner-icon="mdiMagnify"
          />
          <v-data-table
            :search="search"
            :headers="participantHeaders"
            :items="participantItems"
            :mobile-breakpoint="10"
            :items-per-page="-1"
            hide-default-footer
            @click:row="openJudgeModal"
          />

          <!-- JUDGE MODAL -->
          <v-dialog
            v-model="participantModal"
            width="800"
            :persistent="resultsChanged"
          >
            <v-card :loading="loadingParticipant">
              <v-card-title class="d-flex px-3 pt-3">
                <div>
                  {{ selectedParticipant?.name || '...' }}
                </div>
                <v-btn
                  icon
                  class="ml-auto"
                  @click="closeJudgeModal(false)"
                >
                  <v-icon>
                    {{ mdiClose }}
                  </v-icon>
                </v-btn>
              </v-card-title>
              <v-card-subtitle class="px-3 pb-0">
                {{ selectedParticipant?.category || '...' }}
              </v-card-subtitle>
              <v-card-text
                v-if="participant"
                class="px-2 pb-2"
              >
                <contest-judge-step
                  v-for="(step, stepIndex) in participant.steps"
                  :key="`step-index-${stepIndex}`"
                  :contest="contest"
                  :contest-step="step"
                  :participant-token="participant.token"
                  :save-callback="saveCallback"
                  :change-callback="changedCallback"
                  :only-route-ids="contestJudge.contest_route_ids"
                />
              </v-card-text>
            </v-card>
          </v-dialog>

          <!-- WARNING CHANGES -->
          <v-dialog
            v-model="unsaveChangesModal"
            width="400"
            persistent
          >
            <v-card>
              <v-card-title>
                Attention !
              </v-card-title>
              <v-card-text>
                <p>
                  Des changements sur les résultats de <strong>{{ selectedParticipant?.name }}</strong> ne semble pas être sauvegardé !
                </p>
                <p class="mb-0">
                  Que voulez-vous faire ?
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  small
                  @click="closeJudgeModal(true)"
                >
                  Quitter sans sauvegarder
                </v-btn>
                <v-btn
                  class="ml-auto"
                  text
                  small
                  @click="unsaveChangesModal = false"
                >
                  Annuler
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <!-- TOAST MESSAGES -->
      <v-snackbar
        v-model="toast"
        :color="toastColor"
        elevation="0"
      >
        <span class="black--text">
          {{ toastMessage }}
        </span>
        <template #action="{ attrs }">
          <v-btn
            icon
            v-bind="attrs"
            @click="toast = false"
          >
            <v-icon color="black">
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </client-only>
  </v-container>
</template>

<script>
import { mdiClose, mdiTrophy, mdiMagnify } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import ContestJudgeInterfaceApi from '~/services/oblyk-api/ContestJudgeInterfaceApi'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import ContestParticipant from '~/models/ContestParticipant'
import ContestJudgeStep from '~/components/contests/ContestJudgeStep'

export default {
  components: { ContestJudgeStep },
  mixins: [ImageVariantHelpers],
  layout: 'blank',

  data () {
    return {
      loading: true,
      contestJudge: null,
      contest: null,
      locked: true,
      unLocking: false,
      code: null,
      token: null,
      loadingParticipants: true,
      participants: [],
      loadingRoutes: true,
      routes: [],
      toast: false,
      toastMessage: null,
      toastColor: 'primary',
      search: null,
      loadingParticipant: true,
      participantModal: false,
      selectedParticipant: null,
      participant: null,
      tabIndex: 0,
      routesRealisedKey: 0,
      resultsChanged: false,
      unsaveChangesModal: false,

      participantHeaders: [
        {
          text: 'Nom',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Catégorie',
          align: 'start',
          sortable: true,
          filtrable: false,
          value: 'category'
        }
      ],

      mdiClose,
      mdiTrophy,
      mdiMagnify
    }
  },

  computed: {
    participantItems () {
      const items = []
      for (const participant of this.participants) {
        items.push(
          {
            id: participant.id,
            name: `${participant.last_name.toUpperCase()} ${participant.first_name}`,
            category: participant.contest_category.name
          }
        )
      }
      return items
    }
  },

  mounted () {
    this.getJudge()
    const code = localStorage.getItem(`judge-code-${this.$route.params.contestJudgeUuid}`)
    if (code) {
      this.code = code
      this.unlock()
    }
  },

  methods: {
    unlock () {
      this.unLocking = true
      const localStorageKey = `judge-code-${this.$route.params.contestJudgeUuid}`
      new ContestJudgeInterfaceApi(this.$axios, this.$auth)
        .unlock(
          {
            gym_id: this.$route.params.gymId,
            contest_id: this.$route.params.contestId,
            uuid: this.$route.params.contestJudgeUuid,
            code: this.code
          }
        )
        .then((resp) => {
          if (resp.data.unlocked === true) {
            localStorage.setItem(localStorageKey, this.code)
            this.token = resp.data.token
            this.locked = false
            this.toastColor = '#66BB6A'
            this.toastMessage = 'Connecté'
            this.toast = true
            this.getParticipants()
          } else {
            this.toastColor = '#EF5350'
            this.toastMessage = 'Code invalide'
            this.toast = true
            localStorage.removeItem(localStorageKey)
          }
        })
        .finally(() => {
          this.unLocking = false
        })
    },

    getJudge () {
      this.loading = true
      new ContestJudgeInterfaceApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.contestId,
          this.$route.params.contestJudgeUuid
        )
        .then((resp) => {
          this.contestJudge = resp.data.contest_judge
          this.contest = resp.data.contest
        })
        .finally(() => {
          this.loading = false
        })
    },

    getParticipants () {
      this.loadingParticipants = true
      new ContestJudgeInterfaceApi(this.$axios, this.$auth)
        .participants(
          this.$route.params.gymId,
          this.$route.params.contestId,
          this.$route.params.contestJudgeUuid,
          this.token
        )
        .then((resp) => {
          this.participants = resp.data
        })
        .finally(() => {
          this.loadingParticipants = false
        })
    },

    getParticipant (participantId) {
      this.loadingParticipant = true
      this.participant = null
      this.resultsChanged = false
      this.routesRealisedKey += 1
      new ContestParticipantApi(this.$axios, this.$auth)
        .find(this.$route.params.gymId, this.$route.params.contestId, participantId)
        .then((resp) => {
          this.participant = new ContestParticipant({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingParticipant = false
        })
    },

    openJudgeModal (itemParticipant) {
      this.selectedParticipant = itemParticipant
      this.participantModal = true
      this.getParticipant(itemParticipant.id)
    },

    closeJudgeModal (force = false) {
      if (force || !this.resultsChanged) {
        this.participantModal = false
        this.unsaveChangesModal = false
      } else {
        this.unsaveChangesModal = true
      }
    },

    saveCallback () {
      this.toastColor = '#66BB6A'
      this.toastMessage = 'Résultats sauvegardés avec succès !'
      this.toast = true
    },

    changedCallback (changed) {
      this.resultsChanged = changed
    }
  }
}
</script>
