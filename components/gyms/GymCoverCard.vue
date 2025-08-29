<template>
  <nuxt-link
    :to="gym.guideBookPath"
    class="discrete-link"
  >
    <v-img
      :src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      height="170"
      class="rounded-sm mb-2 d-flex align-end"
      :alt="gym.name"
      gradient="to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.6) 100%"
      dark
    >
      <div class="d-flex px-1 pb-1 align-center">
        <v-avatar>
          <v-img :src="imageVariant(gym.attachments.logo, { fit: 'scale-down', width: 100, height: 100 })" />
        </v-avatar>
        <div class="flex-grow-1 pl-2">
          <p class="mb-n1 text-truncate font-weight-bold">
            {{ gym.name }}
          </p>
          <p class="mb-0 text-truncate">
            <v-btn
              v-if="gym.optimal_spaces_path"
              x-small
              elevation="0"
              color="primary"
            >
              <v-icon small class="mr-1">
                {{ mdiSourceBranch }}
              </v-icon>
              {{ $t('components.gym.tabs.guideBook') }}
            </v-btn>
            <small v-if="gym.follows_count">
              {{ $tc('common.followerCount', gym.follows_count, { count: gym.follows_count }) }}
            </small>
          </p>
        </div>
        <subscribe-btn
          :subscribe-id="gym.id"
          subscribe-type="Gym"
          :large="false"
        />
      </div>
    </v-img>
  </nuxt-link>
</template>

<script>
import { mdiSourceBranch } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SubscribeBtn from '~/components/forms/SubscribeBtn.vue'

export default {
  name: 'GymCoverCard',
  components: { SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiSourceBranch
    }
  }
}
</script>
