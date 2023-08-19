<template>
  <v-card
    elevation="0"
    class="feed-card"
  >
    <!-- Feed card title -->
    <v-card-title
      class="feed-card-title"
    >
      <v-icon left small v-text="headers[feed.group_type].icon" />
      {{ $tc(headers[feed.group_type].title, feed.items.length, { count: feed.items.length }) }}
      <nuxt-link :to="recordToObject(feed.feedable_type, feed).path">
        {{ feed.name }}
      </nuxt-link>
    </v-card-title>

    <!-- Feed card content -->
    <v-card-text class="pb-1">
      <!-- Gallery photo -->
      <photo-gallery
        v-if="feed.group_type === 'Photos'"
        gallery-type="Feed"
        :preload-photos="photos()"
      />

      <!-- New ascents -->
      <v-list
        v-if="feed.group_type === 'AscentCragRoutes'"
      >
        <div
          v-for="(ascentCragRoute, index) in ascentCragRoutes()"
          :key="ascentCragRoute.id"
        >
          <crag-route-feed-list-item
            v-if="seeMore || index < limit"
            :ascent="ascentCragRoute"
          />
        </div>
        <p
          v-if="!seeMore && ascentCragRoutes().length > limit"
          class="text-center mb-0 mt-3"
        >
          <v-btn
            small
            text
            color="primary"
            @click="seeMore = !seeMore"
          >
            {{ $t('components.feed.displayNMore', { count: ascentCragRoutes().length - limit }) }}
          </v-btn>
        </p>
      </v-list>

      <!-- New crag route -->
      <v-list v-if="feed.group_type === 'CragRoutes'">
        <div
          v-for="(cragRoute, index) in cragRoutes()"
          :key="cragRoute.id"
        >
          <crag-route-list-item
            v-if="seeMore || index < limit"
            :route="cragRoute"
          />
        </div>
        <p
          v-if="!seeMore && cragRoutes().length > limit"
          class="text-center mb-0 mt-3"
        >
          <v-btn
            small
            text
            color="primary"
            @click="seeMore = !seeMore"
          >
            {{ $t('components.feed.displayNMore', { count: cragRoutes().length - limit }) }}
          </v-btn>
        </p>
      </v-list>
    </v-card-text>

    <v-card-subtitle>
      <feed-date-title :feed="feed" />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mdiImageMultiple, mdiSourceBranch, mdiCheckboxMultipleOutline } from '@mdi/js'
import PhotoGallery from '@/components/photos/PhotoGallery'
import CragRoute from '@/models/CragRoute'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'
import AscentCragRoute from '@/models/AscentCragRoute'
import CragRouteFeedListItem from '@/components/cragRoutes/CragRouteFeedListItem'
import Photo from '@/models/Photo'
import FeedDateTitle from '@/components/feeds/FeedDateTitle'
import Word from '~/models/Word'
import Gym from '~/models/Gym'
import Crag from '~/models/Crag'
import CragSector from '~/models/CragSector'
import GuideBookPaper from '~/models/GuideBookPaper'
import GuideBookPdf from '~/models/GuideBookPdf'
import GuideBookWeb from '~/models/GuideBookWeb'
import Video from '~/models/Video'
import Alert from '~/models/Alert'
import User from '~/models/User'
import Article from '~/models/Article'

export default {
  name: 'GroupFeedCard',
  components: {
    FeedDateTitle,
    CragRouteFeedListItem,
    CragRouteListItem,
    PhotoGallery
  },
  props: {
    feed: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      limit: 5,
      seeMore: false,
      headers: {
        Photos: { icon: mdiImageMultiple, title: 'components.feed.newPhotos' },
        CragRoutes: { icon: mdiSourceBranch, title: 'components.feed.newCragRoutes' },
        AscentCragRoutes: { icon: mdiCheckboxMultipleOutline, title: 'components.feed.newAscentCragRoutes' }
      },

      mdiImageMultiple,
      mdiSourceBranch,
      mdiCheckboxMultipleOutline
    }
  },

  methods: {
    photos () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new Photo({ attributes: item.feed_object }))
      }
      return items
    },

    cragRoutes () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new CragRoute({ attributes: item.feed_object }))
      }

      // Sort feed by grade
      items.sort(function (a, b) {
        const x = b.min_grade_value
        const y = a.min_grade_value
        return x < y ? -1 : x > y ? 1 : 0
      })

      return items
    },

    ascentCragRoutes () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new AscentCragRoute({ attributes: item.feed_object }))
      }

      // Sort feed by grade
      items.sort(function (a, b) {
        const x = b.min_grade_value
        const y = a.min_grade_value
        return x < y ? -1 : x > y ? 1 : 0
      })

      return items
    },

    recordToObject (type, data) {
      if (type === 'Word') {
        return new Word({ attributes: data })
      } else if (type === 'Gym') {
        return new Gym({ attributes: data })
      } else if (type === 'Crag') {
        return new Crag({ attributes: data })
      } else if (type === 'CragRoute') {
        return new CragRoute({ attributes: data })
      } else if (type === 'CragSector') {
        return new CragSector({ attributes: data })
      } else if (type === 'GuideBookPaper') {
        return new GuideBookPaper({ attributes: data })
      } else if (type === 'GuideBookPdf') {
        return new GuideBookPdf({ attributes: data })
      } else if (type === 'GuideBookWeb') {
        return new GuideBookWeb({ attributes: data })
      } else if (type === 'Video') {
        return new Video({ attributes: data })
      } else if (type === 'Alert') {
        return new Alert({ attributes: data })
      } else if (type === 'Photo') {
        return new Photo({ attributes: data })
      } else if (type === 'AscentCragRoute') {
        return new AscentCragRoute({ attributes: data })
      } else if (type === 'User') {
        return new User({ attributes: data })
      } else if (type === 'Article') {
        return new Article({ attributes: data })
      }
    }
  }
}
</script>
