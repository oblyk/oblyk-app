<template>
  <v-tabs
    show-arrows
  >
    <v-tab to="infos">
      {{ $t('components.crag.tabs.info') }}
    </v-tab>
    <v-tab to="photos">
      <v-badge
        color="primary"
        inline
        v-if="crag.photo_count + crag.video_count"
        :content="crag.photo_count + crag.video_count"
      >
        {{ $t('components.crag.tabs.media') }}
      </v-badge>
      <span v-else>
        {{ $t('components.crag.tabs.media') }}
      </span>
    </v-tab>
    <v-tab to="links">
      <v-badge
        v-if="crag.link_count"
        color="primary"
        inline
        :content="crag.link_count"
      >
        {{ $t('components.crag.tabs.links') }}
      </v-badge>
      <span v-else>
        {{ $t('components.crag.tabs.links') }}
      </span>
    </v-tab>
    <v-tab to="guide-books">
      <v-badge
        color="primary"
        inline
        v-if="crag.guide_books.paper_count + crag.guide_books.web_count + crag.guide_books.pdf_count"
        :content="crag.guide_books.paper_count + crag.guide_books.web_count + crag.guide_books.pdf_count"
      >
        {{ $t('components.crag.tabs.guideBooks') }}
      </v-badge>
      <span v-else>
        {{ $t('components.crag.tabs.guideBooks') }}
      </span>
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
