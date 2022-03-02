<template>
  <div>
    <v-parallax
      id="home-parallax"
      src="/images/oblyk-home-baume-rousse-small.webp"
      srcset="/images/oblyk-home-baume-rousse-small.webp 800w, /images/oblyk-home-baume-rousse.webp 1640w, /images/oblyk-home-baume-rousse.webp 1980w"
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
import HomeBoxDeveloper from '@/components/homes/HomeBoxDeveloper'
import AppFooter from '@/components/layouts/AppFooter'
import HomeBoxPartner from '@/components/homes/HomeBoxPartner'
import HomeBoxHelp from '@/components/homes/HomeBoxHelp'
import HomeBoxGuideBook from '@/components/homes/HomeBoxGuideBook'
import HomeBoxFigures from '@/components/homes/HomeBoxFigures'
import LastArticle from '@/components/articles/LastArticle'

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
  height: 168px;
  font-size: 7rem;
}
.oblyk-subtitle {
  height: 48px;
  font-size: 2em;
}
.home-container {
  max-width: 1200px;
  h3, h4 {
    height: 48px;
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
