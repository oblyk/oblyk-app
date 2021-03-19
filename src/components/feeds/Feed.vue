<template>
  <div>
    <div
      v-for="(feed, index) in feeds"
      :key="`feed-card-${index}`"
    >
      <!-- Date form now -->
      <div
        class="mt-2 mb-2"
        v-if="index === 0 || !isSameDay(feed.posted_at, feeds[index - 1].posted_at)"
      >
        <small
          class="text--disabled"
          :title="humanizeDate(feed.posted_at)"
        >
          {{ dateFromNow(feed.posted_at) }}
        </small>
      </div>

      <!-- Feed card -->
      <group-feed-card :feed="feed" v-if="isGroup(feed.group_type)" />
      <simple-feed-card :feed="feed" v-else />
    </div>

    <!-- Load more feed -->
    <loading-more :get-function="getFeeds" />
  </div>
</template>
<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import LoadingMore from '@/components/layouts/LoadingMore'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import SimpleFeedCard from '@/components/feeds/SimpleFeedCard'
import GroupFeedCard from '@/components/feeds/GroupFeedCard'

export default {
  name: 'Feed',
  mixins: [DateHelpers, RecordToObjectHelpers],
  components: {
    GroupFeedCard,
    SimpleFeedCard,
    LoadingMore
  },
  props: {
    User: Object
  },

  data () {
    return {
      feeds: [],
      loadingFeeds: true
    }
  },

  mounted () {
    this.getFeeds()
  },

  methods: {
    getFeeds: function (page) {
      CurrentUserApi
        .feed(page)
        .then(resp => {
          this.feeds = this.feeds.concat(this.groupFeed(resp.data))
          if (resp.data.length === 0) this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingFeeds = false
          this.$root.$emit('moreIsLoaded')
        })
    },

    groupFeed: function (feeds) {
      const groupedFeed = []
      const groupedByKeys = {}

      // Loop on the feed and group groupable elements
      for (const feed of feeds) {
        if (this.isGroupable(feed.feedable_type)) {
          const key = `${feed.parent_type}${feed.parent_id}`
          groupedByKeys[key] = (groupedByKeys[key] || {
            name: feed.parent_object.name,
            id: feed.parent_object.id,
            slug_name: feed.parent_object.slug_name,
            feedable_type: feed.parent_type,
            group_type: `${feed.feedable_type}s`,
            posted_at: feed.posted_at,
            items: []
          })
          groupedByKeys[key].items.push(feed)
        } else {
          groupedFeed.push(feed)
        }
      }

      // Add grouped elements in global feed
      for (const group in groupedByKeys) {
        groupedFeed.push(groupedByKeys[group])
      }

      // retour feed
      return groupedFeed
    },

    isGroupable: function (type) {
      return ['Photo', 'CragRoute'].includes(type)
    },

    isGroup: function (type) {
      return ['Photos', 'CragRoutes'].includes(type)
    }
  }
}
</script>

<style lang="scss">
.feed-card {
  .feed-card-title {
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 0.9em;
  }
}
</style>
