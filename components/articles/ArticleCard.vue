<template>
  <v-card
    class="pa-2"
    :to="article.app_path"
  >
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-img
          height="100%"
          class="rounded-sm"
          :src="imageVariant(article.attachments.cover, { fit: 'scale-down', height: 1080, width: 1080 })"
          :alt="article.name"
        />
      </v-col>
      <v-col class="col-12 col-md-9">
        <h3 class="mb-2">
          {{ article.name }}
        </h3>
        <div v-html="article.description" />
        <article-footer
          v-if="showFooter"
          class="mt-2"
          :article="article"
        />
        <p
          v-if="showReadMore"
          class="text-right"
        >
          <v-btn
            :to="article.path"
            text
            small
            color="primary"
          >
            {{ $t('actions.readMore') }}
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ArticleFooter from '@/components/articles/layouts/ArticleFooter'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'ArticleCard',
  components: { ArticleFooter },
  mixins: [ImageVariantHelpers],
  props: {
    article: {
      type: Object,
      required: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showReadMore: {
      type: Boolean,
      default: false
    }
  }
}
</script>
