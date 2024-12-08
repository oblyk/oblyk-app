<template>
  <div>
    <v-container class="common-page-container">
      <h1>
        Cookie & Audience measurement
      </h1>
      <p>
        What cookies are used by Oblyk and how is the audience measured?
      </p>
      <nuxt-link to="/fr/cookie-et-mesure-d-audience">
        Voir la version française
      </nuxt-link>
      <h2 class="mb-3 mt-10">
        <v-icon left>
          {{ mdiCookie }}
        </v-icon>
        Cookies
      </h2>

      <p>
        Oblyk uses cookies <u class="font-weight-bold">solely for operational purposes.</u>
      </p>
      <p>
        This means that we do not store or share any data about you that would enable us to draw up an advertising profile, create a digital identity (fingerprint), measure the audience for an advertisement or any other activity that would enable us to track you.
      </p>

      <p>
        The cookies we store are used solely for the following purposes:
      </p>
      <ul>
        <li><strong>Customise the interface :</strong> choice of language, theme, interactive map rendering, etc.</li>
        <li><strong>Your session :</strong> to stay connected so you don't have to log in again each time you visit.</li>
      </ul>
      <p>
        These cookies are only stored on your phone, tablet or computer and are not sent to Oblyk.
      </p>

      <h2 class="mb-3 mt-12">
        <v-icon left>
          {{ mdiChartBar }}
        </v-icon>
        Audience measurement
      </h2>
      <p>
        Like most sites and applications, Oblyk uses a tool to measure its audience, such as the number of pages viewed, the most popular pages, the number of visitors, etc.
      </p>

      <p>
        It is an essential tool for identifying problems and areas for improvement.
      </p>

      <p>
        We use Matomo, hosted by FELINN, to measure the Oblyk audience.
      </p>
      <ul class="mb-4">
        <li><a href="https://matomo.org/" target="_blank">Matomo</a> is an audience measurement tool that respects privacy and has been validated by the CNIL as a <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience" target="_blank">legitimate measurement tool</a> for collecting data that is only necessary for the proper functioning of a site or application..</li>
        <li><a href="https://www.felinn.org/" target="_blank">FELINN</a> is an association based in Lyon that campaigns for net neutrality and respect for privacy on the Internet.</li>
      </ul>
      <p>
        Matomo is configured in such a way that all data collected (such as IP addresses) is anonymised. This means that we only have a global view of Oblyk usage and cannot trace it back to a specific user.
      </p>

      <p>
        If you have activated the "Do not track me" option on your browser, Matomo does not collect your browsing data.
      </p>

      <p>
        Despite the anonymous and purely functional nature of the navigation data that matomo collects, you can refuse that Matomo collects it by selecting the option below:
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
      title: 'Cookie & Audience measurement',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: 'What cookies are used by Oblyk and how is the audience measured?' },
        { hid: 'og:title', property: 'og:title', content: 'Cookie & Audience measurement' },
        { hid: 'og:description', property: 'og:description', content: 'What cookies are used by Oblyk and how is the audience measured?' },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
