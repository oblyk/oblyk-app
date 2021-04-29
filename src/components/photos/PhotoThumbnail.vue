<template>
  <v-img
    @mouseenter="photoOver = true"
    @mouseleave="photoOver = false"
    :src="photo.thumbnailUrl()"
    @click="openLightBoxDialog(photoIndex)"
    max-height="200"
    class="photo-thumbnail"
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
        v-if="environnementType"
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
        v-if="photo.creator.uuid === loggedInUser.uuid"
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
import AreaApi from '@/services/oblyk-api/AreaApi'
import Area from '@/models/Area'

export default {
  name: 'PhotoThumbnail',
  mixins: [SessionConcern],
  props: {
    photo: Object,
    photosGallery: Array,
    openLightBoxDialog: Function,
    photoIndex: Number,
    environnementType: String,
    environnementObject: Object
  },

  data () {
    return {
      photoOver: false,
      updatingBanner: false
    }
  },

  methods: {
    defineBtnTitle: function () {
      if (this.environnementType === 'cragRoute') {
        return this.$t('components.gallery.defineCragRouteBanner')
      } else if (this.environnementType === 'cragSector') {
        return this.$t('components.gallery.defineCragSectorBanner')
      } else if (this.environnementType === 'crag') {
        return this.$t('components.gallery.defineCragBanner')
      } else if (this.environnementType === 'area') {
        return this.$t('components.gallery.defineAreaBanner')
      }
    },

    defineAsBanner: function () {
      this.updatingBanner = true
      let promise

      if (this.environnementType === 'cragRoute') {
        promise = CragRouteApi.update({
          photo_id: this.photo.id,
          crag_id: this.environnementObject.crag.id,
          id: this.environnementObject.id
        })
      } else if (this.environnementType === 'cragSector') {
        promise = CragSectorApi.update({
          photo_id: this.photo.id,
          crag_id: this.environnementObject.crag.id,
          id: this.environnementObject.id
        })
      } else if (this.environnementType === 'crag') {
        promise = CragApi.update({
          photo_id: this.photo.id,
          id: this.environnementObject.id
        })
      } else if (this.environnementType === 'area') {
        promise = AreaApi.update({
          photo_id: this.photo.id,
          id: this.environnementObject.id
        })
      }

      promise
        .then(resp => {
          if (this.environnementType === 'crag') {
            const crag = new Crag(resp.data)
            this.$root.$emit('updateCragBannerSrc', crag.coverUrl())
          } else if (this.environnementType === 'cragSector') {
            const cragSector = new CragSector(resp.data)
            this.$root.$emit('updateCragSectorBannerSrc', cragSector.coverUrl())
          } else if (this.environnementType === 'cragRoute') {
            const cragRoute = new CragRoute(resp.data)
            this.$root.$emit('updateCragRouteBannerSrc', cragRoute.coverUrl())
          } else if (this.environnementType === 'area') {
            const area = new Area(resp.data)
            this.$root.$emit('updateAreaBannerSrc', area.coverUrl())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, this.environnementType)
        })
        .finally(() => {
          this.updatingBanner = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-thumbnail {
  border-radius: 2px;
  cursor: pointer;
}
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
