<template>
  <small :title="humanizeDate(feed.posted_at, 'DATETIME_FULL')">
    {{ $t('common.posted') }}
    {{ feedDateFromNow(feed.posted_at) }}
  </small>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'FeedDateTitle',
  mixins: [DateHelpers],
  props: {
    feed: {
      type: Object,
      required: true
    }
  }
}
</script>
