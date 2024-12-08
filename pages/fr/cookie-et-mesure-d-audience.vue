<template>
  <div>
    <v-container class="common-page-container">
      <h1>
        Cookie & Mesure de l'audience
      </h1>
      <p>
        Quels sont les cookies utilisés par Oblyk et comment mesure-t-on l'audience ?
      </p>
      <nuxt-link to="/en/cookie-and-audience-measurement">
        See english version
      </nuxt-link>
      <h2 class="mb-3 mt-10">
        <v-icon left>
          {{ mdiCookie }}
        </v-icon>
        Les cookies
      </h2>

      <p>
        Oblyk utilise des <u class="font-weight-bold">cookies uniquement à des fins de fonctionnement.</u>
      </p>
      <p>
        Cela signifie que nous ne stockons ni ne partageons aucune donnée vous concernant permettant de dresser un profil publicitaire, de créer une identité numérique (fingerprint), de mesurer la pérformance d'une publicité ou toute autre activité qui permettrait de vous traquer.
      </p>

      <p>
        Les cookies que nous stockons servent uniquement aux usages suivants :
      </p>
      <ul class="mb-4">
        <li><strong>Personnaliser l'interface :</strong> choix de la langue, du thème, rendu de la carte interactive, etc.</li>
        <li><strong>Votre session :</strong> pour rester connecté et éviter que vous ne deviez vous re-connecter à chaque visite.</li>
      </ul>
      <p>
        Ces cookies sont uniquement stockés sur votre téléphone, tablette ou ordinateur et ne sont pas transmits à Oblyk.
      </p>

      <h2 class="mb-3 mt-12">
        <v-icon left>
          {{ mdiChartBar }}
        </v-icon>
        Mesure d'audience
      </h2>
      <p>
        Comme la plupart des sites et applications, Oblyk utilise un outil pour mesurer son audience, comme le nombre de pages vues, les pages les plus populaires, le nombre de visiteur, etc.
      </p>

      <p>
        C'est un outil indispensable pour connaître les dysfonctionnements et les axes d'amélioration.
      </p>

      <p>
        Nous utilisons Matomo, hébergé par la FELINN, pour mesurer l'audience d'Oblyk.
      </p>
      <ul class="mb-4">
        <li><a href="https://fr.matomo.org/" target="_blank">Matomo</a> est un outil de mesure d'audience respectueux de la vie privée, validé par la CNIL comme étant <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience" target="_blank">un outil de mesure légitime</a> dans la collecte des données uniquement nécessaire au bon fonctionnement d'un site ou d'une application.</li>
        <li><a href="https://www.felinn.org/" target="_blank">La FELINN</a> est une association lyonnaise qui milite pour la neutralité du net et le respect de la vie privée sur internet.</li>
      </ul>
      <p>
        Matomo est configuré de telle sorte que toutes les données collectées (comme les adresses IP) sont anonymisées. Ainsi, nous n'avons qu'une vue globale de l'utilisation d'Oblyk et nous ne pouvons pas remonter à un usager en particulier.
      </p>

      <p>
        Si vous avez activé l'option "Ne pas me suivre" sur votre navigateur, Matomo ne collecte pas vos données de navigation.
      </p>

      <p>
        Malgré le caractère anonyme et purement fonctionnel des données de navigation que collecte matomo, vous pouvez refuser que Matomo les collectes en sélectionnant l'option ci-dessous :
      </p>
      <div class="border rounded px-4">
        <matomo-consent />
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiCookie, mdiChartBar } from '@mdi/js'
import AppFooter from '~/components/layouts/AppFooter'
import MatomoConsent from '~/components/matomo/MatomoConsent'

export default {
  components: { MatomoConsent, AppFooter },

  data () {
    return {
      mdiCookie,
      mdiChartBar
    }
  },

  head () {
    return {
      title: "Cookie & Mesure de l'audience",
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: "Quels sont les cookies utilisés par Oblyk et comment mesure-t-on l'audience d'Oblyk ?" },
        { hid: 'og:title', property: 'og:title', content: "Cookie & Mesure de l'audience" },
        { hid: 'og:description', property: 'og:description', content: "Quels sont les cookies utilisés par Oblyk et comment mesure-t-on l'audience d'Oblyk ?" },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
