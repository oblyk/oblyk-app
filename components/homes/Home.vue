<template>
  <div>
    <v-parallax
      id="home-parallax"
      src="/images/oblyk-home-baume-rousse.jpg"
      class="text-center home-parallax"
      :height="parallaxHeight"
    >
      <h1 class="font-weight-medium loved-by-king oblyk-title">
        Oblyk
      </h1>
      <h2 class="loved-by-king oblyk-subtitle">
        Outdoor & Indoor Climbing Community
      </h2>
    </v-parallax>

    <v-container class="home-container">
      <home-box-crag-info class="home-boxes" />
      <home-box-ascents-log class="home-boxes" />
      <home-box-partner class="home-boxes" />
      <home-box-help class="home-boxes" />
      <home-box-guide-book class="home-boxes" />
      <home-box-developer class="home-boxes" />
      <last-article />
      <home-box-figures />
    </v-container>

    <app-footer />
  </div>
</template>

<script>
import HomeBoxCragInfo from '@/components/homes/HomeBoxCragInfo'
import HomeBoxAscentsLog from '@/components/homes/HomeBoxAscentsLog'
const HomeBoxDeveloper = () => import('@/components/homes/HomeBoxDeveloper')
const AppFooter = () => import('@/components/layouts/AppFooter')
const HomeBoxPartner = () => import('@/components/homes/HomeBoxPartner')
const HomeBoxHelp = () => import('@/components/homes/HomeBoxHelp')
const HomeBoxGuideBook = () => import('@/components/homes/HomeBoxGuideBook')
const HomeBoxFigures = () => import('@/components/homes/HomeBoxFigures')
const LastArticle = () => import('@/components/articles/LastArticle')

export default {
  name: 'Home',
  components: {
    HomeBoxDeveloper,
    LastArticle,
    HomeBoxFigures,
    HomeBoxGuideBook,
    HomeBoxHelp,
    HomeBoxPartner,
    HomeBoxAscentsLog,
    HomeBoxCragInfo,
    AppFooter
  },

  data () {
    return {
      parallaxHeight: 550
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
  }
}
</script>

<style lang="scss">
.oblyk-title {
  font-size: 7rem;
}
.oblyk-subtitle {
  font-size: 2em;
}
.home-container {
  max-width: 1200px;
  h3, h4 {
    font-size: 2em;
  }
}
.home-boxes {
  margin-top: 3rem;
  margin-bottom: 7rem;
}
.home-parallax {
  max-height: 100vh !important;
}
</style>
