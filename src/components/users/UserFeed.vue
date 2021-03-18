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
        :to="linkable(feed.feedable_type) ? recordToObject(feed.feedable_type, feed.feed_object).path() : ''"
      >

        <!-- Feed card title -->
        <v-card-title
          class="feed-card-title"
        >
          <v-icon left small v-text="titleIcon(feed.feedable_type)" />

          <!-- No parent -->
          <span v-if="!haveParent(feed.feedable_type)">
            {{ $t(titleLocalKey(feed.feedable_type), { name: feed.feed_object.name } ) }}
          </span>

          <!-- With parent -->
          <span v-if="haveParent(feed.feedable_type)">
            {{ $t(titleLocalKey(feed.feedable_type) ) }}
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
    },

    linkable: function (type) {
      return !['GuideBookPdf', 'GuideBookWeb', 'Video', 'Alert'].includes(type)
    },

    haveParent: function (type) {
      return ['GuideBookPdf', 'GuideBookWeb', 'Video', 'Alert'].includes(type)
    },

    titleLocalKey: function (type) {
      if (type === 'Word') return 'components.feed.newWord'
      if (type === 'Crag') return 'components.feed.newCrag'
      if (type === 'GuideBookPaper') return 'components.feed.newGuideBookPaper'
      if (type === 'GuideBookPdf') return 'components.feed.newGuideBookPdf'
      if (type === 'GuideBookWeb') return 'components.feed.newGuideBookWeb'
      if (type === 'Gym') return 'components.feed.newGym'
      if (type === 'Video') return 'components.feed.newVideo'
      if (type === 'Alert') return 'components.feed.newAlert'
    },

    titleIcon: function (type) {
      if (type === 'Word') return 'mdi-book-open-variant'
      if (type === 'Crag') return 'mdi-terrain'
      if (type === 'GuideBookPaper') return 'mdi-book-open-page-variant'
      if (type === 'GuideBookPdf') return 'mdi-file-pdf-outline'
      if (type === 'GuideBookWeb') return 'mdi-earth'
      if (type === 'Gym') return 'mdi-home-roof'
      if (type === 'Video') return 'mdi-camera'
      if (type === 'Alert') return 'mdi-alert-box-outline'
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
