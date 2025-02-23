<template>
  <v-alert
    v-if="gym.plan === 'free'"
    class="rounded pa-4 mb-4"
    color="deep-purple accent-4"
    text
    prominent
    :icon="mdiArrowUpBoldHexagonOutline"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ textes[feature] }}
      </v-col>
      <v-col class="shrink">
        <v-btn
          text
          color="deep-purple accent-4"
          :to="`${gym.adminPath}/indoor-subscriptions`"
        >
          {{ $t('actions.subscribeNow') }} !
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>
<script>
import { mdiArrowUpBoldHexagonOutline } from '@mdi/js'

export default {
  name: 'IndoorSubscriptionLockAlert',
  props: {
    gym: {
      type: Object,
      required: true
    },
    feature: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      textes: {
        contest: 'Passez à la version supérieur pour débloquer les contests !',
        video: 'Passez à la version supérieur pour télécharger des videos depuis votre téléphones !',
        statistics: 'Passez à la version supérieur pour débloquer les statistiques !',
        championship: 'Passez à la version supérieur pour débloquer les championnats !',
        labelTemplate: "Passez à la version supérieur pour débloquer l'impression des étiquettes !",
        openingSheet: "Passez à la version supérieur pour débloquer les fiches d'ouvertures !"
      },
      mdiArrowUpBoldHexagonOutline
    }
  }
}
</script>
