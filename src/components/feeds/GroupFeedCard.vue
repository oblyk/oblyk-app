<template>
  <v-card
    elevation="0"
    class="feed-card mb-5"
  >
    <!-- Feed card title -->
    <v-card-title
      class="feed-card-title"
    >
      <v-icon left small v-text="headers[feed.group_type].icon" />
      {{ $tc(headers[feed.group_type].title, feed.items.length, { count: feed.items.length }) }}
      <router-link
        :to="recordToObject(feed.feedable_type, feed).path()"
      >
        {{ feed.name }}
      </router-link>
    </v-card-title>

    <!-- Feed card content -->
    <v-card-text
      class="pb-1"
    >
      <photo-gallery :photos-data="photos()" v-if="feed.group_type === 'Photos'" />
    </v-card-text>
  </v-card>
</template>

<script>
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'GroupFeedCard',
  mixins: [RecordToObjectHelpers],
  components: { PhotoGallery },
  props: {
    feed: Object
  },

  data () {
    return {
      headers: {
        Photos: { icon: 'mdi-image-multiple', title: 'components.feed.newPhotos' }
      }
    }
  },

  methods: {
    photos: function () {
      const photos = []
      for (const item of this.feed.items) {
        photos.push(item.feed_object)
      }
      return photos
    }
  }
}
</script>
