<template>
  <v-img
    dark
    height="400px"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    :lazy-src="cragSector.thumbnailCoverUrl"
    :src="croppedSrc"
    :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
  >
    <p
      v-if="cragSector.coverFrom"
      class="text-right pr-5"
    >
      <small>{{ $t(`components.${cragSector.coverFrom}.coverFrom`) }}</small>
    </p>
    <div
      class="crag-sector-header-title"
    >
      <h1 class="font-weight-medium ">
        {{ cragSector.name }}
      </h1>
      <div>
        <nuxt-link
          class="discrete-link"
          :to="cragSector.Crag.path"
        >
          <v-icon small>
            {{ mdiTerrain }}
          </v-icon>
          {{ cragSector.crag.name }}
        </nuxt-link>
      </div>
      <div>
        {{ cragSector.crag.country }}, {{ cragSector.crag.region }}, {{ cragSector.crag.city }}
        <v-btn
          v-if="isLoggedIn"
          :to="`/a${cragSector.Crag.path}/sectors/${cragSector.id}/${cragSector.slug_name}/edit`"
          small
          icon
          :title="$t('actions.edit')"
          class="ml-1"
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-img>
</template>

<script>
import { mdiTerrain, mdiPencil } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CragSectorHead',
  mixins: [SessionConcern],
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain,
      mdiPencil,
      croppedSrc: this.cragSector.croppedCoverUrl,
      largeSrc: this.cragSector.coverUrl
    }
  },

  mounted () {
    this.$root.$on('updateCragSectorBannerSrc', (src) => {
      this.updateCragSectorBannerSrc(src)
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragSectorBannerSrc')
  },

  methods: {
    updateCragSectorBannerSrc (src) {
      this.croppedSrc = src
      this.largeSrc = src
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-sector-header-title {
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
