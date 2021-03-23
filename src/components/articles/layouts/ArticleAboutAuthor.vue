<template>
  <v-card flat>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-1">
          {{ $t('components.article.aboutAuthor') }}
        </div>
        <v-list-item-title class="headline mb-1">
          {{ article.author.name }}
        </v-list-item-title>
        <v-list-item-content>
          <markdown-text :text="article.author.description" />
        </v-list-item-content>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="150"
        color="grey"
      >
        <v-img :alt="article.author.name" :src="article.Author.coverUrl()" />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>
<script>
import MarkdownText from '@/components/ui/MarkdownText'
export default {
  name: 'ArticleAboutAuthor',
  components: { MarkdownText },
  props: {
    article: Object
  }
}
</script>
