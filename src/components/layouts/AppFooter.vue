<template>
  <v-footer padless class="app-footer">
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
              src="/img/svg/footer-climber.svg"
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
          <router-link class="d-block" to="/articles">{{ $t('components.layout.footer.news') }}</router-link>
          <router-link class="d-block" to="/contact">{{ $t('components.layout.footer.contact') }}</router-link>
          <router-link class="d-block" to="/about">{{ $t('components.layout.footer.about') }}</router-link>
          <router-link class="d-block" to="/helps">{{ $t('components.layout.footer.helps') }}</router-link>
          <router-link class="d-block" to="/support-us">
            <v-icon small color="red" left>
              mdi-heart
            </v-icon>
            {{ $t('components.layout.footer.donation') }}
          </router-link>
          <router-link
            class="d-block"
            :to="`/report-problem?redirect_to=${$route.fullPath}`"
          >
            <v-icon small left>
              mdi-flag
            </v-icon>
            {{ $t('components.layout.footer.reportProblem') }}
          </router-link>
        </v-col>

        <!-- Follow us -->
        <v-col
          class="col-12 col-md-4 order-1 order-md-3"
        >
          <p class="font-weight-bold">
            {{ $t('components.layout.footer.followUs') }}
          </p>
          <a class="d-block" href="https://www.facebook.com/pageoblyk/">
            <v-icon small left>
              mdi-facebook
            </v-icon>
            {{ $t('components.layout.footer.facebook') }}
          </a>
          <a class="d-block" href="https://github.com/oblyk">
            <v-icon small left>
              mdi-github
            </v-icon>
            {{ $t('components.layout.footer.github') }}
          </a>
          <router-link to="/newsletters/subscribe">
            <v-icon small left>
              mdi-email
            </v-icon>
            {{ $t('components.layout.footer.newsletter') }}
          </router-link>
        </v-col>
      </v-row>
      <v-divider class="mt-2 mb-2" />
      <v-row class="font-weight-light">
        <v-col>
          <router-link to="/">
            <v-icon small left>
              mdi-copyright
            </v-icon>
            {{ new Date().getFullYear() }} — Oblyk
          </router-link>
        </v-col>
        <v-col class="text-right">
          <router-link to="/terms-of-use">
            {{ $t('components.layout.footer.termsOfUse') }}
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',

  methods: {
    backToTheTop: function () {
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

.app-footer {
  margin-top: 3em;
  background-color: #232323 !important;
  color: white !important;
  a {
    color: white !important;
    border-radius: 6px;
    padding: 4px 9px;
    &:hover {
      background-color: #303030;
    }
  }
  .v-icon {
    color: white;
  }
}
</style>
