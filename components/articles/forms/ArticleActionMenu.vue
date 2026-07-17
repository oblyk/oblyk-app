<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          {{ mdiCog }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- Edit article -->
      <v-list-item
        :to="`${article.app_path}/edit`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiPencil }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.article.edit') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Add crag -->
      <v-list-item
        :to="`${article.app_path}/add-crags`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiTerrain }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.addCrag') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Add guide book -->
      <v-list-item
        :to="`${article.app_path}/add-guide-books`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiBookOpenVariant }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.addGuideBook') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Article photos list -->
      <v-list-item
        :to="`${article.app_path}/photos`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiImageMultiple }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.photo.photos') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Change article cover -->
      <v-list-item
        :to="`${article.app_path}/cover`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiPanorama }}</v-icon>
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
          <v-icon>{{ mdiEye }}</v-icon>
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
          <v-icon>{{ mdiEyeOff }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.unPublish') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiCog, mdiPencil, mdiTerrain, mdiBookOpenVariant, mdiImageMultiple, mdiPanorama, mdiEye, mdiEyeOff } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'ArticleActionMenu',
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiCog,
      mdiPencil,
      mdiTerrain,
      mdiBookOpenVariant,
      mdiImageMultiple,
      mdiPanorama,
      mdiEye,
      mdiEyeOff
    }
  },

  methods: {
    publishArticle () {
      new OblykApi(this.$axios, this.$auth).put(`/articles/${this.article.id}/publish`)
    },

    unPublishArticle () {
      new OblykApi(this.$axios, this.$auth).put(`/articles/${this.article.id}/un_publish`)
    }
  }
}
</script>
