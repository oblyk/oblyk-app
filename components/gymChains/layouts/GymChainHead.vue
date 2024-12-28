<template>
  <div class="gym-chain-header">
    <v-img
      dark
      height="400px"
      :lazy-src="imageVariant(gymChain.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(gymChain.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(gymChain.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(gymChain.attachments.banner, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(gymChain.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
      class="gym-chain-header-banner"
    >
      <template #placeholder>
        <div class="gym-chain-header-banner-spinner">
          <v-progress-circular
            indeterminate
            color="white"
          />
        </div>
      </template>
      <div class="gym-chain-header-title">
        <div class="d-flex flex-row gym-chain-header-title-and-logo">
          <v-avatar
            tile
            size="80"
            class="mr-3 align-self-center rounded-sm"
          >
            <v-img
              :src="imageVariant(gymChain.attachments.logo, { fit: 'crop', width: 100, height: 100 })"
              :alt="`logo ${gymChain.name}`"
            />
          </v-avatar>
          <div class="align-self-center">
            <h1 class="font-weight-medium">
              {{ gymChain.name }}
            </h1>
          </div>
        </div>
        <div class="text-no-wrap">
          <client-only>
            <share-btn
              :title="gymChain.name"
              :url="gymChain.path"
              :icon="false"
            />
          </client-only>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import ShareBtn from '~/components/ui/ShareBtn'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymChainHead',
  components: { ShareBtn },
  mixins: [ImageVariantHelpers],
  props: {
    gymChain: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-chain-header {
  .gym-chain-header-banner {
    border-radius: 15px;
    .change-gym-chain-banner {
      float: right;
      margin-right: 5px;
      margin-top: 5px;
    }
    .gym-chain-header-banner-spinner {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .gym-chain-header-title {
    display: inline-block;
    max-width: 100%;
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
    .gym-chain-header-title-and-logo {
      min-height: 85px;
    }
  }
}
@media screen and (max-width: 767px) {
  .gym-chain-header {
    .gym-chain-header-title {
      width: 100%;
      padding:5px;
      border-radius: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
