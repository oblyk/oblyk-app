<template>
  <div class="area-header">
    <v-img
      dark
      height="400px"
      :lazy-src="area.thumbnailCoverUrl"
      :src="croppedSrc"
      :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
      class="area-header-banner"
    >
      <div
        v-if="area.photo.illustrable_name"
        class="area-photo-of"
      >
        <small>{{ area.photo.illustrable_name }}</small>
      </div>
      <div class="area-header-title">
        <h1 class="font-weight-medium">
          {{ area.name }}
          <client-only>
            <v-btn
              v-if="$auth.loggedIn"
              :to="`${area.path}/edit`"
              icon
              :title="$t('actions.edit')"
              class="ml-1"
            >
              <v-icon>
                {{ mdiPencil }}
              </v-icon>
            </v-btn>
            <share-btn
              :title="area.name"
              :url="area.path"
            />
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
import { mdiPencil } from '@mdi/js'
import ShareBtn from '~/components/ui/ShareBtn.vue'

export default {
  name: 'AreaHead',
  components: { ShareBtn },
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      croppedSrc: this.area.croppedCoverUrl,
      largeSrc: this.area.coverUrl,

      mdiPencil
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
.area-header {
  .area-header-banner {
    border-radius: 15px 15px 0 0;
  }
  .area-photo-of {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0.2em 0.7em;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
  .area-header-title {
    position: absolute;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    bottom: 20px;
    left: 20px;
    h1 {
      font-size: 1.7em;
      margin: 0;
    }
  }
}

@media screen and (max-width: 767px) {
  .area-header {
    .area-header-title {
      width: 100%;
      border-radius: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
