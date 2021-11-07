<template>
  <div>
    <v-parallax
      src="/img/images/oblyk-home-baume-rousse.jpg"
      class="text-center home-parallax"
      id="home-parallax"
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
const HomeBoxDeveloper = () => import('@/components/homes/HomeBoxDeveloper')
const AppFooter = () => import('@/components/layouts/AppFooter')
const HomeBoxCragInfo = () => import('@/components/homes/HomeBoxCragInfo')
const HomeBoxAscentsLog = () => import('@/components/homes/HomeBoxAscentsLog')
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
      parallaxHeight: document.documentElement.clientHeight
    }
  },

  mounted () {
    document.getElementById('home-parallax').style.maxHeight = '100vh'
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
</style>
