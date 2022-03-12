<template>
  <v-img
    v-if="!deleted"
    :src="photo.thumbnailUrl"
    max-height="200"
    class="photo-thumbnail"
    :gradient="photoOver ? 'to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px' : 'to top, rgba(0, 0, 0, 0) 0%, transparent 72px'"
    @mouseenter="photoOver = true"
    @mouseleave="photoOver = false"
    @click="openLightBoxDialog(photoIndex)"
  >
    <template #placeholder>
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

    <client-only>
      <div
        v-if="isLoggedIn && photoOver"
        class="photo-actions"
      >
        <!-- Report problem -->
        <v-btn
          icon
          dark
          :to="`/a/reports/Photo/${photo.id}/new?redirect_to=${$route.fullPath}`"
          :title="$t('actions.reportProblem')"
          @click.stop=""
        >
          <v-icon small>
            {{ mdiFlag }}
          </v-icon>
        </v-btn>

        <!-- Define as a banner -->
        <v-btn
          v-if="environnementType"
          icon
          dark
          :title="defineBtnTitle()"
          :loading="updatingBanner"
          @click.stop="defineAsBanner()"
        >
          <v-icon small>
            {{ mdiPanorama }}
          </v-icon>
        </v-btn>

        <!-- Destroy -->
        <v-btn
          v-if="photo.creator.uuid === loggedInUser.uuid"
          icon
          dark
          :loading="deletingPhoto"
          @click.stop="deletePhoto()"
        >
          <v-icon small>
            {{ mdiDelete }}
          </v-icon>
        </v-btn>

        <!-- Edit -->
        <v-btn
          v-if="photo.creator.uuid === loggedInUser.uuid"
          icon
          dark
          :to="`/a${photo.path}/edit?redirect_to=${$route.fullPath}`"
          @click.stop=""
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
      </div>
    </client-only>
  </v-img>
</template>

<script>
import { mdiFlag, mdiPanorama, mdiDelete, mdiPencil } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '@/models/Crag'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import CragSector from '@/models/CragSector'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import AreaApi from '~/services/oblyk-api/AreaApi'
import Area from '@/models/Area'
import PhotoApi from '~/services/oblyk-api/PhotoApi'

export default {
  name: 'PhotoThumbnail',
  mixins: [SessionConcern],
  props: {
    photo: {
      type: Object,
      required: true
    },
    photosGallery: {
      type: Array,
      required: true
    },
    openLightBoxDialog: {
      type: Function,
      required: true
    },
    photoIndex: {
      type: Number,
      required: true
    },
    environnementType: {
      type: String,
      required: true
    },
    environnementObject: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiFlag,
      mdiPanorama,
      mdiDelete,
      mdiPencil,
      deleted: false,
      photoOver: false,
      updatingBanner: false,
      deletingPhoto: false
    }
  },

  methods: {
    defineBtnTitle () {
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

    defineAsBanner () {
      this.updatingBanner = true
      let promise

      if (this.environnementType === 'cragRoute') {
        promise = new CragRouteApi(this.$axios, this.$auth).update({
          photo_id: this.photo.id,
          crag_id: this.environnementObject.crag.id,
          id: this.environnementObject.id
        })
      } else if (this.environnementType === 'cragSector') {
        promise = new CragSectorApi(this.$axios, this.$auth).update({
          photo_id: this.photo.id,
          crag_id: this.environnementObject.crag.id,
          id: this.environnementObject.id
        })
      } else if (this.environnementType === 'crag') {
        promise = new CragApi(this.$axios, this.$auth).update({
          photo_id: this.photo.id,
          id: this.environnementObject.id
        })
      } else if (this.environnementType === 'area') {
        promise = new AreaApi(this.$axios, this.$auth).update({
          photo_id: this.photo.id,
          id: this.environnementObject.id
        })
      }

      promise
        .then((resp) => {
          if (this.environnementType === 'crag') {
            const crag = new Crag({ attributes: resp.data })
            this.$root.$emit('updateCragBannerSrc', crag.coverUrl)
          } else if (this.environnementType === 'cragSector') {
            const cragSector = new CragSector({ attributes: resp.data })
            this.$root.$emit('updateCragSectorBannerSrc', cragSector.coverUrl)
          } else if (this.environnementType === 'cragRoute') {
            const cragRoute = new CragRoute({ attributes: resp.data })
            this.$root.$emit('updateCragRouteBannerSrc', cragRoute.coverUrl)
          } else if (this.environnementType === 'area') {
            const area = new Area({ attributes: resp.data })
            this.$root.$emit('updateAreaBannerSrc', area.coverUrl)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, this.environnementType)
        })
        .finally(() => {
          this.updatingBanner = false
        })
    },

    deletePhoto () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.deletingPhoto = true
        new PhotoApi(this.$axios, this.$auth)
          .delete(this.photo.id)
          .then(() => {
            this.deleted = true
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'photo')
          })
          .finally(() => {
            this.deletingPhoto = false
          })
      }
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
