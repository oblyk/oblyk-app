<template>
  <v-tabs
    show-arrows
  >
    <v-tab to="infos">
      {{ $t('components.crag.tabs.info') }}
    </v-tab>
    <v-tab to="routes">
      <v-badge
        color="primary"
        inline
        :content="crag.routes_figures.route_count"
      >
        {{ $t('components.crag.tabs.routes') }}
      </v-badge>
    </v-tab>
    <v-tab to="photos">
      <v-badge
        color="primary"
        inline
        :content="crag.photo_count + crag.video_count"
      >
        {{ $t('components.crag.tabs.media') }}
      </v-badge>
    </v-tab>
    <v-tab to="guide-books">
      <v-badge
        color="primary"
        inline
        :content="crag.guide_books.paper_count + crag.guide_books.web_count + crag.guide_books.pdf_count"
      >
        {{ $t('components.crag.tabs.guideBooks') }}
      </v-badge>
    </v-tab>
    <v-tab to="maps">
      {{ $t('components.crag.tabs.map') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'CragTabs',
  props: {
    crag: Object
  }
}
</script>
