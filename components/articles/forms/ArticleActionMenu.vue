<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          mdi-cog
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- Edit article -->
      <v-list-item
        :to="`/a${article.path}/edit`"
      >
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.article.edit') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Add crag -->
      <v-list-item
        :to="`/a${article.path}/add-crags`"
      >
        <v-list-item-icon>
          <v-icon>mdi-terrain</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.addCrag') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Add guide book -->
      <v-list-item
        :to="`/a${article.path}/add-guide-books`"
      >
        <v-list-item-icon>
          <v-icon>mdi-book-open-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.addGuideBook') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Article photos list -->
      <v-list-item
        :to="`${article.path}/photos`"
      >
        <v-list-item-icon>
          <v-icon>mdi-image-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.photo.photos') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Change article cover -->
      <v-list-item
        :to="`/a${article.path}/cover`"
      >
        <v-list-item-icon>
          <v-icon>mdi-panorama</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.changeCover') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Publish article -->
      <v-list-item
        v-if="!article.published"
        @click="publishArticle()"
      >
        <v-list-item-icon>
          <v-icon>mdi-eye</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.publish') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Un publish article -->
      <v-list-item
        v-if="article.published"
        @click="unPublishArticle()"
      >
        <v-list-item-icon>
          <v-icon>mdi-eye-off</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.unPublish') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import ArticleApi from '~/services/oblyk-api/ArticleApi'

export default {
  name: 'ArticleActionMenu',
  props: {
    article: Object
  },

  methods: {
    publishArticle () {
      new ArticleApi(this.$axios, this.$auth).publish(this.article.id)
    },

    unPublishArticle () {
      new ArticleApi(this.$axios, this.$auth).unPublish(this.article.id)
    }
  }
}
</script>
