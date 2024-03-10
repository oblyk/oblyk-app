<template>
  <v-container
    fluid
    class="home-header-container pa-0"
  >
    <v-img
      height="75vh"
      alt="photo de la falaise de Bellecombe Tarendol"
      src="/images/oblyk-home-baume-rousse-small.webp"
      srcset="/images/home-bellecombe-tarendol-portrait-800.webp 800w, /images/home-bellecombe-tarendol-1980.webp 1640w, /images/home-bellecombe-tarendol-4000.webp 1980w"
      class="mx-2 mw-lg-4 mt-2 mt-lg-4 rounded"
    >
      <v-row class="full-height">
        <v-col align-self="end">
          <v-sheet
            elevation="6"
            dark
            class="pa-3 pt-5 mb-n6 ml-md-10 mb-md-5 pa-md-8 pb-md-6 header-slide-sheet"
          >
            <v-img
              alt="Oblyk - Climbing Community"
              src="/svg/logo-title-slogan-reverse.svg"
            >
              <h1 class="d-none">
                Oblyk - Climbing Community
              </h1>
            </v-img>
            <p class="font-weight-bold text-center text-lg-left mt-4 mb-0">
              {{ $t('home.header.title.intro') }}
            </p>
            <p class="d-none d-lg-inline mb-0 mt-1">
              {{ $t('home.header.title.introNext') }}
            </p>
            <div class="text-center mt-4">
              <v-chip
                outlined
                class="mb-2"
                @click="goTo('crag-information')"
              >
                <v-icon left>
                  {{ mdiTerrain }}
                </v-icon>
                {{ $t('home.header.title.crag') }}
              </v-chip>
              <v-chip
                outlined
                class="mb-2"
                @click="goTo('logbook')"
              >
                <v-icon left>
                  {{ mdiTextBoxCheck }}
                </v-icon>
                {{ $t('home.header.title.logbook') }}
              </v-chip>
              <v-chip
                outlined
                class="mb-2"
                @click="goTo('find-partner')"
              >
                <v-icon left>
                  {{ mdiHandClap }}
                </v-icon>
                {{ $t('home.header.title.partner') }}
              </v-chip>
              <v-chip
                outlined
                class="mb-2"
                @click="goTo('indoor')"
              >
                <v-icon left>
                  {{ mdiSourceBranch }}
                </v-icon>
                {{ $t('home.header.title.indoorGuidebook') }}
              </v-chip>
            </div>
            <div class="text-center">
              <v-btn
                href="https://www.instagram.com/oblyk.climbing/"
                icon
                class="mb-2 ml-md-2"
              >
                <v-icon>{{ mdiInstagram }}</v-icon>
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
    </v-img>
  </v-container>
</template>
<script>
import {
  mdiFacebook,
  mdiGithub,
  mdiEmail,
  mdiInstagram,
  mdiTerrain,
  mdiTextBoxCheck,
  mdiHandClap,
  mdiSourceBranch
} from '@mdi/js'

export default {
  name: 'HomeHeader',
  data () {
    return {
      mdiFacebook,
      mdiGithub,
      mdiEmail,
      mdiInstagram,
      mdiTerrain,
      mdiTextBoxCheck,
      mdiHandClap,
      mdiSourceBranch
    }
  },

  methods: {
    goTo (anchor) {
      document.querySelector(`.home-boxes#${anchor}`).scrollIntoView({ behavior: 'smooth' })
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
  .header-slide-sheet {
    max-width: 630px;
    display: inline-block;
    background-color: rgba(0,0,0,0.6);
  }
  @media screen and (min-width: 960px) {
    .header-slide-sheet {
      border-radius: 16px;
      border-color: white;
      border-style: solid;
      border-width: 2px;
    }
  }
}
</style>
