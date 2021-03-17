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
      <v-card
        elevation="0"
        class="feed-card  mb-3"
      >

        <!-- Feed card title -->
        <v-card-title
          class="feed-card-title"
        >

          <!-- Word -->
          <div v-if="feed.feedable_type === 'Word'">
            <v-icon left small>mdi-book-open-variant</v-icon>
            {{ $t('components.feed.newWord', { name: feed.feed_object.name} ) }}
          </div>

          <!-- Crag -->
          <div v-if="feed.feedable_type === 'Crag'">
            <v-icon left small>mdi-terrain</v-icon>
            {{ $t('components.feed.newCrag', { name: feed.feed_object.name})}}
          </div>
        </v-card-title>

        <!-- Feed card content -->
        <v-card-text
          class="pb-1"
        >
          <word-feed-card :word="recordToObject('Word', feed.feed_object)" v-if="feed.feedable_type === 'Word'" />
          <crag-feed-card :crag="recordToObject('Crag', feed.feed_object)" v-if="feed.feedable_type === 'Crag'" />
        </v-card-text>
      </v-card>
    </div>
    <loading-more :get-function="getFeeds" />
  </div>
</template>
<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import LoadingMore from '@/components/layouts/LoadingMore'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import WordFeedCard from '@/components/words/WordFeedCard'
import CragFeedCard from '@/components/crags/CragFeedCard'

export default {
  name: 'UserFeed',
  mixins: [DateHelpers, RecordToObjectHelpers],
  components: { CragFeedCard, WordFeedCard, LoadingMore },
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
          for (const feed of resp.data) {
            this.feeds.push(feed)
          }
          if (resp.data.length === 0) this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingFeeds = false
          this.$root.$emit('moreIsLoaded')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-card {
  .feed-card-title {
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 0.9em;
  }
}
</style>
