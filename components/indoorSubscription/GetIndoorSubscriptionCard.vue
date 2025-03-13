<template>
  <v-card>
    <v-card-title class="pb-0 d-flex">
      <div class="mr-auto">
        Passez au niveau supérieur !
      </div>
      <v-btn
        icon
        @click="closeCallback"
      >
        <v-icon>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-stepper
      v-model="step"
      elevation="0"
    >
      <v-stepper-header style="box-shadow: none">
        <v-stepper-step
          :complete="step > 1"
          color="deep-purple accent-4"
          step="1"
        >
          Info
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="step > 2"
          color="deep-purple accent-4"
          step="2"
        >
          Options
        </v-stepper-step>
        <v-divider />
        <v-stepper-step
          :complete="step > 3"
          color="deep-purple accent-4"
          step="3"
        >
          Paiement
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          step="1"
          class="pt-0"
        >
          <p>
            Vous êtes sur le point de souscrire à un abonnement Oblyk Indoor, et nous vous en remercions !
          </p>
          <p>
            Merci de prendre connaissance des points suivant avant de continuer.
          </p>
          <div class="rounded px-3 py-1 mb-3" style="background-color: rgba(150, 150, 150, 0.15)">
            <strong>
              <v-icon
                small
                class="mr-1 vertical-align-text-top"
                color="deep-purple accent-4"
              >
                {{ mdiRefresh }}
              </v-icon>
              Renouvellement
            </strong><br>
            Votre abonnement sera automatiquement renouvellé mensuellement ou annuellement selon votre choix.
          </div>
          <div class="rounded px-3 py-1 mb-3" style="background-color: rgba(150, 150, 150, 0.15)">
            <strong>
              <v-icon
                small
                class="mr-1 vertical-align-text-top"
                color="deep-purple accent-4"
              >
                {{ mdiScaleBalance }}
              </v-icon>
              Engagement
            </strong><br>
            Vous pouvez résilier votre abonnement à tout moment.
          </div>
          <div class="rounded px-3 py-1 mb-3" style="background-color: rgba(150, 150, 150, 0.15)">
            <strong>
              <v-icon
                small
                class="mr-1 vertical-align-text-top"
                color="deep-purple accent-4"
              >
                {{ mdiCashRefund }}
              </v-icon>
              Remboursement
            </strong><br>
            Chaque période commencée est due.
          </div>
          <div
            v-if="!gym.have_indoor_subscriptions"
            class="rounded px-3 py-1 mb-3"
            style="background-color: rgba(150, 150, 150, 0.15)"
          >
            <strong>
              <v-icon
                small
                class="mr-1 vertical-align-text-top"
                color="deep-purple accent-4"
              >
                {{ mdiArrowUpBoldHexagonOutline }}
              </v-icon>
              Période d'essais
            </strong><br>
            Vous bénéficierez d'une période d'essai de 28 jours !
          </div>
          <div class="text-right">
            <v-btn
              elevation="0"
              dark
              color="deep-purple accent-4"
              @click="nextStep"
            >
              {{ $t('actions.next') }}
              <v-icon right>
                {{ mdiArrowRight }}
              </v-icon>
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content
          step="2"
          class="pt-0"
        >
          <p>
            Vous pouvez être facturé annuellement ou mensuellement.<br>
            Veuillez choisir votre fréquence de facturation :
          </p>
          <v-skeleton-loader
            v-if="loadingSubscriptionProduct"
            type="list-item-avatar,list-item-avatar"
            class="mb-4"
          />
          <v-list
            v-else
            rounded
            class="px-0"
          >
            <v-list-item-group
              v-model="data.indoor_subscription_product_id"
              color="deep-purple accent-4"
            >
              <v-list-item
                v-for="(product, productIndex) in indoorSubscriptionProducts"
                :key="`product-index-${productIndex}`"
                :value="product.id"
              >
                <v-list-item-icon class="text-center ml-1 mr-4">
                  <div class="d-flex flex-column">
                    <strong style="font-size: 1.75em">
                      {{ humanizeAmount(product.price) }}
                    </strong>
                    <small v-if="product.month_by_occurrence === 12" class="mt-n2">
                      par an
                    </small>
                    <small v-else-if="product.month_by_occurrence > 1" class="mt-n2">
                      par {{ product.month_by_occurrence }} mois
                    </small>
                    <small v-else class="mt-n2">
                      par mois
                    </small>
                  </div>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Abonnement <strong>{{ textByMonth[product.month_by_occurrence] }}</strong>
                    <v-chip
                      v-if="product.recommended"
                      outlined
                      small
                      class="font-weight-bold ml-1"
                      color="deep-purple accent-4"
                    >
                      recommandé
                    </v-chip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span v-if="product.month_by_occurrence === 12">
                      Soit {{ (product.price.cents / 100 / 12).toLocaleString() }} € / mois
                    </span>
                    <span v-else-if="product.month_by_occurrence > 1">
                      Soit {{ (product.price.cents / 100 / product.month_by_occurrence).toLocaleString() }} € / mois
                      ou {{ (product.price.cents / 100 * (12 / product.month_by_occurrence)).toLocaleString() }} € / an
                    </span>
                    <span v-else>
                      Soit {{ ((product.price.cents * 12) / 100).toLocaleString() }} € / an
                    </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <p class="text--disabled">
            * Oblyk SAS n'est pas assujettie à la TVA, les prix sont indiqué en HT.
          </p>
          <div class="d-flex">
            <v-btn
              icon
              @click="previousStep"
            >
              <v-icon>
                {{ mdiArrowLeft }}
              </v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              dark
              :disabled="data.indoor_subscription_product_id === null"
              color="deep-purple accent-4 ml-auto"
              @click="nextStep"
            >
              {{ $t('actions.next') }}
              <v-icon right>
                {{ mdiArrowRight }}
              </v-icon>
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content
          step="3"
          class="pt-0"
        >
          <div v-if="indoorSubscriptionProduct">
            <p>
              Vous êtes sur le poins de souscrire à un abonnement <strong>{{ textByMonth[indoorSubscriptionProduct.month_by_occurrence] }}</strong>
              de <strong>{{ humanizeAmount(indoorSubscriptionProduct.price) }}</strong> renouvelable automatiquement tous les <strong>{{ indoorSubscriptionProduct.month_by_occurrence === 1 ? 'mois' : 'ans' }}</strong>.
            </p>
            <p v-if="!gym.have_indoor_subscriptions">
              La facturation commencera après votre période d'essais gratuite de 28 jours. Vous pouvez arrêter votre période d'essai à tout moment.
            </p>
            <p>
              En cliquant sur <strong>"m'abonner"</strong> vous serez redirigé sur "Stripe" pour procéder au paiement.
            </p>
            <v-text-field
              v-model="data.billing_account_email"
              outlined
              color="deep-purple accent-4"
              label="Email de facturation"
            />
            <div class="d-flex">
              <v-btn
                icon
                @click="previousStep"
              >
                <v-icon>
                  {{ mdiArrowLeft }}
                </v-icon>
              </v-btn>
              <v-btn
                elevation="0"
                dark
                :loading="loadingCreateIndoorSubscription"
                color="deep-purple accent-4 ml-auto"
                :disabled="(data.billing_account_email === null || data.billing_account_email === '')"
                @click="createIndoorSubscription"
              >
                {{ $t('actions.subscribeNow') }} !
              </v-btn>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import {
  mdiArrowRight,
  mdiArrowLeft,
  mdiDotsCircle,
  mdiRefresh,
  mdiScaleBalance,
  mdiCashRefund,
  mdiPlus,
  mdiClose,
  mdiArrowUpBoldHexagonOutline
} from '@mdi/js'
import { MoneyHelpers } from '~/mixins/MoneyHelpers'
import IndoorSubscriptionProductApi from '~/services/oblyk-api/IndoorSubscriptionProductApi'
import GymBillingAccountApi from '~/services/oblyk-api/GymBillingAccountApi'
import GymBillingAccount from '~/models/GymBillingAccount'
import IndoorSubscriptionApi from '~/services/oblyk-api/IndoorSubscriptionApi'

