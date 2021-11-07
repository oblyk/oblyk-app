<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 mb-10 text-center">
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
                <v-icon class="mr-2">mdi-arrow-right</v-icon>
                <router-link to="sign-in">{{ $t('actions.signIn') }}</router-link> ou
                <router-link to="sign-up">{{ $t('actions.signUp') }}</router-link>
              </p>
            </li>
            <li>
              {{ $t('common.pages.apiAndDevelopers.createYourOrganization') }}
              <p class="mt-3">
                <v-icon class="mr-2">mdi-arrow-right</v-icon>
                <router-link to="organizations/new">
                  {{ $t('common.pages.apiAndDevelopers.createMyOrganisation') }}
                </router-link>
              </p>
            </li>
            <li>
              {{ $t('common.pages.apiAndDevelopers.readDoc') }}
              <p class="mt-3">
                <v-icon class="mr-2">mdi-arrow-right</v-icon>
                <a href="https://api.oblyk.org/documentation" target="_blank">
                  {{ $t('common.pages.apiAndDevelopers.oblykApiDocumentation') }}
                </a>
              </p>
            </li>
          </ol>
        </v-col>
        <v-col class="col-md-6">
          <v-img contain src="/img/svg/support-us.svg" />
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
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'ApiAndDevelopersView',
  components: { AppFooter },

  data () {
    return {
      emailVisible: false
    }
  },

  metaInfo () {
    return {
      title: this.$t('meta.apiAndDevelopers.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.apiAndDevelopers.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.apiAndDevelopers.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.apiAndDevelopers.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
