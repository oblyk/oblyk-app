<template>
  <div>
    <v-parallax
      :src="require('@/assets/oblyk-home-baume-rousse.jpg')"
      class="text-center home-parallax"
      id="home-parallax"
      :height="parallaxHeight"
    >
      <h1 class="font-weight-medium loved-by-king oblyk-title">
        Oblyk
      </h1>
      <h3 class="loved-by-king oblyk-subtitle">
        Outdoor & Indoor Climbing Community
      </h3>
    </v-parallax>

    <v-container class="home-container">
      <home-box-crag-info class="home-boxes" />
      <home-box-ascents-log class="home-boxes" />
      <home-box-partner class="home-boxes" />
      <home-box-help class="home-boxes" />
      <home-box-guide-book class="home-boxes" />
    </v-container>

    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import HomeBoxCragInfo from '@/components/homes/HomeBoxCragInfo'
import HomeBoxAscentsLog from '@/components/homes/HomeBoxAscentsLog'
import HomeBoxPartner from '@/components/homes/HomeBoxPartner'
import HomeBoxHelp from '@/components/homes/HomeBoxHelp'
import HomeBoxGuideBook from '@/components/homes/HomeBoxGuideBook'

export default {
  name: 'Home',
  components: {
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
}
.home-boxes {
  margin-top: 3rem;
  margin-bottom: 7rem;
}
</style>
