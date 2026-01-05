<template>
  <div>
    <div
      v-if="ffmeContest"
      class="border pl-2 my-2 rounded-sm"
    >
      <div
        class="mb-0 font-weight-bold d-flex align-center"
        @click="showDetail = !showDetail"
      >
        <v-icon large left>
          {{ oblykFfmeVerticalSeries }}
        </v-icon>
        Vertical Series By FFME
        <v-btn
          class="ml-auto"
          icon
        >
          <v-icon>
            {{ showDetail ? mdiChevronUp : mdiChevronDown }}
          </v-icon>
        </v-btn>
      </div>
      <div
        v-if="showDetail"
        class="pb-2 pr-2"
      >
        <p class="mb-0">
          {{ $t('models.ffmeContest.status') }} :
          <v-chip outlined small>
            {{ $t(`models.ffmeContest.statusSteps.${ffmeContest.status}`) }}
          </v-chip>
        </p>
        <p v-if="ffmeContest.status === 'draft'">
          Vous pouvez envoyer les résultats entre le <strong class="text-decoration-underline">{{ humanizeDate(ffmeContest.min_send_date) }}</strong> et le <strong class="text-decoration-underline">mardi {{ humanizeDate(ffmeContest.max_send_date) }} à minuit</strong>.
        </p>
        <p v-else>
          Vous pouvez renvoyer les résultats pour correction jusqu'au <strong class="text-decoration-underline">mardi {{ humanizeDate(ffmeContest.max_send_date) }} à minuit</strong>.
        </p>
        <div class="d-flex">
          <v-btn
            v-if="ffmeContest.status !== 'draft'"
            color="primary"
            elevation="0"
            small
            @click="linkResultModal = true"
          >
            Résultat
          </v-btn>
          <v-btn
            class="ml-auto"
            text
            small
            @click="openModal"
          >
            <v-icon left small>
              {{ mdiPencil }}
            </v-icon>
            {{ $t('actions.edit') }}
          </v-btn>
          <v-btn
            outlined
            small
            text
            @click="openSendModal"
          >
            <v-icon left small>
              {{ mdiSend }}
            </v-icon>
            {{ ffmeContest.status !== 'result_sent' ? 'Envoyer les résultats' : 'Ré envoyer les résultats' }}
          </v-btn>
        </div>
      </div>
    </div>

    <!-- MY COMPET MODAL -->
    <v-dialog
      v-model="ffmeContestModal"
      max-width="800"
    >
      <v-card>
        <v-card-title>
          <v-icon left large>
            {{ oblykFfmeVerticalSeries }}
          </v-icon>
          FFME Vertical Series
        </v-card-title>
        <div class="px-4 pb-4">
          <p>Lier votre contest au Vertical Series de la FFME</p>
          <ffme-contest-form
            :contest="contest"
            :ffme-contest="ffmeContest"
            :submit-methode="contest.ffme_contest?.id ? 'put' : 'post'"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- SEND MODAL -->
    <v-dialog
      v-model="sendModal"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <v-icon left large>
            {{ oblykFfmeVerticalSeries }}
          </v-icon>
          Envoyez les résultats aux Vertical Series
        </v-card-title>
        <div class="px-4 pb-4">
          <p>Vérifions les points suivants :</p>
          <v-checkbox
            v-model="contestEnd"
            label="Votre contest est fini ?"
            hide-details
          />
          <v-checkbox
            v-model="finalsAreCompleted"
            label="Vous avez consigné les résultats des finals si vous en avez ?"
            hide-details
          />
          <v-checkbox
            v-model="rankingIsGood"
            label="Le classement général est bon ?"
            hide-details
          />
          <div class="text-center mt-4">
            <v-btn
              color="primary"
              elevation="O"
              :loading="loadingSendResults"
              :disabled="!(contestEnd && finalsAreCompleted && rankingIsGood)"
              @click="sendResults"
            >
              <v-icon left small>
                {{ mdiSend }}
              </v-icon>
              Envoyer !
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- RESULT LINK MODAL -->
    <v-dialog
      v-model="linkResultModal"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <v-icon left large>
            {{ oblykFfmeVerticalSeries }}
          </v-icon>
          Les résultats
        </v-card-title>
        <div class="px-4 pb-4">
          <p>
            Vous pouvez consulter les résultats envoyé à la FFME via le bouton ci-dessous.
            Mais sachez que les résultats sont compilé dans la nuit du mardi, donc vous pourriez ne pas voir vos résultats instantanément.
          </p>
          <div class="text-center mt-4">
            <v-btn
              color="primary"
              elevation="O"
              :loading="loadingGetLink"
              @click="getLink"
            >
              <v-icon left small>
                {{ mdiOpenInNew }}
              </v-icon>
              Voir les résultats
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiPencil, mdiSend, mdiChevronUp, mdiChevronDown, mdiOpenInNew } from '@mdi/js'
import { oblykFfmeVerticalSeries } from '~/assets/oblyk-icons'
import { DateHelpers } from '~/mixins/DateHelpers'
import FfmeContestApi from '~/services/oblyk-api/FfmeContestApi'
import FfmeContestForm from '~/components/ffmeContests/forms/FfmeContestForm'

export default {
  name: 'FfmeContestCard',
  components: { FfmeContestForm },
  mixins: [DateHelpers],
  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showDetail: false,
      ffmeContest: null,
      loadingFfmeContest: false,
      ffmeContestModal: false,
      sendModal: false,
      loadingSendResults: false,
      loadingGetLink: false,
      linkResultModal: false,

      contestEnd: false,
      finalsAreCompleted: false,
      rankingIsGood: false,

      oblykFfmeVerticalSeries,
      mdiPencil,
      mdiSend,
      mdiChevronUp,
      mdiChevronDown,
      mdiOpenInNew
    }
  },

  mounted () {
    this.getFfmeContest()
  },

  methods: {
    getFfmeContest () {
      if (this.contest.ffme_contest?.id) {
        this.loadingFfmeContest = true
        new FfmeContestApi(this.$axios, this.$auth)
          .find(this.contest, this.contest.ffme_contest.id)
          .then((resp) => {
            this.ffmeContest = resp.data
          })
          .finally(() => {
            this.loadingFfmeContest = false
          })
      }
    },

    sendResults () {
      this.loadingSendResults = true
      new FfmeContestApi(this.$axios, this.$auth)
        .sendResults(this.contest.gym_id, this.contest.id, this.ffmeContest.id)
        .then((resp) => {
          this.ffmeContest = resp.data
          this.sendModal = false
        })
        .finally(() => {
          this.loadingSendResults = false
        })
    },

    openModal () {
      this.ffmeContestModal = true
    },

    openSendModal () {
      this.sendModal = true
    },

    getLink () {
      this.loadingGetLink = true
      new FfmeContestApi(this.$axios, this.$auth)
        .getLink(this.contest.gym_id, this.contest.id, this.ffmeContest.id)
        .then((resp) => {
          window.open(resp.data.link, '_blank').focus()
        })
        .finally(() => {
          this.loadingGetLink = false
          this.linkResultModal = false
        })
    }
  }
}
</script>
