<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :lazy-src="area.thumbnailCoverUrl"
      :src="croppedSrc"
      :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
    >
      <div
        v-if="area.photo.illustrable_name"
        class="area-photo-of"
      >
        <small>{{ area.photo.illustrable_name }}</small>
      </div>
      <div class="area-header-title">
        <h1 class="font-weight-medium loved-by-king">
          {{ area.name }}
          <client-only>
            <v-btn
              v-if="isLoggedIn"
              :to="`/a${area.path}/edit`"
              icon
              :title="$t('actions.edit')"
              class="ml-1"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </client-only>
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
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      croppedSrc: this.area.croppedCoverUrl,
      largeSrc: this.area.coverUrl
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
    updateAreaBannerSrc (src) {
      this.croppedSrc = src
      this.largeSrc = src
    }
  }
}
</script>
<style lang="scss" scoped>
.area-photo-of {
  position: absolute;
  bottom: 5px;
  right: 10px;
}
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
