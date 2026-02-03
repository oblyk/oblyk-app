<template>
  <div>
    <v-alert
      v-if="publication.add_this_week"
      color="blue"
      text
      dense
      class="mb-0 mt-2"
    >
      {{
        $tc(
          `components.publication.${publication.publishable_type}.subject.${publication.publishable_subject}`,
          publication.attachables_count,
          {
            date: humanizeDate(publication.published_at),
            week_date: humanizeDate(publication.published_week_at),
            count: publication.attachables_count
          }
        )
      }}
    </v-alert>
    <p
      v-else
      class="font-italic my-2 px-1"
    >
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
    </p>
  </div>
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
