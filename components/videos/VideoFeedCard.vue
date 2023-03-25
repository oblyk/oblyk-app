<template>
  <v-row>
    <v-col class="col-12 col-sm-4">
      <iframe :src="video.url_for_iframe" height="180px" width="100%" />
    </v-col>
    <v-col class="col-12 col-sm-8">
      <div class="caption">
        {{ video.description }}
      </div>
      <div v-if="video.creator.uuid">
        {{ $t('actions.addedBy') }} :
        <nuxt-link
          :to="`/climbers/${video.creator.slug_name}/profile`"
        >
          {{ video.creator.name }}
        </nuxt-link>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VideoFeedCard',
  props: {
    video: Object
  }
}
</script>

<style lang="scss" scoped>
iframe {
  border: none
}
</style>
