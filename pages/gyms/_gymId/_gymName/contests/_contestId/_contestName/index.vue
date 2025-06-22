<template>
  <v-sheet
    rounded
    class="pa-4 mt-4"
  >
    <v-alert
      v-if="contest.draft"
      text
      type="warning"
      class="mt-4"
    >
      {{ $t('components.contest.unPublish', { name: contest.gym.name }) }}
    </v-alert>
    <v-row>
      <v-col>
        <v-sheet class="rounded pa-4 back-app-color full-height">
          <client-only>
            <markdown-text
              v-if="contest.description"
              :text="contest.description"
            />
          </client-only>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="5"
      >
        <p class="font-weight-bold mb-1">
          <v-icon
            color="primary"
            class="vertical-align-middle mt-n1"
            small
            left
          >
            {{ mdiInformationOutline }}
          </v-icon>
          {{ $t('common.inBrief') }}
        </p>
        <div class="border pa-2 rounded-sm">
          <p
            v-if="contest.total_capacity"
            class="mb-1"
            v-html="$tc('components.contest.remainingPlaces', contest.remaining_places, { count: contest.remaining_places })"
          />
          <p
            v-if="contest.coming && !contest.ongoing"
            class="mb-0"
          >
            {{ $t('common.start') }} <strong class="font-weight-black text-h6">{{ dateFromNow(contest.start_date) }}</strong>
          </p>
          <p
            v-if="contest.ongoing"
            class="mb-0"
          >
            {{ $t('common.ongoing') }}
          </p>
          <p
            v-if="contest.finished"
            class="mb-0"
          >
            {{ $t('common.at') }} {{ humanizeDate(contest.start_date) }}
          </p>
        </div>
        <p class="font-weight-bold mb-1 mt-4">
          <v-icon
            color="primary"
            class="vertical-align-middle mt-n1"
            small
            left
          >
            {{ mdiMapMarker }}
          </v-icon>
          {{ $t('components.contest.where') }}
        </p>
        <gym-small-card
          :gym="contest.Gym"
          bordered
          small
        />
        <client-only>
          <div
            v-if="!token"
            class="text-center mt-4"
          >
            <div v-if="contest.authorise_public_subscription && contest.subscription_opened && (!contest.total_capacity || contest.remaining_places > 0)">
              <v-btn
                class="rounded-sm"
                color="primary"
                elevation="0"
                large
                @click="subscribeDialog = true"
              >
                {{ $t('components.contest.registerNow') }}
              </v-btn>
            </div>
            <div
              v-if="contest.authentification_opened"
              class="mt-1"
            >
              <v-btn
                text
                @click="haveCodeDialog = true"
              >
                {{ $t('components.contest.alreadyRegistered') }}
              </v-btn>
            </div>
            <div
              v-if="!contest.subscription_opened && contest.coming"
              class="mt-1"
            >
              <p class="mb-0 font-weight-bold">
                {{ $t('components.contest.notOpenYet') }}
              </p>
              <p>
                {{ $t('components.contest.comeBackOn', { date: humanizeDate(contest.subscription_start_date) }) }}
              </p>
            </div>

            <!-- Contest subscribe dialog -->
            <v-dialog
              v-model="subscribeDialog"
              width="650"
            >
              <div v-if="token">
                {{ token }}
              </div>
              <contest-subscribe-form
                v-else
                :contest="contest"
                :callback="successCallback"
                submit-methode="post"
              />
            </v-dialog>

            <!-- Authenticate with token dialog -->
            <v-dialog
              v-model="haveCodeDialog"
              width="500"
            >
              <v-card>
                <v-card-title>
                  {{ $t('components.contest.iAmRegistered') }}
                </v-card-title>
                <div class="px-5 pb-4">
                  <p v-html="$t('components.contest.registeredPart1')" />
                  <p
                    v-if="authenticateFailed"
                    class="red--text"
                    v-html="$t('components.contest.registeredPart2')"
                  />
                  <v-form @submit.prevent="authenticate">
                    <v-text-field
                      v-model="authentificationToken"
                      label="Mon code d'authentification"
                      outlined
                      hide-details
                    />
                    <div class="text-right mt-2">
                      <v-btn
                        elevation="0"
                        color="primary"
                        :loading="loadingAuthenticate"
                        @click.prevent="authenticate"
                      >
                        {{ $t('actions.authenticateMe') }}
                      </v-btn>
                    </div>
                  </v-form>
                </div>
              </v-card>
            </v-dialog>
          </div>
          <div v-if="token">
            <p
              id="token-explain"
              class="font-weight-bold mb-1 mt-4"
            >
              <v-icon
                color="primary"
                class="vertical-align-middle mt-n1"
                small
                left
              >
                {{ mdiCheckboxMarkedOutline }}
              </v-icon>
              {{ $t('components.contest.youAreRegisteredAt', { name: contest.name }) }}
            </p>
            <div class="border rounded pa-3 pt-2">
              <p>
                {{ $t('components.contest.useTheCode') }}
              </p>
              <div
                class="border rounded pa-4 text-center d-flex mb-3"
                :class="$vuetify.theme.dark ? 'green darken-5' : 'green lighten-5'"
                style="font-size: 1.5em"
              >
                <div class="font-weight-bold">
                  {{ token }}
                </div>
                <div class="ml-auto">
                  <copy-btn :message="token" />
                </div>
              </div>
              <p class="text--disabled">
                {{ $t('components.contest.codeIsSaved') }}
              </p>
              <div class="text-right">
                <v-btn
                  text
                  outlined
                  @click="resetToken"
                >
                  {{ $t('actions.otherRegistration') }}
                </v-btn>
              </div>
            </div>

            <div class="text-right mt-3">
              <v-btn
                v-if="token"
                text
                outlined
                block
                color="primary"
                @click="goToMyContest()"
              >
                {{ $t('actions.entryResult') }}
              </v-btn>
            </div>
          </div>
        </client-only>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import {
  mdiMapMarker,
  mdiCheckboxMarkedOutline,
  mdiInformationOutline
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import MarkdownText from '~/components/ui/MarkdownText'
import GymSmallCard from '~/components/gyms/GymSmallCard'
import ContestSubscribeForm from '~/components/contests/forms/ContestSubscribeForm.vue'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import CopyBtn from '~/components/ui/CopyBtn.vue'

export default {
  components: { CopyBtn, ContestSubscribeForm, GymSmallCard, MarkdownText },
  meta: { orphanRoute: true },
  mixins: [DateHelpers],
  layout: 'contest',

  props: {
    contest: {
      type: Object,
      required: true
    },
    updateToken: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      subscribeDialog: false,
      haveCodeDialog: false,
      token: this.$store.getters['contestToken/getContestToken'](this.contest.id),
      authentificationToken: null,
      loadingAuthenticate: false,
      authenticateFailed: false,

      mdiMapMarker,
      mdiCheckboxMarkedOutline,
      mdiInformationOutline
    }
  },

  methods: {
    successCallback (token, goToExplain = true) {
      this.token = token
      this.updateToken(token)
      this.subscribeDialog = false
      this.$store.dispatch('contestToken/setContestToken', { contestId: this.contest.id, token })
      if (goToExplain) {
        setTimeout(() => {
          const explainToken = document.querySelector('#token-explain')
          explainToken.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 500)
      }
    },

    resetToken () {
      this.token = null
      this.$store.dispatch('contestToken/resetToken', this.contest.id)
    },

    authenticate () {
      this.loadingAuthenticate = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .participant(
          this.contest.gym_id,
          this.contest.id,
          this.authentificationToken
        )
        .then((resp) => {
          this.successCallback(resp.data.token, false)
          this.haveCodeDialog = false
          this.authentificationToken = null
        })
        .catch(() => {
          this.authenticateFailed = true
        })
        .finally(() => {
          this.loadingAuthenticate = false
        })
    },

    goToMyContest () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.$router.push(`${this.contest.path}/my-contest`)
    }
  }
}
</script>
