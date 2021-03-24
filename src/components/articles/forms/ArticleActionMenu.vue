<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-list>

      <!-- Edit article -->
      <v-list-item
        :to="article.path('edit')"
      >
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.article.edit') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Change article cover -->
      <v-list-item
        :to="article.path('cover')"
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
import ArticleApi from '@/services/oblyk-api/ArticleApi'

export default {
  name: 'ArticleActionMenu',
  props: {
    article: Object
  },

  methods: {
    publishArticle: function () {
      ArticleApi.publish(this.article.id)
    },

    unPublishArticle: function () {
      ArticleApi.unPublish(this.article.id)
    }
  }
}
</script>
