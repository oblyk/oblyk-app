<template>
  <v-row>
    <v-col class="col-12 col-md-3">
      <v-img
        :src="article.thumbnailCoverUrl()"
        :alt="article.name"
      />
    </v-col>
    <v-col class="col-12 col-md-9">
      <h4>{{ article.name }}</h4>
      <div v-html="article.description" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ArticleFeedCard',
  props: {
    article: Object
  }
}
</script>
