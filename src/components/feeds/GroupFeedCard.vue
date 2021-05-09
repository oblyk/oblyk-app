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
      <router-link :to="recordToObject(feed.feedable_type, feed).path()">
        {{ feed.name }}
      </router-link>
    </v-card-title>

    <!-- Feed card content -->
    <v-card-text class="pb-1">

      <!-- Gallery photo -->
      <photo-gallery :photos="photos()" v-if="feed.group_type === 'Photos'" />

      <!-- New ascents -->
      <v-list
        v-if="feed.group_type === 'AscentCragRoutes'"
      >
        <div
          v-for="(ascentCragRoute, index) in ascentCragRoutes()"
          :key="ascentCragRoute.id"
        >
          <crag-route-feed-list-item
            v-if="seeMore || index < limite"
            :ascent="ascentCragRoute"
          />
        </div>
        <p
          class="text-center mb-0 mt-3"
          v-if="!seeMore && ascentCragRoutes().length > limite"
        >
          <v-btn
            @click="seeMore = !seeMore"
            small
            text
            color="primary"
          >
            {{ $t('components.feed.displayNMore', { count: ascentCragRoutes().length - limite }) }}
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
            v-if="seeMore || index < limite"
            :route="cragRoute"
          />
        </div>
        <p
          class="text-center mb-0 mt-3"
          v-if="!seeMore && cragRoutes().length > limite"
        >
          <v-btn
            @click="seeMore = !seeMore"
            small
            text
            color="primary"
          >
            {{ $t('components.feed.displayNMore', { count: cragRoutes().length - limite }) }}
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
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import PhotoGallery from '@/components/photos/PhotoGallery'
import CragRoute from '@/models/CragRoute'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'
import AscentCragRoute from '@/models/AscentCragRoute'
import CragRouteFeedListItem from '@/components/cragRoutes/CragRouteFeedListItem'
import Photo from '@/models/Photo'
import FeedDateTitle from '@/components/feeds/FeedDateTitle'

export default {
  name: 'GroupFeedCard',
  mixins: [RecordToObjectHelpers],
  components: {
    FeedDateTitle,
    CragRouteFeedListItem,
    CragRouteListItem,
    PhotoGallery
  },
  props: {
    feed: Object
  },

  data () {
    return {
      limite: 5,
      seeMore: false,
      headers: {
        Photos: { icon: 'mdi-image-multiple', title: 'components.feed.newPhotos' },
        CragRoutes: { icon: 'mdi-source-branch', title: 'components.feed.newCragRoutes' },
        AscentCragRoutes: { icon: 'mdi-check-box-multiple-outline', title: 'components.feed.newAscentCragRoutes' }
      }
    }
  },

  methods: {
    photos: function () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new Photo(item.feed_object))
      }
      return items
    },

    cragRoutes: function () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new CragRoute(item.feed_object))
      }

      // Sort feed by grade
      items.sort(function (a, b) {
        const x = b.min_grade_value
        const y = a.min_grade_value
        return x < y ? -1 : x > y ? 1 : 0
      })

      return items
    },

    ascentCragRoutes: function () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new AscentCragRoute(item.feed_object))
      }

      // Sort feed by grade
      items.sort(function (a, b) {
        const x = b.min_grade_value
        const y = a.min_grade_value
        return x < y ? -1 : x > y ? 1 : 0
      })

      return items
    }
  }
}
</script>
