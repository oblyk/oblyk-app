<template>
  <v-card
    elevation="0"
    class="feed-card"
    :to="!haveParent(feed.feedable_type) ? recordToObject(feed.feedable_type, feed.feed_object).path : ''"
  >
    <!-- Feed card title -->
    <v-card-title
      v-if="showTitleCard(feed.feedable_type)"
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
        <nuxt-link :to="parentObject(feed.feedable_type, feed.feed_object).path">
          {{ parentObject(feed.feedable_type, feed.feed_object).name }}
        </nuxt-link>
      </span>
    </v-card-title>

    <!-- Feed card content -->
    <v-card-text
      class="pb-1"
      :class="showTitleCard(feed.feedable_type) ? '' : 'pt-1'"
    >
      <word-feed-card v-if="feed.feedable_type === 'Word'" :word="recordToObject('Word', feed.feed_object)" />
      <crag-feed-card v-if="feed.feedable_type === 'Crag'" :crag="recordToObject('Crag', feed.feed_object)" />
      <gym-feed-card v-if="feed.feedable_type === 'Gym'" :gym="recordToObject('Gym', feed.feed_object)" />
      <alert-feed-card v-if="feed.feedable_type === 'Alert'" :alert="recordToObject('Alert', feed.feed_object)" />
      <article-feed-card v-if="feed.feedable_type === 'Article'" :article="recordToObject('Article', feed.feed_object)" />

      <!-- Guide books -->
      <guide-book-paper-feed-card
        v-if="feed.feedable_type === 'GuideBookPaper'"
        :guide-book-paper="recordToObject('GuideBookPaper', feed.feed_object)"
      />
      <guide-book-pdf-feed-card
        v-if="feed.feedable_type === 'GuideBookPdf'"
        :guide-book-pdf="recordToObject('GuideBookPdf', feed.feed_object)"
      />
      <guide-book-web-feed-card
        v-if="feed.feedable_type === 'GuideBookWeb'"
        :guide-book-web="recordToObject('GuideBookWeb', feed.feed_object)"
      />

      <video-feed-card
        v-if="feed.feedable_type === 'Video'"
        :video="recordToObject('Video', feed.feed_object)"
      />
    </v-card-text>
    <v-card-subtitle>
      <feed-date-title :feed="feed" />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import WordFeedCard from '@/components/words/WordFeedCard'
import CragFeedCard from '@/components/crags/CragFeedCard'
import GymFeedCard from '@/components/gyms/GymFeedCard'
import AlertFeedCard from '@/components/alerts/AlertFeedCard'
import GuideBookPaperFeedCard from '@/components/guideBookPapers/GuideBookPaperFeedCard'
import GuideBookPdfFeedCard from '@/components/guideBookPdfs/GuideBookPdfFeedCard'
import GuideBookWebFeedCard from '@/components/guideBookWebs/GuideBookWebFeedCard'
import VideoFeedCard from '@/components/videos/VideoFeedCard'
import Crag from '@/models/Crag'
import CragRoute from '@/models/CragRoute'
import CragSector from '@/models/CragSector'
import ArticleFeedCard from '@/components/articles/ArticleFeedCard'
import FeedDateTitle from '@/components/feeds/FeedDateTitle'

export default {
  name: 'SimpleFeedCard',
  components: {
    FeedDateTitle,
    ArticleFeedCard,
    VideoFeedCard,
    GuideBookWebFeedCard,
    GuideBookPdfFeedCard,
    GuideBookPaperFeedCard,
    AlertFeedCard,
    GymFeedCard,
    CragFeedCard,
    WordFeedCard
  },
  mixins: [RecordToObjectHelpers],
  props: {
    feed: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      headers: {
        Word: { icon: 'mdi-book-open-variant', title: 'components.feed.newWord' },
        Crag: { icon: 'mdi-terrain', title: 'components.feed.newCrag' },
        GuideBookPaper: { icon: 'mdi-book-open-page-variant', title: 'components.feed.newGuideBookPaper' },
        GuideBookPdf: { icon: 'mdi-file-pdf-outline', title: 'components.feed.newGuideBookPdf' },
        GuideBookWeb: { icon: 'mdi-earth', title: 'components.feed.newGuideBookWeb' },
        Gym: { icon: 'mdi-home-roof', title: 'components.feed.newGym' },
        Video: { icon: 'mdi-film', title: 'components.feed.newVideo' },
        Alert: { icon: 'mdi-alert-box-outline', title: 'components.feed.newAlert' },
        Article: { icon: 'mdi-newspaper-variant-outline', title: 'components.feed.newArticle' }
      }
    }
  },

  methods: {
    showTitleCard (type) {
      return !['Article'].includes(type)
    },

    haveParent (type) {
      return ['GuideBookPdf', 'GuideBookWeb', 'Video', 'Alert', 'Photo'].includes(type)
    },

    parentObject (type, feedObject) {
      if (['GuideBookPdf', 'GuideBookWeb'].includes(type)) {
        return new Crag({ attributes: feedObject.crag })
      }
      if (type === 'Video') {
        if (feedObject.viewable_type === 'Crag') {
          return new Crag({ attributes: feedObject.viewable })
        } else if (feedObject.viewable_type === 'CragRoute') {
          return new CragRoute({ attributes: feedObject.viewable })
        }
      }
      if (type === 'Alert') {
        if (feedObject.alertable_type === 'Crag') {
          return new Crag({ attributes: feedObject.alertable })
        } else if (feedObject.alertable_type === 'CragRoute') {
          return new CragRoute({ attributes: feedObject.alertable })
        } else if (feedObject.alertable_type === 'CragSector') {
          return new CragSector({ attributes: feedObject.alertable })
        }
      }
    }
  }
}
</script>
