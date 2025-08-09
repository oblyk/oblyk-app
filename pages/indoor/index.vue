<template>
  <div>
    <div class="indoor-search-head sheet-background-color border-bottom d-block d-md-none">
      <div class="indoor-search-head-container">
        <indoor-global-search />
      </div>
    </div>

    <v-container class="common-page-container">
      <!-- IF USER NOT LOGIN -->
      <v-sheet
        v-if="!$auth.loggedIn"
        class="text-center border rounded pa-2 missing-background mb-6 indoor-join-us"
      >
        <h1 class="text-h6 mb-1">
          <v-icon color="#d53a9d" left>
            {{ mdiCreation }}
          </v-icon>
          {{ $t('components.indoor.welcome') }}
        </h1>
        <p
          class="mb-2"
          v-html="$t('components.indoor.welcomeParagraphe')"
        />
        <div class="mb-1">
          <v-btn
            elevation="0"
            color="primary"
            :to="`/sign-up?redirect_to=${$route.fullPath}`"
          >
            {{ $t('actions.createMyAccount') }}
          </v-btn>
        </div>
        <v-btn
          text
          small
          elevation="0"
          color="primary"
          :to="`/sign-in?redirect_to=${$route.fullPath}&alert=false`"
        >
          {{ $t('actions.signIn') }}
        </v-btn>
      </v-sheet>

      <!-- MY CLIMBING GYMS -->
      <div v-if="$auth.loggedIn" class="mb-6">
        <p class="mb-1 font-weight-medium">
          <v-icon
            color="primary"
            left
            class="vertical-align-top"
          >
            {{ mdiStar }}
          </v-icon>
          {{ $tc('components.user.myFollowedGym', 2) }}
        </p>
        <my-favorite-gyms-carousel />
      </div>

      <!-- CONTEST À VENIR -->
      <my-upcoming-contests
        v-if="$auth.loggedIn"
        class="mb-6"
      />

      <!-- LOG BOOK -->
      <log-book-indoor-small-figures
        v-if="$auth.loggedIn"
        class="mb-6"
      />

      <!-- NEARBY GYM -->
      <nearby-gyms-carousel class="mb-6" />

      <!-- TOOL AND LINKS -->
      <div class="mb-6">
        <p class="mb-1 font-weight-medium">
          <v-icon color="primary" left class="vertical-align-top">
            {{ mdiPlusBox }}
          </v-icon>
          {{ $t('components.indoor.moreIndoor') }}
        </p>
        <v-row class="v-row-gutters-12 mb-2">
          <v-col cols="6" md="4" lg="3">
            <v-card to="/maps/gyms">
              <v-img
                src="/images/gym-map.jpg"
                alt="Carte des salles"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  <v-icon left small>
                    {{ mdiMap }}
                  </v-icon>
                  {{ $t('components.search.map.gym') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="6" md="4" lg="3">
            <v-card to="/contests">
              <v-img
                src="/images/contests.jpg"
                alt="Image représentant un contest"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  <v-icon left small>
                    {{ mdiTrophy }}
                  </v-icon>
                  {{ $t('components.contest.title') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- OTHER LINK AND TOOL -->
      <v-sheet
        v-if="$auth.loggedIn"
        class="rounded-sm mb-2"
        outlined
      >
        <v-list-item
          link
          to="/gyms/new"
        >
          <v-list-item-icon class="mr-3">
            <v-icon large color="primary">
              {{ mdiPlusBoxOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('actions.addGym') }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-wrap">
              Il manque une salle à notre base ? Ajoutez-la !
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-sheet class="rounded-sm mb-2" outlined>
        <v-list-item
          link
          to="/about/indoor"
        >
          <v-list-item-icon class="mr-3">
            <v-icon large color="primary">
              {{ mdiSourceBranch }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon color="#743ad5" class="vertical-align-bottom mr-1">
                {{ mdiProfessionalHexagon }}
              </v-icon>
              Vous êtes gérant d'une salle ?
            </v-list-item-title>
            <v-list-item-subtitle class="text-wrap">
              Vous êtes gérant, ouvreur, ou bénévole d'un club ?
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import {
  mdiStar,
  mdiMap,
  mdiPlusBoxOutline,
  mdiTrophy,
  mdiPlusBox,
  mdiSourceBranch,
  mdiCreation,
  mdiProfessionalHexagon
} from '@mdi/js'
import NearbyGymsCarousel from '~/components/gyms/NearbyGymsCarousel'
import LogBookIndoorSmallFigures from '~/components/logBooks/indoors/LogBookIndoorSmallFigures'
import IndoorGlobalSearch from '~/components/indoor/IndoorGlobalSearch'
const MyFavoriteGymsCarousel = () => import('~/components/gyms/MyFavoriteGymsCarousel')
const MyUpcomingContests = () => import('~/components/users/MyUpcomingContests')

export default {
  components: {
    IndoorGlobalSearch,
    LogBookIndoorSmallFigures,
    NearbyGymsCarousel,
    MyUpcomingContests,
    MyFavoriteGymsCarousel
  },
  data () {
    return {
      mdiStar,
      mdiMap,
      mdiPlusBoxOutline,
      mdiTrophy,
      mdiPlusBox,
      mdiSourceBranch,
      mdiCreation,
      mdiProfessionalHexagon
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Indoor',
        metaDescription: "Tous l'indoor sur oblyk, vos favoris, cartes de salles, salles proches"
      },
      en: {
        metaTitle: 'Indoor',
        metaDescription: 'All indoor activities on oblyk, your favourites, venue maps, nearby venues'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>

<style lang="scss">
.indoor-search-head {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 64px;
  .indoor-search-head-container {
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 9px;
  }
}
.indoor-join-us {
  h1 {
    background: linear-gradient(to right, #d53a9d, #743ad5);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 32px;
  }
  strong {
    color: #743ad5;
  }
}
</style>
