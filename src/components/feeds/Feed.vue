<template>
  <div>
    <div
      v-for="(feed, index) in feeds"
      :key="`feed-card-${index}`"
    >
      <!-- Feed card -->
      <div class="mt-5">
        <group-feed-card :feed="feed" v-if="isGroup(feed.group_type)" />
        <simple-feed-card :feed="feed" v-else />
      </div>
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
import ArticleApi from '@/services/oblyk-api/ArticleApi'

export default {
  name: 'Feed',
  mixins: [DateHelpers, RecordToObjectHelpers],
  components: {
    GroupFeedCard,
    SimpleFeedCard,
    LoadingMore
  },
  props: {
    feedApi: String
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
    feedClass: function () {
      if (this.feedApi === 'CurrentUserApi') {
        return CurrentUserApi
      } else if (this.feedApi === 'Article') {
        return ArticleApi
      }
    },

    getFeeds: function (page) {
      this.feedClass()
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
          const key = `${feed.feedable_type}${feed.parent_type}${feed.parent_id}`
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

      // Sort feed by posted_at
      groupedFeed.sort(function (a, b) {
        const x = b.posted_at
        const y = a.posted_at
        return x < y ? -1 : x > y ? 1 : 0
      })

      // retour feed
      return groupedFeed
    },

    isGroupable: function (type) {
      return ['Photo', 'CragRoute', 'AscentCragRoute'].includes(type)
    },

    isGroup: function (type) {
      return ['Photos', 'CragRoutes', 'AscentCragRoutes'].includes(type)
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
  .v-card__subtitle {
    padding-bottom: 5px;
    padding-top: 0;
  }
}
</style>
