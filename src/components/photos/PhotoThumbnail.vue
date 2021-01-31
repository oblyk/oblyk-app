<template>
  <v-img
    @mouseenter="photoOver = true"
    @mouseleave="photoOver = false"
    :src="photo.thumbnailUrl()"
    @click="goToViewer()"
    max-height="200"
    :gradient="photoOver ? 'to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px' : 'to top, rgba(0, 0, 0, 0) 0%, transparent 72px'"
  >
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        />
      </v-row>
    </template>
    <div
      class="photo-actions"
      v-if="isLoggedIn && photoOver"
    >
      <v-btn
        icon
        dark
      >
        <v-icon small>
          mdi-flag
        </v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        v-if="cragSectorId || cragId"
        @click.stop="defineAsBanner()"
        :title="defineBtnTitle()"
        :loading="updatingBanner"
      >
        <v-icon small>
          mdi-panorama
        </v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        @click.stop=""
        :to="`${photo.path('edit')}?redirect_to=${$route.fullPath}`"
      >
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </div>
  </v-img>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import CragApi from '@/services/oblyk-api/CragApi'
import Crag from '@/models/Crag'
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import CragSector from '@/models/CragSector'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import router from '@/router'

export default {
  name: 'PhotoThumbnail',
  mixins: [SessionConcern],
  props: {
    photo: Object,
    photosGallery: Array
  },

  data () {
    return {
      photoOver: false,
      updatingBanner: false,
      cragId: this.$route.params.cragId,
      cragSectorId: this.$route.params.cragSectorId,
      cragRouteId: this.$route.params.cragRouteId
    }
  },

  methods: {
    bannerType: function () {
      if (this.cragRouteId) {
        return 'cragRoute'
      } else if (this.cragSectorId) {
        return 'cragSector'
      } else {
        return 'crag'
      }
    },

    defineBtnTitle: function () {
      const bannerType = this.bannerType()
      if (bannerType === 'cragRoute') {
        return this.$t('components.gallery.defineCragRouteBanner')
      } else if (bannerType === 'cragSector') {
        return this.$t('components.gallery.defineCragSectorBanner')
      } else if (bannerType === 'crag') {
        return this.$t('components.gallery.defineCragBanner')
      }
    },

    defineAsBanner: function () {
      this.updatingBanner = true
      const bannerType = this.bannerType()
      let promise

      if (bannerType === 'cragRoute') {
        promise = CragRouteApi.update({
          photo_id: this.photo.id,
          crag_id: this.cragId,
          id: this.cragRouteId
        })
      } else if (bannerType === 'cragSector') {
        promise = CragSectorApi.update({
          photo_id: this.photo.id,
          crag_id: this.cragId,
          id: this.cragSectorId
        })
      } else if (bannerType === 'crag') {
        promise = CragApi.update({
          photo_id: this.photo.id,
          id: this.cragId
        })
      }

      promise
        .then(resp => {
          if (bannerType === 'crag') {
            const crag = new Crag(resp.data)
            this.$root.$emit('updateCragBannerSrc', crag.coverUrl())
          } else if (bannerType === 'cragSector') {
            const cragSector = new CragSector(resp.data)
            this.$root.$emit('updateCragSectorBannerSrc', cragSector.coverUrl())
          } else if (bannerType === 'cragRoute') {
            const cragRoute = new CragRoute(resp.data)
            this.$root.$emit('updateCragRouteBannerSrc', cragRoute.coverUrl())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, bannerType)
        })
        .finally(() => {
          this.updatingBanner = false
        })
    },

    goToViewer: function () {
      router.push(`/photos/${this.photo.id}?photos=${this.photosGallery.join('-')}&redirect_to=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-actions {
  position: absolute;
  text-align: right;
  width: 100%;
  bottom: 0;
}
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
