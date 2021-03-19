<template>
  <v-card
    elevation="0"
    class="feed-card mb-5"
    @click="popupable(feed.group_type) ? itemsModal = true : null"
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
    <v-card-text
      class="pb-1"
      v-if="!popupable(feed.group_type)"
    >
      <photo-gallery :photos-data="photos()" v-if="feed.group_type === 'Photos'" />
    </v-card-text>

    <!-- Dialog content -->
    <v-dialog
      v-model="itemsModal"
      max-width="700"
      v-if="popupable(feed.group_type)"
    >
      <v-card>
        <v-card-title>
          <v-icon left v-text="headers[feed.group_type].icon" />
          {{ $tc(headers[feed.group_type].title, feed.items.length, { count: feed.items.length }) }}
          <router-link :to="recordToObject(feed.feedable_type, feed).path()">
            {{ feed.name }}
          </router-link>
        </v-card-title>
        <v-card-text>
          <v-list
            v-if="feed.group_type === 'CragRoutes'"
          >
            <crag-route-list-item
              v-for="cragRoute in cragRoutes()"
              :key="cragRoute.id"
              :route="cragRoute"
              :callback="closePopup"
            />
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import PhotoGallery from '@/components/photos/PhotoGallery'
import CragRoute from '@/models/CragRoute'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'

export default {
  name: 'GroupFeedCard',
  mixins: [RecordToObjectHelpers],
  components: { CragRouteListItem, PhotoGallery },
  props: {
    feed: Object
  },

  data () {
    return {
      itemsModal: false,
      headers: {
        Photos: { icon: 'mdi-image-multiple', title: 'components.feed.newPhotos' },
        CragRoutes: { icon: 'mdi-source-branch', title: 'components.feed.newCragRoutes' }
      }
    }
  },

  methods: {
    popupable: function (type) {
      return ['CragRoutes'].includes(type)
    },

    closePopup: function () {
      this.itemsModal = false
    },

    photos: function () {
      const items = []
      for (const item of this.feed.items) {
        items.push(item.feed_object)
      }
      return items
    },

    cragRoutes: function () {
      const items = []
      for (const item of this.feed.items) {
        items.push(new CragRoute(item.feed_object))
      }
      return items
    }
  }
}
</script>
