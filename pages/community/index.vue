<template>
  <div>
    <div class="community-search-head sheet-background-color border-bottom d-block d-md-none">
      <div class="community-search-head-container">
        <client-only>
          <community-global-search />
        </client-only>
      </div>
    </div>

    <v-container class="common-page-container">
      <!-- IF USER NOT LOGIN -->
      <v-sheet
        v-if="!$auth.loggedIn"
        class="text-center border rounded pa-2 missing-background mb-6 community-join-us"
      >
        <h1 class="text-h6 mb-1">
          <v-icon color="#00c2ff" left>
            {{ mdiCreation }}
          </v-icon>
          {{ $t('components.community.welcome') }}
        </h1>
        <p
          class="mb-2"
          v-html="$t('components.community.welcomeParagraphe')"
        />
        <div class="mb-1">
          <v-btn
            elevation="0"
            color="primary"
            :to="`/sign-up?redirect_to=${$route.fullPath}&back_to=/community`"
          >
            {{ $t('actions.createMyAccount') }}
          </v-btn>
        </div>
        <v-btn
          text
          small
          elevation="0"
          color="primary"
          :to="`/sign-in?redirect_to=${$route.fullPath}&alert=false&back_to=/community`"
        >
          {{ $t('actions.signIn') }}
        </v-btn>
      </v-sheet>

      <!-- Enable partner search -->
      <client-only v-if="$auth.loggedIn">
        <enable-partner-search
          v-if="$auth.user.partner_search === null && !$auth.user.minor"
          :user="$auth.user"
          class="mb-6"
        />

        <my-partner-figures
          v-if="$auth.user.partner_search"
          class="mb-6"
        />
      </client-only>

      <!-- TOOL AND LINKS -->
      <div class="mb-6">
        <p class="mb-1 font-weight-medium">
          <v-icon color="primary" left class="vertical-align-top">
            {{ mdiPlusBoxOutline }}
          </v-icon>
          {{ $t('components.user.partnerSearch') }}
        </p>
        <v-row class="v-row-gutters-12">
          <v-col cols="6" md="4" lg="3">
            <v-card to="/maps/climbers?back_to=/community">
              <v-img
                src="/images/climbers-map.jpg"
                alt="Carte des grimpeurs et grimpeuses"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('components.layout.appDrawer.mapClimber') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="6" md="4" lg="3">
            <v-card to="/about/partner-search?back_to=/community">
              <v-img
                src="/images/climbers-how-it-works.jpg"
                alt="des grimpeurs qui font une parade"
                class="align-end"
                dark
                gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,.6)"
              >
                <p class="ma-2 font-weight-bold text-truncate">
                  {{ $t('common.pages.find.climbers.howItWorks.title') }}
                </p>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <client-only v-if="$auth.loggedIn">
        <suggested-friends class="mb-6" />
      </client-only>
    </v-container>
  </div>
</template>

<script>
import {
  mdiCreation,
  mdiPlusBoxOutline
} from '@mdi/js'
import { oblykPartner } from '~/assets/oblyk-icons'
import EnablePartnerSearch from '~/components/users/notificationCard/EnablePartnerSearch'
import MyPartnerFigures from '~/components/users/MyPartnerFigures'
import SuggestedFriends from '~/components/users/SuggestedFriends'
import CommunityGlobalSearch from '~/components/community/CommunityGlobalSearch'

export default {
  components: { CommunityGlobalSearch, SuggestedFriends, MyPartnerFigures, EnablePartnerSearch },
  data () {
    return {
      outdoorQuery: null,

      mdiCreation,
      oblykPartner,
      mdiPlusBoxOutline
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Communauté',
        metaDescription: "La communauté d'Oblyk, les grimpeurs et grimpeuses et recherche de partenaire"
      },
      en: {
        metaTitle: 'Community',
        metaDescription: 'The Oblyk community, climbers and partner search'
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
  },

  mounted () {
    this.$store.dispatch('oblykEnvironment/clearHubs')
  }
}
</script>

<style lang="scss">
.community-search-head {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 64px;
  .community-search-head-container {
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 9px;
  }
}
.community-join-us {
  h1 {
    background: linear-gradient(to right, #23e6ff, #007b8b);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 32px;
  }
  strong {
    color: #007b8b;
  }
}
</style>
