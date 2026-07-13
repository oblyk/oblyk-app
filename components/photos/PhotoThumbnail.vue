<template>
  <v-img
    v-if="!deleted"
    :src="imageVariant(photo.attachments.picture, { fit: 'crop', height: 400, width: 400 })"
    class="photo-thumbnail hoverable"
    :gradient="photoOver ? 'to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px' : 'to top, rgba(0, 0, 0, 0) 0%, transparent 72px'"
    aspect-ratio="1"
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
        v-if="$auth.loggedIn"
        class="photo-actions"
        @click.stop=""
      >
        <like-btn
          :likeable-id="photo.id"
          likeable-type="Photo"
          :initial-like-count="photo.likes_count"
          dark
        />
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              dark
              :loading="updatingBanner"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- Define as a banner -->
            <v-list-item
              v-if="environnementType"
              @click.stop="defineAsBanner()"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPanorama }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ defineBtnTitle() }}
              </v-list-item-content>
            </v-list-item>

            <!-- Destroy -->
            <v-list-item
              v-if="photo.creator.uuid === $auth.user.uuid"
              @click.stop="deletePhoto()"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiDelete }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ $t('actions.delete') }}
              </v-list-item-content>
            </v-list-item>

            <!-- Edit -->
            <v-list-item
              v-if="photo.creator.uuid === $auth.user.uuid"
              :to="`${photo.path}/edit?redirect_to=${$route.fullPath}`"
              @click.stop=""
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPencil }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ $t('actions.edit') }}
              </v-list-item-content>
            </v-list-item>

            <!-- Report problem -->
            <v-list-item
              :to="`/reports/Photo/${photo.id}/new?redirect_to=${$route.fullPath}`"
              @click.stop=""
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiFlag }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ $t('actions.reportProblem') }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </client-only>
  </v-img>
</template>

<script>
import { mdiFlag, mdiPanorama, mdiDelete, mdiPencil, mdiDotsVertical } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import LikeBtn from '~/components/forms/LikeBtn'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'PhotoThumbnail',
  components: { LikeBtn },
  mixins: [ImageVariantHelpers],
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
      default: null
    },
    environnementObject: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      deleted: false,
      photoOver: false,
      updatingBanner: false,
      deletingPhoto: false,

      mdiFlag,
      mdiPanorama,
      mdiDelete,
      mdiPencil,
      mdiDotsVertical
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
      let url
      let data

      if (this.environnementType === 'cragRoute') {
        url = `/public/crags/${this.environnementObject.crag.id}/crag_routes/${this.environnementObject.id}`
        data = { crag_route: { photo_id: this.photo.id } }
      } else if (this.environnementType === 'cragSector') {
        url = `/public/crags/${this.environnementObject.crag.id}/crag_sectors/${this.environnementObject.id}`
        data = { crag_sector: { photo_id: this.photo.id } }
      } else if (this.environnementType === 'crag') {
        url = `/public/crags/${this.environnementObject.id}`
        data = { crag: { photo_id: this.photo.id } }
      } else if (this.environnementType === 'area') {
        url = `/public/areas/${this.environnementObject.id}`
        data = { area: { photo_id: this.photo.id } }
      }

      new OblykApi(this.$axios, this.$auth)
        .put(url, data)
        .then((resp) => {
          if (this.environnementType === 'crag') {
            this.$root.$emit('updateCragBannerSrc', resp.data.photo.attachments.picture)
          } else if (this.environnementType === 'cragSector') {
            this.$root.$emit('updateCragSectorBannerSrc', resp.data.photo.attachments.picture)
          } else if (this.environnementType === 'cragRoute') {
            this.$root.$emit('updateCragRouteBannerSrc', resp.data.photo.attachments.picture)
          } else if (this.environnementType === 'area') {
            this.$root.$emit('updateAreaBannerSrc', resp.data.photo.attachments.picture)
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
        new OblykApi(this.$axios, this.$auth)
          .delete(`/photos/${this.photo.id}`)
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
