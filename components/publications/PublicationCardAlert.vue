<template>
  <p class="my-2 px-1 text-center">
    <small>
      {{
        $tc(
          `components.publication.${publication.publishable_type}.subject.${publication.publishable_subject}`,
          publication.attachables_count,
          {
            date: humanizeDate(publication.published_at),
            week_date: humanizeDate(publication.published_week_at, 'DATE_MED'),
            count: publication.attachables_count
          }
        )
      }}
    </small>
  </p>
</template>
<script>
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'PublicationCardAlert',
  mixins: [DateHelpers],
  props: {
    publication: {
      type: Object,
      required: true
    }
  }
}
</script>
