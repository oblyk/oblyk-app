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
        class="feed-card mb-5"
        :to="!haveParent(feed.feedable_type) ? recordToObject(feed.feedable_type, feed.feed_object).path() : ''"
      >

        <!-- Feed card title -->
        <v-card-title
          class="feed-card-title"
        >
          <v-icon left small v-text="headers[feed.feedable_type].icon" />

          <!-- No parent -->
          <span v-if="!haveParent(feed.feedable_type)">
            {{ $t(headers[feed.feedable_type].title, { name: feed.feed_object.name } ) }}
          </span>

          <!-- With parent -->
          <span v-if="haveParent(feed.feedable_type)">
            {{ $t(headers[feed.feedable_type].title ) }}
            <router-link
              :to="parentObject(feed.feedable_type, feed.feed_object).path()"
            >
              {{ parentObject(feed.feedable_type, feed.feed_object).name }}
            </router-link>
          </span>
        </v-card-title>

        <!-- Feed card content -->
        <v-card-text
          class="pb-1"
        >
          <word-feed-card :word="recordToObject('Word', feed.feed_object)" v-if="feed.feedable_type === 'Word'" />
          <crag-feed-card :crag="recordToObject('Crag', feed.feed_object)" v-if="feed.feedable_type === 'Crag'" />
          <gym-feed-card :gym="recordToObject('Gym', feed.feed_object)" v-if="feed.feedable_type === 'Gym'" />
          <alert-feed-card :alert="recordToObject('Alert', feed.feed_object)" v-if="feed.feedable_type === 'Alert'" />

          <!-- Guide books -->
          <guide-book-paper-feed-card
            :guide-book-paper="recordToObject('GuideBookPaper', feed.feed_object)"
            v-if="feed.feedable_type === 'GuideBookPaper'"
          />
          <guide-book-pdf-feed-card
            :guide-book-pdf="recordToObject('GuideBookPdf', feed.feed_object)"
            v-if="feed.feedable_type === 'GuideBookPdf'"
          />
          <guide-book-web-feed-card
            :guide-book-web="recordToObject('GuideBookWeb', feed.feed_object)"
            v-if="feed.feedable_type === 'GuideBookWeb'"
          />

          <video-feed-card
            :video="recordToObject('Video', feed.feed_object)"
            v-if="feed.feedable_type === 'Video'"
          />
        </v-card-text>
      </v-card>
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
import WordFeedCard from '@/components/words/WordFeedCard'
import CragFeedCard from '@/components/crags/CragFeedCard'
import GuideBookPaperFeedCard from '@/components/guideBookPapers/GuideBookPaperFeedCard'
import GymFeedCard from '@/components/gyms/GymFeedCard'
import GuideBookPdfFeedCard from '@/components/guideBookPdfs/GuideBookPdfFeedCard'
import Crag from '@/models/Crag'
import GuideBookWebFeedCard from '@/components/guideBookWebs/GuideBookWebFeedCard'
import CragRoute from '@/models/CragRoute'
import CragSector from '@/models/CragSector'
import VideoFeedCard from '@/components/videos/VideoFeedCard'
import AlertFeedCard from '@/components/alerts/AlertFeedCard'

export default {
  name: 'UserFeed',
  mixins: [DateHelpers, RecordToObjectHelpers],
  components: {
    AlertFeedCard,
    VideoFeedCard,
    GuideBookWebFeedCard,
    GuideBookPdfFeedCard,
    GymFeedCard,
    GuideBookPaperFeedCard,
    CragFeedCard,
    WordFeedCard,
    LoadingMore
  },
  props: {
    User: Object
  },

  data () {
    return {
      feeds: [],
      loadingFeeds: true,
      headers: {
        Word: { icon: 'mdi-book-open-variant', title: 'components.feed.newWord' },
        Crag: { icon: 'mdi-terrain', title: 'components.feed.newCrag' },
        GuideBookPaper: { icon: 'mdi-book-open-page-variant', title: 'components.feed.newGuideBookPaper' },
        GuideBookPdf: { icon: 'mdi-file-pdf-outline', title: 'components.feed.newGuideBookPdf' },
        GuideBookWeb: { icon: 'mdi-earth', title: 'components.feed.newGuideBookWeb' },
        Gym: { icon: 'mdi-home-roof', title: 'components.feed.newGym' },
        Video: { icon: 'mdi-film', title: 'components.feed.newVideo' },
        Alert: { icon: 'mdi-alert-box-outline', title: 'components.feed.newAlert' }
      }
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
      return feeds
    },

    haveParent: function (type) {
      return ['GuideBookPdf', 'GuideBookWeb', 'Video', 'Alert'].includes(type)
    },

    parentObject: function (type, feedObject) {
      if (['GuideBookPdf', 'GuideBookWeb'].includes(type)) {
        return new Crag(feedObject.crag)
      }
      if (type === 'Video') {
        if (feedObject.viewable_type === 'Crag') {
          return new Crag(feedObject.viewable)
        } else if (feedObject.viewable_type === 'CragRoute') {
          return new CragRoute(feedObject.viewable)
        }
      }
      if (type === 'Alert') {
        if (feedObject.alertable_type === 'Crag') {
          return new Crag(feedObject.alertable)
        } else if (feedObject.alertable_type === 'CragRoute') {
          return new CragRoute(feedObject.alertable)
        } else if (feedObject.alertable_type === 'CragSector') {
          return new CragSector(feedObject.alertable)
        }
      }
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
