<template>
  <section class="text--disabled text-right">
    {{ $t('common.at') }} {{ humanizeDate(article.published_at) }}<br>
    <span v-if="showViewCounter">
      {{ $tc('components.article.readXTimes', views, { count: views }) }}
    </span>
    <br v-if="showViewCounter">
    <span v-if="comments > 0">
      {{ $tc('components.article.comments', comments, { count: comments }) }}
    </span>
  </section>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'ArticleFooter',
  mixins: [DateHelpers],
  props: {
    article: {
      type: Object,
      required: true
    },
    showViewCounter: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      views: this.article.views || 0,
      comments: this.article.comments_count || 0
    }
  }
}
</script>
