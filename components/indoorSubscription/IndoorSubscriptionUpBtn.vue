<template>
  <v-dialog
    v-model="modal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="deep-purple accent-4"
        icon
        :small="small"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ mdiArrowUpBoldHexagonOutline }}
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-icon
          color="deep-purple accent-4"
          left
        >
          {{ mdiArrowUpBoldHexagonOutline }}
        </v-icon>
        Passez au niveau supérieur !
      </v-card-title>
      <v-card-text>
        <p>
          Pour utiliser cette fonctionnalité vous avez besoin de la <strong>version complète</strong> d'Oblyk Indoor.
        </p>
        <p class="mb-1">
          En plus des fonctionnalités gratuites, accédez à :
        </p>
        <indoor-subscription-benefits />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          class="ml-auto"
          color="deep-purple accent-4"
          :to="`${gym.adminPath}/indoor-subscriptions`"
        >
          M'Abonner !
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiArrowUpBoldHexagonOutline } from '@mdi/js'
import IndoorSubscriptionBenefits from '~/components/indoorSubscription/IndoorSubscriptionBenefits.vue'

export default {
  name: 'IndoorSubscriptionUpBtn',
  components: { IndoorSubscriptionBenefits },
  props: {
    gym: {
      type: Object,
      required: true
    },
    small: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      modal: false,

      mdiArrowUpBoldHexagonOutline
    }
  }
}
</script>
