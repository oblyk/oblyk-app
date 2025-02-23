<template>
  <div>
    <spinner v-if="!gym" />
    <v-container v-else>
      <v-breadcrumbs :items="breadcrumbs" />

      <v-card v-if="gym.plan === 'free'">
        <v-card-title>
          Accéder au plein potentiel d'Oblyk pour les salles !
        </v-card-title>
        <v-card-subtitle>
          Passer au plan supérieur et débloquer tous les outils d'Oblyk en illimité
        </v-card-subtitle>
        <v-card-text>
          <p class="mb-2">
            <v-icon left color="deep-purple accent-4">
              {{ mdiCheckAll }}
            </v-icon>
            Tous ce que vous pouvez faire actuellement, plus :
          </p>
          <indoor-subscription-benefits />
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ml-auto"
            text
            outlined
            @click="freeTrialModal = true"
          >
            Essais gratuit
          </v-btn>
          <v-btn
            elevation="0"
            color="deep-purple accent-4"
            dark
            @click="paidModal = true"
          >
            {{ $t('actions.subscribeNow') }}
            <v-icon right>
              {{ mdiCreation }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <div v-else>
        Mon plan actuelle :
        <v-chip outlined>
          <v-icon
            left
            color="deep-purple accent-4"
          >
            {{ planIcons[gym.plan] }}
          </v-icon>
          <strong>
            {{ $t(`models.gym.plan_list.${gym.plan}`) }}
          </strong>
        </v-chip>
      </div>

      <div
        v-if="!loadingSubscription && subscriptions.length > 0"
        class="mt-3"
      >
        <h4 class="mb-2">
          Mes abonnements
          <v-btn
            small
            icon
            @click="getSubscriptions"
          >
            <v-icon small>
              {{ mdiRefresh }}
            </v-icon>
          </v-btn>
        </h4>
        <indoor-subscription-card
          v-for="(subscription, subscriptionIndex) in subscriptions"
          :key="`subscription-index-${subscriptionIndex}`"
          :indoor-subscription="subscription"
          :gym="gym"
        />
      </div>

      <!-- Free Trial Modal -->
      <v-dialog
        v-model="freeTrialModal"
        max-width="600"
      >
        <v-card>
          <v-card-title>
            Commencer mon essais gratuit
          </v-card-title>
          <v-card-text>
            <div v-if="freeTrialIsAvailable">
              <p>
                Essayez toutes les fonctionnalités avancées d'Oblyk <strong>gratuitement</strong> pendant un mois !
              </p>
              <p>
                <strong>Bon à savoir :</strong> À la fin de la période d'essais vous ne serez <strong>pas reconduit automatiquement</strong> sur la version payante.
              </p>
            </div>
            <div v-else>
              <p>Vous avez déjà profité de la période d'essais.</p>
              <p>
                Vous avec besoin de plus de temps ?<br>
                Contactez-nous : <a href="mailto:ekip@oblyk.org">ekip@oblyk.org</a><br>
                On pourra peut-être faire quelque chose 🙂
              </p>
            </div>
          </v-card-text>
          <v-card-actions
            v-if="freeTrialIsAvailable"
          >
            <v-btn
              class="ml-auto"
              elevation="0"
              dark
              color="deep-purple accent-4"
              :loading="startFreeTrialLoading"
              @click="startFreeTrial()"
            >
              Commencer ma période d'essais !
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Paid Modal -->
      <v-dialog
        v-model="paidModal"
        max-width="500"
      >
        <get-indoor-subscription-card
          :gym="gym"
          :close-callback="closePaidModal"
          :reload-subscriptions-callback="getSubscriptions"
        />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import {
  mdiArrowUpBoldHexagonOutline,
  mdiCheckAll,
  mdiCreation,
  mdiCurrencyEurOff,
  mdiRefresh
} from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import IndoorSubscriptionApi from '~/services/oblyk-api/IndoorSubscriptionApi'
import Spinner from '~/components/layouts/Spiner'
import IndoorSubscription from '~/models/IndoorSubscription'
import IndoorSubscriptionCard from '~/components/indoorSubscription/IndoorSubscriptionCard.vue'
import GetIndoorSubscriptionCard from '~/components/indoorSubscription/GetIndoorSubscriptionCard.vue'
import IndoorSubscriptionBenefits from '~/components/indoorSubscription/IndoorSubscriptionBenefits.vue'

export default {
  components: { IndoorSubscriptionBenefits, GetIndoorSubscriptionCard, IndoorSubscriptionCard, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],

  data () {
    return {
      loadingSubscription: true,
      loadingGymBillingAccount: true,
      gymBillingAccount: null,
      subscriptions: [],
      paidModal: false,
      freeTrialModal: false,
      startFreeTrialLoading: false,
      freeTrialIsAvailable: false,

      planIcons: {
        free: mdiCurrencyEurOff,
        free_trial: mdiArrowUpBoldHexagonOutline,
        full_package: mdiCreation
      },

      mdiCheckAll,
      mdiCreation,
      mdiRefresh
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes abonnements'
      },
      en: {
        metaTitle: 'My subscriptions'
      }
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: this.gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.subscriptions'),
          to: `${this.gym?.adminPath}/indoor-subscriptions`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getFigures()
    this.getSubscriptions()
  },

  methods: {
    getFigures () {
      new IndoorSubscriptionApi(this.$axios, this.$auth)
        .figures(this.$route.params.gymId)
        .then((resp) => {
          this.freeTrialIsAvailable = resp.data.free_trial_is_available
        })
    },

    getSubscriptions () {
      this.loadingSubscription = true
      new IndoorSubscriptionApi(this.$axios, this.$auth)
        .list(this.$route.params.gymId)
        .then((resp) => {
          this.subscriptions = []
          for (const subscription of resp.data) {
            this.subscriptions.push(new IndoorSubscription({ attributes: subscription }))
          }
        })
        .finally(() => {
          this.loadingSubscription = false
        })
    },

    startFreeTrial () {
      this.startFreeTrialLoading = true
      new IndoorSubscriptionApi(this.$axios, this.$auth)
        .startFreeTrial(this.gym.id)
        .then(() => {
          this.gym.plan = 'free_trial'
          this.getSubscriptions()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'indoorSubscription')
        })
        .finally(() => {
          this.freeTrialModal = false
          this.startFreeTrialLoading = false
        })
    },

    closePaidModal () {
      this.paidModal = false
    }
  }
}
</script>
