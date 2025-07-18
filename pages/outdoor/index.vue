<template>
  <div>
    <div class="outdoor-search-head sheet-background-color border-bottom d-block d-md-none">
      <div class="outdoor-search-head-container">
        <!-- SEARCH CRAG, GUIDE BOOK AND ROUTES -->
        <outdoor-global-search />
      </div>
    </div>

    <v-container class="common-page-container">
      <!-- IF USER NOT LOGIN -->
      <v-sheet
        v-if="!$auth.loggedIn"
        class="text-center border rounded pa-2 missing-background mt-2 outdoor-join-us"
      >
        <h1 class="text-h6 mb-1">
          <v-icon color="#51fd8b" left>
            {{ mdiCreation }}
          </v-icon>
          {{ $t('components.outdoor.welcome') }}
        </h1>
        <p
          class="mb-2"
          v-html="$t('components.outdoor.welcomeParagraphe')"
        />
        <div class="mb-1">
          <v-btn
            elevation="0"
            color="primary"
            to="/sign-up"
          >
            {{ $t('actions.createMyAccount') }}
          </v-btn>
        </div>
        <v-btn
          text
          small
          elevation="0"
          color="primary"
          to="/sign-in"
        >
          {{ $t('actions.signIn') }}
        </v-btn>
      </v-sheet>

      <div v-if="$auth.loggedIn">
        <!-- MY CRAGS -->
        <p class="mt-4 mb-1 font-weight-medium">
          <v-icon
            color="primary"
            left
            class="vertical-align-top"
          >
            {{ mdiStar }}
          </v-icon>
          {{ $t('components.crag.myCrags') }}
        </p>
        <my-favorite-crags-carousel />

        <!-- GUIDE BOOK FIGURES -->
        <p class="mb-1 mt-6 font-weight-medium">
          <v-icon color="primary" left class="vertical-align-top">
            {{ mdiBookOutline }}
          </v-icon>
          {{ $t('components.dailyCrosses.myLogbook') }}
        </p>
        <daily-ascents />
      </div>

      <!-- NEARBY CRAG -->
      <nearby-crags-carousel class="mt-6" />

      <!-- MAPS AND TOOLS -->
      <p class="mt-4 mb-1 font-weight-medium">
        <v-icon
          color="primary"
          left
          class="vertical-align-top"
        >
          {{ mdiPlusBoxOutline }}
        </v-icon>
        {{ $t('components.outdoor.moreOutdoor') }}
      </p>
      <v-row class="v-row-gutters-12">
        <v-col cols="6" md="4" lg="3">
          <v-card to="/maps/crags">
            <v-img
              src="/images/crags-map.jpg"
              alt="Carte des salles"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left small>
                  {{ mdiMap }}
                </v-icon>
                {{ $t('components.search.map.crag') }}
              </p>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-card to="/maps/guide-book-papers">
            <v-img
              src="/images/guide-book-map.jpg"
              alt="Carte des topos"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiBookshelf }}
                </v-icon>
                {{ $t('common.pages.find.guideBooks.map.title') }}
              </p>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="6" md="4" lg="3">
          <v-card to="/crags/search">
            <v-img
              src="/images/advanced-search.jpg"
              alt="Recherche avancée"
              class="align-end"
              dark
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
            >
              <p class="ma-2 font-weight-bold text-truncate">
                <v-icon left>
                  {{ mdiMagnifyExpand }}
                </v-icon>
                {{ $t('common.pages.find.crags.advancedSearch.title') }}
              </p>
            </v-img>
          </v-card>
        </v-col>
      </v-row>

      <!-- OTHER LINKS -->
      <v-sheet
        v-if="$auth.loggedIn"
        class="rounded-sm mb-1 mt-2"
        outlined
      >
        <v-list-item
          link
          to="/home/guide-books"
        >
          <v-list-item-icon>
            <v-icon large color="primary">
              {{ mdiBookshelf }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('components.layout.appDrawer.user.guideBooks') }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-wrap">
              Les topos papiers que je possède
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>
      <v-sheet
        v-if="$auth.loggedIn"
        class="rounded-sm mb-1 mt-2"
        outlined
      >
        <v-list-item
          link
          to="/crags/new"
        >
          <v-list-item-icon>
            <v-icon large color="primary">
              {{ mdiPlusBoxOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('actions.addCrag') }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-wrap">
              Il manque une falaise à notre base ? Aidez-nous, ajoutez-là !
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
  mdiCreation,
  mdiBookOutline,
  mdiMap,
  mdiPlusBoxOutline,
  mdiBookshelf,
  mdiMagnifyExpand
} from '@mdi/js'
import MyFavoriteCragsCarousel from '~/components/crags/MyFavoriteCragsCarousel'
import DailyAscents from '~/components/logBooks/outdoors/DailyAscents'
import NearbyCragsCarousel from '~/components/crags/NearbyCragsCarousel'
import OutdoorGlobalSearch from '~/components/outdoor/OutdoorGlobalSearch'

export default {
  components: { OutdoorGlobalSearch, NearbyCragsCarousel, DailyAscents, MyFavoriteCragsCarousel },
  data () {
    return {
      outdoorQuery: null,

      mdiStar,
      mdiCreation,
      mdiBookOutline,
      mdiMap,
      mdiPlusBoxOutline,
      mdiBookshelf,
      mdiMagnifyExpand
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Outdoor',
        metaDescription: "Tous l'outdoor sur oblyk, vos favoris, cartes de falaises, falaises proches"
      },
      en: {
        metaTitle: 'Outdoor',
        metaDescription: 'All outdoor activities on oblyk, your favourites, crags maps, nearby cliffs'
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
.outdoor-search-head {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 64px;
  .outdoor-search-head-container {
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 9px;
  }
}
.outdoor-join-us {
  h1 {
    background: linear-gradient(to right, #51fd8b, #31994e);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 32px;
  }
}
.theme--light {
  .outdoor-join-us {
    strong {
      color: #31994e;
    }
  }
}
.theme--dark {
  .outdoor-join-us {
    strong {
      color: #51fd8b;
    }
  }
}
</style>
