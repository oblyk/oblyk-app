<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiHandshake }}
      </v-icon>
      {{ $t('components.user.youMayBeFamiliarWith') }}
    </p>
    <div class="d-flex overflow-x-auto">
      <v-card
        v-for="(user, userIndex) in users"
        :key="`user-index-${userIndex}`"
        :to="user.path"
        class="mr-2 rounded-sm"
      >
        <v-img
          :src="imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
          height="230"
          width="170"
          class="rounded-sm d-flex align-end"
          :alt="user.name"
          gradient="to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.6) 100%"
          dark
        >
          <div class="px-1 pb-1 text-center">
            <v-avatar>
              <v-img :src="imageVariant(user.attachments.avatar, { fit: 'scale-down', width: 100, height: 100 })" />
            </v-avatar>
            <p class="mb-1 text-truncate font-weight-bold">
              {{ user.full_name }}
            </p>
            <v-chip
              v-if="user.proximity.common_friends"
              outlined
              small
              class="mb-1"
            >
              {{ $tc('components.user.mutualFriend', user.proximity.common_friends, { count: user.proximity.common_friends }) }}
            </v-chip>
            <subscribe-btn
              :subscribe-id="user.id"
              subscribe-type="User"
              :subscribe-label="$t('actions.follow')"
              :unsubscribe-label="$t('actions.followed')"
              hide-icon
              small
              block
            />
          </div>
        </v-img>
      </v-card>
      <v-skeleton-loader
        v-if="!noMoreDataToLoad"
        v-intersect="loadMoreFriends"
        type="image"
        class="rounded-sm"
        height="200"
        min-width="150"
      />
    </div>
  </div>
</template>

<script>
import { mdiSourceBranch, mdiHandshake } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import User from '~/models/User'
import SubscribeBtn from '~/components/forms/SubscribeBtn'

export default {
  name: 'SuggestedFriends',
  components: { SubscribeBtn },
  mixins: [LoadingMoreHelpers, ImageVariantHelpers],

  data () {
    return {
      loading: true,
      users: [],

      mdiSourceBranch,
      mdiHandshake
    }
  },

  mounted () {
    this.getSuggestedFriends()
  },

  methods: {
    getSuggestedFriends () {
      new CurrentUserApi(this.$axios, this.$auth)
        .suggestedFriends(this.page)
        .then((resp) => {
          for (const user of resp.data) {
            this.users.push(new User({ attributes: user }))
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
    },

    loadMoreFriends (entries, observer) {
      if (
        entries[0].isIntersecting &&
        !this.noMoreDataToLoad &&
        !this.loadingMoreData
      ) {
        this.getSuggestedFriends()
      }
    }
  }
}
</script>
