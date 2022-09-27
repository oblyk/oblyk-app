<template>
  <v-container
    fluid
    class="home-header-container pa-0"
  >
    <v-carousel
      class="home-carousel"
      height="calc(75vh)"
      cycle
      :interval="5000"
      :show-arrows="false"
      hide-delimiter-background
    >
      <!-- Oblyk Big Title -->
      <v-carousel-item
        src="/images/oblyk-home-baume-rousse-small.webp"
        srcset="/images/oblyk-home-baume-rousse-small.webp 800w, /images/oblyk-home-baume-rousse.webp 1640w, /images/oblyk-home-baume-rousse.webp 1980w"
      >
        <v-row class="full-height">
          <v-col align-self="end">
            <v-sheet
              elevation="6"
              dark
              class="ml-md-10 mb-n6 mb-md-5 pa-7 pa-md-8 pt-4 pb-9 pb-md-6 header-slide-sheet"
            >
              <h1 class="font-weight-bolder oblyk-big-title">
                Oblyk
              </h1>
              <p class="font-weight-bold mb-2">
                {{ $t('home.header.title.intro') }}
              </p>
              <div class="actions-and-link">
                <v-btn
                  v-if="!$auth.loggedIn"
                  outlined
                  class="mb-2 rounded-sm new-free-account-btn"
                  elevation="0"
                  to="/sign-up"
                >
                  {{ $t('actions.createFreeAccount') }}
                </v-btn>
                <v-btn
                  href="https://www.facebook.com/pageoblyk"
                  icon
                  class="mb-2 ml-md-2"
                >
                  <v-icon>{{ mdiFacebook }}</v-icon>
                </v-btn>
                <v-btn
                  href="https://github.com/oblyk"
                  icon
                  class="mb-2"
                >
                  <v-icon>{{ mdiGithub }}</v-icon>
                </v-btn>
                <v-btn
                  to="/newsletters/subscribe"
                  icon
                  class="mb-2"
                >
                  <v-icon>{{ mdiEmail }}</v-icon>
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-carousel-item>

      <!-- World data base -->
      <v-carousel-item
        src="/images/crags-database-800.webp"
        srcset="/images/crags-database-800.webp 800w, /images/crags-database-1980.webp 1640w, /images/crags-database-1980.webp 1980w"
      >
        <v-row class="full-height">
          <v-col align-self="end">
            <v-sheet
              elevation="6"
              dark
              class="ml-md-10 mb-n6 mb-md-5 pa-7 pa-md-8 pt-4 pb-9 pb-md-6 header-slide-sheet"
            >
              <h2 class="font-weight-bolder">
                {{ $t('home.header.crags.title') }}
              </h2>
              <p
                class="font-weight-bold mb-3 mt-3"
                v-html="$t('home.header.crags.intro')"
              />
              <div class="actions-and-link">
                <v-btn
                  outlined
                  class="mb-2 rounded-sm new-free-account-btn"
                  elevation="0"
                  to="/find/crags"
                >
                  {{ $t('home.header.crags.find') }}
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-carousel-item>

      <!-- Keeps a ascents logbook -->
      <v-carousel-item
        src="/images/ascents-log-800.webp"
        srcset="/images/ascents-log-800.webp 800w, /images/ascents-log-1980.webp 1640w, /images/ascents-log-1980.webp 1980w"
      >
        <v-row class="full-height">
          <v-col align-self="end">
            <v-sheet
              elevation="6"
              dark
              class="ml-md-10 mb-n6 mb-md-5 pa-7 pa-md-8 pt-4 pb-9 pb-md-6 header-slide-sheet"
            >
              <h2 class="font-weight-bolder">
                {{ $t('home.header.ascents.title') }}
              </h2>
              <p
                class="font-weight-bold mb-3 mt-3"
                v-html="$t('home.header.ascents.intro')"
              />
              <div class="actions-and-link">
                <v-btn
                  v-if="!$auth.loggedIn"
                  outlined
                  class="mb-2 rounded-sm new-free-account-btn"
                  elevation="0"
                  to="/sign-up"
                >
                  {{ $t('actions.createFreeAccount') }}
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-carousel-item>

      <!-- Climb partner -->
      <v-carousel-item
        src="/images/climb-partners-800.webp"
        srcset="/images/climb-partners-800.webp 800w, /images/climb-partners-1980.webp 1640w, /images/climb-partners-1980.webp 1980w"
      >
        <v-row class="full-height">
          <v-col align-self="end">
            <v-sheet
              elevation="6"
              dark
              class="ml-md-10 mb-n6 mb-md-5 pa-7 pa-md-8 pt-4 pb-9 pb-md-6 header-slide-sheet"
            >
              <h2 class="font-weight-bolder">
                {{ $t('home.header.climbers.title') }}
              </h2>
              <p
                class="font-weight-bold mb-3 mt-3"
                v-html="$t('home.header.climbers.intro')"
              />
              <div class="actions-and-link">
                <v-btn
                  outlined
                  class="mb-2 rounded-sm new-free-account-btn"
                  elevation="0"
                  to="/find/climbers"
                >
                  {{ $t('home.header.climbers.find') }}
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>
<script>
import { mdiFacebook, mdiGithub, mdiEmail } from '@mdi/js'

export default {
  name: 'HomeHeader',
  data () {
    return {
      mdiFacebook,
      mdiGithub,
      mdiEmail
    }
  }
}
</script>

<style lang="scss" scoped>
.home-header-container {
  .oblyk-big-title {
    font-size: 6rem;
    line-height: 7rem;
  }
  .new-free-account-btn {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .header-slide-sheet {
    display: inline-block;
    background-color: rgba(0,0,0,0.6);
  }
  @media screen and (min-width: 960px) {
    .header-slide-sheet {
      border-radius: 16px;
      &.--bordered {
        border-color: white;
        border-width: 1px;
        border-style: solid;
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .home-header-container {
    .actions-and-link {
      text-align: center;
    }
  }
}
</style>
