<template>
  <div class="gym-header">
    <v-img
      dark
      height="400px"
      :lazy-src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
      class="gym-header-banner"
    >
      <template #placeholder>
        <div class="gym-header-banner-spinner">
          <v-progress-circular
            indeterminate
            color="white"
          />
        </div>
      </template>
      <div class="gym-header-title">
        <div class="d-flex flex-row gym-header-title-and-logo">
          <v-avatar
            tile
            size="80"
            class="mr-3 align-self-center rounded-sm"
          >
            <v-img
              :src="imageVariant(gym.attachments.logo, { fit: 'crop', width: 100, height: 100 })"
              :alt="`logo ${gym.name}`"
            />
          </v-avatar>
          <div class="align-self-center">
            <h1 class="font-weight-medium">
              {{ gym.name }}
            </h1>
            <div class="mb-2">
              {{ gym.country }}, {{ gym.city }}
            </div>
          </div>
        </div>
        <div class="text-no-wrap">
          <client-only>
            <subscribe-btn
              subscribe-type="Gym"
              unsubscribe-label="common.subscribed"
              :subscribe-id="gym.id"
              :incrementable="true"
              :type-text="true"
              :outlined="true"
            />
            <share-btn
              :title="gym.name"
              :url="gym.path"
              :icon="false"
            />
          </client-only>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import ShareBtn from '~/components/ui/ShareBtn'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymHead',
  components: { ShareBtn, SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-header {
  .gym-header-banner {
    border-radius: 15px;
    .change-gym-banner {
      float: right;
      margin-right: 5px;
      margin-top: 5px;
    }
    .gym-header-banner-spinner {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  .gym-header-title {
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
    .gym-header-title-and-logo {
      min-height: 85px;
    }
  }
}
@media screen and (max-width: 767px) {
  .gym-header {
    .gym-header-title {
      width: 100%;
      padding:5px;
      border-radius: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
