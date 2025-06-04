<template>
  <v-card class="mb-4">
    <v-card-title class="pb-3">
      {{ subscription.name }}
    </v-card-title>
    <v-card-subtitle class="pb-2">
      <v-chip
        v-if="subscription.active_subscription && subscription.payment_status === 'paid'"
        x-small
        outlined
      >
        Actif
      </v-chip>
      <v-chip
        v-if="subscription.active_subscription && subscription.payment_status === 'waiting_first_payment'"
        x-small
        color="amber"
      >
        en attente
      </v-chip>
      <v-chip
        v-if="subscription.expired_subscription"
        x-small
        outlined
      >
        Expiré
      </v-chip>
      <small class="font-weight-bold ml-1">
        Salles :
      </small>
      <small>
        {{ gyms }}
      </small>
    </v-card-subtitle>
    <v-card-text>
      <div v-if="subscription.payment_status === 'waiting_first_payment'">
        <v-alert
          color="info"
          text
          class="mb-0"
        >
          <v-row no-gutters>
            <v-col class="grow" align-self="center">
              Attente de confirmation du paiement
            </v-col>
            <v-col class="shrink">
              <v-btn
                text
                :loading="loading"
                color="info"
                @click="getSubscription"
              >
                <v-icon left>
                  {{ mdiRefresh }}
                </v-icon>
                {{ $t('actions.refresh') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <p class="mb-6">
          * Pour démarre votre période d'essai vous devez renseigner un moyen de paiement. Il ne sera utilisé et sauvegardé uniquement si vous continuez après votre période d'essais.
        </p>
        <div class="text-right">
          <v-btn
            color="deep-purple accent-4"
            elevation="0"
            dark
            :href="subscription.payment_link"
          >
            Continuer
            <v-icon right>
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div v-if="subscription.payment_status === 'paid'">
        <div
          v-if="subscription.in_free_trial"
          class="mb-2"
        >
          <v-chip outlined>
            <v-icon left color="deep-purple accent-4">
              {{ mdiArrowUpBoldHexagonOutline }}
            </v-icon>
            Période d'essais jusqu'au {{ humanizeDate(subscription.trial_end_date) }}
          </v-chip>
        </div>
        <p class="mb-0">
          À débuté le : <strong>{{ humanizeDate(subscription.start_date) }}</strong>
        </p>
        <p
          v-if="subscription.end_date"
          class="mb-0"
        >
          Fin le : <strong>{{ humanizeDate(subscription.end_date) }}</strong>
        </p>
        <p class="mt-2 mb-1">
          <strong>Factures & Moyen de paiement :</strong>
        </p>
        <div class="mt-1">
          <v-btn
            v-if="subscription.active_subscription"
            outlined
            small
            text
            @click="goToStipeSession"
          >
            <v-icon left>
              {{ mdiFileDocumentEdit }}
            </v-icon>
            Éditer mes informations de facturation
          </v-btn>
        </div>
        <div class="mt-1">
          <v-btn
            v-if="subscription.active_subscription"
            outlined
            small
            text
            @click="goToStipeSession"
          >
            <v-icon left>
              {{ mdiCreditCard }}
            </v-icon>
            Gérer mon moyen de paiement
          </v-btn>
        </div>
        <div class="mt-1">
          <v-btn
            outlined
            small
            text
            @click="goToStipeSession"
          >
            <v-icon left>
              {{ mdiFileDocument }}
            </v-icon>
            Mes factures
          </v-btn>
        </div>
      </div>
    </v-card-text>
    <v-card-actions v-if="subscription.have_stripe_subscription && subscription.active_subscription">
      <v-btn
        v-if="subscription.end_date"
        color="deep-purple accent-4"
        elevation="0"
        dark
        class="ml-auto"
        @click="goToStipeSession"
      >
        <v-icon left>
          {{ mdiCreation }}
        </v-icon>
        Réactiver mon abonnement
      </v-btn>
      <v-btn
        v-else
        text
        outlined
        class="ml-auto"
        @click="goToStipeSession"
      >
        Gérer mon abonnement
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  mdiRefresh,
  mdiArrowUpBoldHexagonOutline,
  mdiFileDocument,
  mdiCreditCard,
  mdiFileDocumentEdit,
  mdiArrowRight,
  mdiCreation
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { MoneyHelpers } from '~/mixins/MoneyHelpers'
import IndoorSubscriptionApi from '~/services/oblyk-api/IndoorSubscriptionApi'
import IndoorSubscription from '~/models/IndoorSubscription'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'IndoorSubscriptionCard',
  mixins: [DateHelpers, MoneyHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },

    indoorSubscription: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      subscription: this.indoorSubscription,
      loading: false,
      loadingStripeSession: false,

      mdiRefresh,
      mdiArrowUpBoldHexagonOutline,
      mdiFileDocument,
      mdiCreditCard,
      mdiFileDocumentEdit,
      mdiArrowRight,
      mdiCreation
    }
  },

  computed: {
    gyms () {
      return this.subscription.gyms.map(gym => gym.name).join(' · ')
    }
  },

  methods: {
    getSubscription () {
      this.loading = true
      new IndoorSubscriptionApi(this.$axios, this.$auth)
        .find(this.gym.id, this.indoorSubscription.id)
        .then((resp) => {
          this.subscription = new IndoorSubscription({ attributes: resp.data })
        })
        .finally(() => {
          this.loading = false
        })
    },

    goToStipeSession () {
      this.loadingStripeSession = true
      new GymApi(this.$axios, this.$auth)
        .stripeCustomerPortal(this.gym.id)
        .then((resp) => {
          window.open(resp.data.url, '_blank').focus()
        })
        .finally(() => {
          this.loadingStripeSession = false
        })
    }
  }
}
</script>
