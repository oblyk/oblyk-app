<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mt-5 mb-10 text-center">
        {{ $t('common.pages.apiAndDevelopers.title') }}
      </h1>
      <v-row>
        <v-col class="col-md-6" order-md="last">
          <p v-html="$t('common.pages.apiAndDevelopers.paragraphe')" />
          <p>
            <u class="font-weight-bold">
              {{ $t('common.pages.apiAndDevelopers.stepFor') }}
            </u>
          </p>
          <ol>
            <li>
              {{ $t('common.pages.apiAndDevelopers.connectOrRegister') }}
              <p class="mt-3">
                <v-icon class="mr-2">
                  {{ mdiArrowRight }}
                </v-icon>
                <nuxt-link to="sign-in">
                  {{ $t('actions.signIn') }}
                </nuxt-link> ou
                <nuxt-link to="sign-up">
                  {{ $t('actions.signUp') }}
                </nuxt-link>
              </p>
            </li>
            <li>
              {{ $t('common.pages.apiAndDevelopers.createYourOrganization') }}
              <p class="mt-3">
                <v-icon class="mr-2">
                  {{ mdiArrowRight }}
                </v-icon>
                <nuxt-link to="/organizations/new">
                  {{ $t('common.pages.apiAndDevelopers.createMyOrganisation') }}
                </nuxt-link>
              </p>
            </li>
            <li>
              {{ $t('common.pages.apiAndDevelopers.readDoc') }}
              <p class="mt-3">
                <v-icon class="mr-2">
                  {{ mdiArrowRight }}
                </v-icon>
                <a href="https://api.oblyk.org/documentation" target="_blank">
                  {{ $t('common.pages.apiAndDevelopers.oblykApiDocumentation') }}
                </a>
              </p>
            </li>
          </ol>
        </v-col>
        <v-col class="col-md-6">
          <v-img contain src="/svg/support-us.svg" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p
            class="text-center mt-5"
            v-html="$t('common.pages.apiAndDevelopers.gitHub')"
          />
        </v-col>
      </v-row>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },

  data () {
    return {
      mdiArrowRight
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "API des falaises et voies d'escalades",
        metaDescription: "Les API d'Oblyk vous permettes de consulter une grande base de donnée des falaises et voies d'escalade en France et dans le monde"
      },
      en: {
        metaTitle: 'Climbing crags and routes API',
        metaDescription: "Oblyk's APIs allow you to consult a large database of crags and climbing routes in France and in the world"
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
