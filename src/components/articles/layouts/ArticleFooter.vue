<template>
  <section class="text--disabled text-right">
    {{ $t('common.at') }} {{ humanizeDate(article.published_at) }}<br>
    {{ $tc('components.article.readXTimes', views, { count: views }) }}
  </section>
</template>
<script>
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'ArticleFooter',
  mixins: [DateHelpers],
  props: {
    article: Object
  },

  data () {
    return {
      views: this.article.views || 0
    }
  }
}
</script>
