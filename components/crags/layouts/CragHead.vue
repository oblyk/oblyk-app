<template>
  <div class="crag-header">
    <v-img
      dark
      height="400px"
      :lazy-src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(picture, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(picture, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
      class="crag-header-banner"
    >
      <template #placeholder>
        <div class="crag-header-banner-spinner">
          <v-progress-circular
            indeterminate
            :color="$vuetify.theme.dark ? 'white' : 'blue-grey'"
          />
        </div>
      </template>
      <v-btn
        class="see-on-map-btn"
        elevation="0"
        color="primary"
        dark
        small
        :to="`/maps/crags?lat=${crag.latitude}&lng=${crag.longitude}&zoom=16&crag_id=${crag.id}`"
      >
        <v-icon left>
          {{ mdiArrowLeft }}
        </v-icon>
        {{ $t('actions.seeOnTheMap') }}
      </v-btn>
      <div class="crag-header-title">
        <h1 class="font-weight-medium mb-n1">
          {{ crag.name }}
          <client-only>
            <subscribe-btn
              class="vertical-align-text-bottom"
              :subscribe-id="crag.id"
              :incrementable="true"
              subscribe-type="Crag"
              :type-text="true"
              :large="false"
              :outlined="true"
            />
          </client-only>
        </h1>

        <!-- Localisation part -->
        <div class="mb-2">
          <v-icon
            small
            class="mr-1 mb-1"
          >
            {{ mdiMapMarkerRadiusOutline }}
          </v-icon>
          <span>
            {{ crag.city }}, {{ crag.region }} ({{ crag.country }})
          </span>
        </div>
        <div>
          <client-only>
            <share-btn
              :title="crag.name"
              :url="crag.path"
              :icon="false"
            />
            <v-menu
              v-if="$auth.loggedIn"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  text
                  outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    {{ mdiDotsVertical }}
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  :to="`${crag.path}/edit`"
                >
                  <v-list-item-icon>
                    <v-icon>{{ mdiPencil }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.edit') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="$auth.loggedIn && $auth.user.super_admin"
                  :to="`/alerts/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
                >
                  <v-list-item-icon>
                    <v-icon>{{ mdiBellPlus }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.addAlert') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </client-only>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import {
  mdiDotsVertical,
  mdiMapMarkerRadiusOutline,
  mdiBellPlus,
  mdiPencil,
  mdiArrowLeft
} from '@mdi/js'
import ShareBtn from '~/components/ui/ShareBtn.vue'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
const SubscribeBtn = () => import('@/components/forms/SubscribeBtn')

export default {
  name: 'CragHead',
  components: { ShareBtn, SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      picture: this.crag.attachments.cover,

      mdiDotsVertical,
      mdiMapMarkerRadiusOutline,
      mdiBellPlus,
      mdiPencil,
      mdiArrowLeft
    }
  },

  mounted () {
    this.$root.$on('updateCragBannerSrc', (picture) => {
      this.picture = picture
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragBannerSrc')
  }
}
</script>
<style lang="scss" scoped>
.crag-header {
  border-radius: 15px;
  .see-on-map-btn {
    border: 2px solid white;
    position: absolute;
    left: 5px;
    top: 5px;
  }
  .crag-header-banner {
    border-radius: 15px;
    .crag-header-banner-spinner {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .crag-header-title {
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
  .crag-header {
    .crag-header-title {
      width: 100%;
      border-radius: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