export default {
  name: 'GetIndoorSubscriptionCard',
  mixins: [MoneyHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    closeCallback: {
      type: Function,
      default: null
    },
    reloadSubscriptionsCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      step: 1,
      loadingSubscriptionProduct: true,
      loadingGymBillingAccount: false,
      indoorSubscriptionProducts: [],
      gymBillingAccount: null,
      createBillingAccountModal: false,
      loadingCreateIndoorSubscription: false,
      data: {
        indoor_subscription_product_id: null,
        billing_account_email: this.gym.email
      },

      textByMonth: {
        1: 'Mensuel',
        3: 'Trimestriel',
        6: 'Semestriel',
        12: 'Annuel'
      },

      mdiArrowRight,
      mdiArrowLeft,
      mdiDotsCircle,
      mdiRefresh,
      mdiScaleBalance,
      mdiCashRefund,
      mdiPlus,
      mdiClose,
      mdiArrowUpBoldHexagonOutline
    }
  },

  computed: {
    indoorSubscriptionProduct () {
      if (this.indoorSubscriptionProducts.length === 0) {
        return null
      }

      return this.indoorSubscriptionProducts.find(indoorSubscription => indoorSubscription.id === this.data.indoor_subscription_product_id)
    }
  },

  mounted () {
    this.getIndoorSubscriptionProduct()
    if (this.gym.gym_billing_account_id) {
      this.getBillingAccount()
    }
  },

  methods: {
    getIndoorSubscriptionProduct () {
      this.loadingSubscriptionProduct = true
      new IndoorSubscriptionProductApi(this.$axios, this.$auth)
        .list(this.gym.id)
        .then((resp) => {
          this.indoorSubscriptionProducts = []
          for (const indoorSubscriptionProduct of resp.data) {
            this.indoorSubscriptionProducts.push(indoorSubscriptionProduct)
          }
        })
        .finally(() => {
          this.loadingSubscriptionProduct = false
        })
    },

    previousStep () {
      this.step -= 1
    },

    nextStep () {
      this.step += 1
    },

    getBillingAccount () {
      this.loadingGymBillingAccount = true
      new GymBillingAccountApi(this.$axios, this.$auth)
        .find(this.gym.id, this.gym.gym_billing_account_id)
        .then((resp) => {
          this.gymBillingAccount = new GymBillingAccount({ attributes: resp.data })
          this.data.billing_account_email = this.gymBillingAccount.email || this.gym.email
        })
        .finally(() => {
          this.loadingGymBillingAccount = false
        })
    },

    createIndoorSubscription () {
      this.loadingCreateIndoorSubscription = true
      new IndoorSubscriptionApi(this.$axios, this.$auth)
        .create(this.gym.id, this.data)
        .then((resp) => {
          window.open(resp.data.payment_link, '_blank').focus()
          this.reloadSubscriptionsCallback()
        })
        .finally(() => {
          this.loadingCreateIndoorSubscription = false
          this.closeCallback()
        })
    }
  }
}
</script>
