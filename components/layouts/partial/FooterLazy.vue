<template>
  <v-container class="footer-container">
    <v-row>
      <!-- It's time to go back up -->
      <v-col
        class="back-to-the-to-col col-12 col-md-4 order-3 order-md-0"
        :title="$t('components.layout.footer.clickToTop')"
        @click="backToTheTop()"
      >
        <p class="font-weight-bold">
          {{ $t('components.layout.footer.itIsTimeToGoBackUp') }}
        </p>
        <div>
          <v-img
            width="130px"
            height="206px"
            src="/svg/footer-climber.svg"
          />
        </div>
      </v-col>

      <!-- About oblyk -->
      <v-col
        class="col-12 col-md-4 order-0 order-md-1"
      >
        <p class="font-weight-bold">
          {{ $t('components.layout.footer.moreAboutOblyk') }}
        </p>
        <nuxt-link class="d-block" to="/articles">
          {{ $t('components.layout.footer.news') }}
        </nuxt-link>
        <nuxt-link class="d-block" to="/contact" rel="nofollow">
          {{ $t('components.layout.footer.contact') }}
        </nuxt-link>
        <nuxt-link class="d-block" to="/about/partner-search">
          {{ $t('components.layout.footer.partnerSearch') }}
        </nuxt-link>
        <nuxt-link class="d-block" to="/guide-books/features">
          {{ $t('components.layout.footer.guidesAndFeatures') }}
        </nuxt-link>
        <nuxt-link class="d-block" to="/about">
          {{ $t('components.layout.footer.about') }}
        </nuxt-link>
        <a
          class="d-block"
          href="https://oblyk.github.io/app-user-doc"
          target="_blank"
          rel="nofollow"
        >
          {{ $t('components.layout.footer.helps') }}
          <v-icon
            class="mb-1"
            small
            right
          >
            {{ mdiOpenInNew }}
          </v-icon>
        </a>
        <nuxt-link
          v-if="false"
          class="d-block"
          to="/api-and-developers"
        >
          {{ $t('components.layout.footer.apiAndDevelopers') }}
        </nuxt-link>
        <nuxt-link class="d-block" to="/support-us">
          <v-icon small color="red" left>
            {{ mdiHeart }}
          </v-icon>
          {{ $t('components.layout.footer.donation') }}
        </nuxt-link>
        <nuxt-link
          class="d-block"
          :to="`/report-problem?redirect_to=${$route.fullPath}`"
          rel="nofollow"
        >
          <v-icon small left dark>
            {{ mdiFlag }}
          </v-icon>
          {{ $t('components.layout.footer.reportProblem') }}
        </nuxt-link>
      </v-col>

      <!-- Follow us -->
      <v-col
        class="col-12 col-md-4 order-1 order-md-3"
      >
        <p class="font-weight-bold">
          {{ $t('components.layout.footer.followUs') }}
        </p>
        <a class="d-block" href="https://www.facebook.com/pageoblyk/">
          <v-icon small left dark>
            {{ mdiFacebook }}
          </v-icon>
          {{ $t('components.layout.footer.facebook') }}
        </a>
        <a class="d-block" href="https://github.com/oblyk">
          <v-icon small left dark>
            {{ mdiGithub }}
          </v-icon>
          {{ $t('components.layout.footer.github') }}
        </a>
        <nuxt-link class="d-block" to="/newsletters/subscribe">
          <v-icon small left dark>
            {{ mdiEmail }}
          </v-icon>
          {{ $t('components.layout.footer.newsletter') }}
        </nuxt-link>
        <p class="font-weight-bold mt-6">
          {{ $t('components.layout.footer.data') }}
        </p>
        <nuxt-link
          class="d-block"
          :to="`/escalade-en/france`"
        >
          <v-icon small left dark>
            {{ mdiDatabase }}
          </v-icon>
          {{ $t('components.layout.footer.climbInFrance') }}
        </nuxt-link>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-2" />
    <v-row class="font-weight-light">
      <v-col>
        <nuxt-link to="/">
          <v-icon small left dark>
            {{ mdiCopyright }}
          </v-icon>
          2022 — Oblyk
        </nuxt-link>
      </v-col>
      <v-col class="text-right">
        <nuxt-link to="/fr/conditions-d-utilisation" rel="nofollow">
          {{ $t('components.layout.footer.termsOfUse') }}
        </nuxt-link>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12 pt-0">
        <code class="ml-2">app version: 3.0.0</code>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiCopyright,
  mdiHeart,
  mdiFlag,
  mdiFacebook,
  mdiGithub,
  mdiEmail,
  mdiDatabase,
  mdiOpenInNew
} from '@mdi/js'

export default {
  name: 'FooterLazy',

  data () {
    return {
      mdiCopyright,
      mdiHeart,
      mdiFlag,
      mdiFacebook,
      mdiGithub,
      mdiEmail,
      mdiDatabase,
      mdiOpenInNew
    }
  },

  methods: {
    backToTheTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss">
.footer-container {
  max-width: 1200px;
  a {
    text-decoration: none;
    &:hover {
      opacity: 0.8;
    }
  }
  .back-to-the-to-col {
    cursor: pointer;
    border-radius: 6px;
    &:hover {
      background-color: #303030;
    }
  }
}
</style>
