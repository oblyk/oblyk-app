<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiTrendingUp }}
      </v-icon>
      Salles populaires
    </p>
    <nuxt-link
      v-for="(gym, gymIndex) in gyms"
      :key="`gym-index-${gymIndex}`"
      :to="gym.guideBookPath"
      class="discrete-link"
    >
      <v-img
        :src="imageVariant(gym.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
        height="130"
        class="rounded-sm mb-2 d-flex align-end"
        :alt="gym.name"
        gradient="to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.6) 100%"
        dark
      >
        <div class="d-flex px-1 pb-1">
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
        </div>
      </v-img>
    </nuxt-link>
    <loading-more
      :get-function="getGyms"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
    />
  </div>
</template>

<script>
import { mdiSourceBranch, mdiTrendingUp } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '~/models/Gym'

export default {
  name: 'GymsByPopularity',
  components: { LoadingMore },
  mixins: [LoadingMoreHelpers, ImageVariantHelpers],

  data () {
    return {
      loading: true,
      gyms: [],

      mdiSourceBranch,
      mdiTrendingUp
    }
  },

  mounted () {
    this.getGyms()
  },

  methods: {
    getGyms () {
      new GymApi(this.$axios, this.$auth)
        .all(null, this.page, null, { order: 'popularity' })
        .then((resp) => {
          for (const gym of resp.data) {
            this.gyms.push(new Gym({ attributes: gym }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loading = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
