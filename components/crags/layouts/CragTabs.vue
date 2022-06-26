<template>
  <v-tabs
    class="mb-5 rounded-lg rounded-t-0"
    show-arrows
  >
    <v-tab :to="crag.path">
      {{ $t('components.crag.tabs.info') }}
    </v-tab>
    <v-tab :to="`${crag.path}/routes`">
      <v-badge
        color="primary"
        inline
        :value="crag.routes_figures.route_count > 0"
        :content="crag.routes_figures.route_count"
      >
        {{ $t('components.crag.tabs.routes') }}
      </v-badge>
    </v-tab>
    <v-tab :to="`${crag.path}/photos`">
      <v-badge
        color="primary"
        inline
        :value="(crag.all_photos_count + crag.all_videos_count) > 0"
        :content="crag.all_photos_count + crag.all_videos_count"
      >
        {{ $t('components.crag.tabs.media') }}
      </v-badge>
    </v-tab>
    <v-tab :to="`${crag.path}/links`">
      <v-badge
        :value="crag.link_count > 0"
        color="primary"
        inline
        :content="crag.link_count"
      >
        {{ $t('components.crag.tabs.links') }}
      </v-badge>
    </v-tab>
    <v-tab :to="`${crag.path}/guide-books`">
      <v-badge
        color="primary"
        inline
        :value="(crag.guide_books.paper_count + crag.guide_books.web_count + crag.guide_books.pdf_count) > 0"
        :content="crag.guide_books.paper_count + crag.guide_books.web_count + crag.guide_books.pdf_count"
      >
        {{ $t('components.crag.tabs.guideBooks') }}
      </v-badge>
    </v-tab>
    <v-tab :to="`${crag.path}/maps`">
      {{ $t('components.crag.tabs.map') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'CragTabs',
  props: {
    crag: {
      type: Object,
      required: true
    }
  }
}
</script>
