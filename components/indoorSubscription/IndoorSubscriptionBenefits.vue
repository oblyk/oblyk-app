<template>
  <div class="rounded border px-3">
    <p class="my-3">
      <v-icon left color="deep-purple accent-4">
        {{ mdiPrinter }}
      </v-icon>
      Imprimer les étiquettes de pied de voie en un clic !
    </p>
    <p class="my-3">
      <v-icon left color="deep-purple accent-4">
        {{ mdiPodium }}
      </v-icon>
      Organiser des contests et championnats facilement
    </p>
    <p class="my-3">
      <v-icon left color="deep-purple accent-4">
        {{ mdiChartBar }}
      </v-icon>
      Accéder à des statistiques avancées de vos ouvertures
    </p>
    <p class="my-3">
      <v-icon left color="deep-purple accent-4">
        {{ mdiFileRefreshOutline }}
      </v-icon>
      Planifier vos ouvertures grâce au fiches d'ouvertures
    </p>
    <p class="my-3">
      <v-icon left color="deep-purple accent-4">
        {{ mdiFilm }}
      </v-icon>
      Uploader des vidéos directement depuis votre téléphone !
    </p>
    <p class="my-3 d-none">
      <v-icon left color="deep-purple accent-4">
        {{ mdiCodeTags }}
      </v-icon>
      Accéder à vos données avec nos API
    </p>
  </div>
</template>

<script>
import {
  mdiPrinter,
  mdiChartBar,
  mdiFilm,
  mdiPodium,
  mdiFileRefreshOutline,
  mdiCodeTags
} from '@mdi/js'

export default {
  name: 'IndoorSubscriptionBenefits',

  data () {
    return {
      mdiPrinter,
      mdiChartBar,
      mdiFilm,
      mdiPodium,
      mdiFileRefreshOutline,
      mdiCodeTags
    }
  }
}
</script>
