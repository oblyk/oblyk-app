<template>
  <div>
    <p class="text--disabled text-right mb-0">
      {{
        $t('components.version.createdUpdated', {
          created: humanizeDate(object.history.created_at),
          updated: humanizeDate(object.history.updated_at)
        })
      }}.
      <contributions-label
        v-if="withVersion"
        version-type="crag"
        :version-id="object.id"
        :versions-count="object.versions_count"
        translate-key="components.version.version"
      />
    </p>
  </div>
</template>

<script>
import { DateHelpers } from '~/mixins/DateHelpers'
import ContributionsLabel from '~/components/globals/ContributionsLable'

export default {
  name: 'VersionInformation',
  components: { ContributionsLabel },
  mixins: [DateHelpers],
  props: {
    object: {
      type: Object,
      required: true
    },
    withVersion: {
      type: Boolean,
      default: true
    }
  }
}
</script>
