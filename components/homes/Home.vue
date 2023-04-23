<template>
  <div>
    <home-header />
    <v-container class="home-container">
      <lazy-hydrate when-visible>
        <home-box-crag-info class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-ascents-log class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-partner class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-guide-book class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-indoor class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <last-article />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-last-added />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-figures />
      </lazy-hydrate>
      <lazy-hydrate when-visible>
        <home-box-help class="home-boxes" />
      </lazy-hydrate>
      <lazy-hydrate
        v-if="false"
        when-visible
      >
        <home-box-developer class="home-boxes" />
      </lazy-hydrate>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import HomeHeader from '~/components/homes/HomeHeader'
const HomeBoxIndoor = () => import('~/components/homes/HomeBoxIndoor')
const HomeLastAdded = () => import('~/components/homes/HomeLastAdded')
const HomeBoxCragInfo = () => import('@/components/homes/HomeBoxCragInfo')
const HomeBoxAscentsLog = () => import('@/components/homes/HomeBoxAscentsLog')
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
    HomeBoxIndoor,
    HomeHeader,
    LazyHydrate,
    HomeLastAdded,
    HomeBoxDeveloper,
    LastArticle,
    HomeBoxFigures,
    HomeBoxGuideBook,
    HomeBoxHelp,
    HomeBoxPartner,
    HomeBoxAscentsLog,
    HomeBoxCragInfo,
    AppFooter
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
