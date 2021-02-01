<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="src"
    >
      <div class="area-header-title">
        <h1 class="font-weight-medium loved-by-king">
          {{ area.name }}
          <v-btn
            :to="area.path('edit')"
            icon
            :title="$t('actions.edit')"
            class="ml-1"
            v-if="isLoggedIn"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </h1>
        <div>
          {{ $t('components.area.groupTitle', { count: area.crags_count }) }}
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'AreaHead',
  mixins: [SessionConcern],
  props: {
    area: Object
  },

  data () {
    return {
      src: this.area.coverUrl()
    }
  },

  mounted () {
    this.$root.$on('updateAreaBannerSrc', (src) => {
      this.updateAreaBannerSrc(src)
    })
  },

  beforeDestroy () {
    this.$root.$off('updateAreaBannerSrc')
  },

  methods: {
    updateAreaBannerSrc: function (src) {
      this.src = src
    }
  }
}
</script>
<style lang="scss" scoped>
.area-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
</style>
