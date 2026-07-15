<template>
  <div>
    <home-header />
    <v-container class="home-container">
      <client-only>
        <home-box-create-account v-if="!$auth.loggedIn" />
      </client-only>
      <home-box-crag-info id="crag-information" class="home-boxes" />
      <home-box-ascents-log id="logbook" class="home-boxes" />
      <home-box-partner id="find-partner" class="home-boxes" />
      <home-box-guide-book class="home-boxes" />
      <home-box-indoor id="indoor" class="home-boxes" />
      <div
        v-intersect="loadArticles"
        style="min-height: 556px"
      >
        <last-article v-if="showArticles" />
      </div>
      <div
        v-intersect="loadLastAdded"
        style="min-height: 788px"
      >
        <home-last-added v-if="showLastAdded" />
      </div>
      <div
        v-intersect="loadFigures"
        style="min-height: 423px"
      >
        <home-box-figures v-if="showFigures" />
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import HomeHeader from '~/components/homes/HomeHeader'
import HomeBoxIndoor from '~/components/homes/HomeBoxIndoor'
import HomeBoxCragInfo from '@/components/homes/HomeBoxCragInfo'
import HomeBoxAscentsLog from '@/components/homes/HomeBoxAscentsLog'
import HomeBoxPartner from '@/components/homes/HomeBoxPartner'
import HomeBoxGuideBook from '@/components/homes/HomeBoxGuideBook'
import HomeBoxCreateAccount from '~/components/homes/HomeBoxCreateAccount'
const LastArticle = () => import('@/components/articles/LastArticle')
const HomeLastAdded = () => import('~/components/homes/HomeLastAdded')
const HomeBoxFigures = () => import('@/components/homes/HomeBoxFigures')
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'Home',
  components: {
    HomeBoxCreateAccount,
    HomeBoxIndoor,
    HomeHeader,
    HomeLastAdded,
    LastArticle,
    HomeBoxFigures,
    HomeBoxGuideBook,
    HomeBoxPartner,
    HomeBoxAscentsLog,
    HomeBoxCragInfo,
    AppFooter
  },

  data () {
    return {
      showArticles: false,
      showLastAdded: false,
      showFigures: false
    }
  },

  methods: {
    loadArticles (entries, observer) {
      if (entries[0].isIntersecting) {
        this.showArticles = true
      }
    },

    loadLastAdded (entries, observer) {
      if (entries[0].isIntersecting) {
        this.showLastAdded = true
      }
    },

    loadFigures (entries, observer) {
      if (entries[0].isIntersecting) {
        this.showFigures = true
      }
    }
  }
}
</script>

<style lang="scss">
.oblyk-title {
  height: 168px;
  font-size: 7rem;
}
.oblyk-subtitle {
  height: 48px;
  font-size: 2em;
}
.home-container {
  max-width: 1200px;
}
.home-boxes {
  margin-top: 3rem;
  margin-bottom: 7rem;
}
.home-parallax {
  max-height: 100vh !important;
}
</style>
