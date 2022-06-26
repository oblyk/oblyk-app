<template>
  <v-card class="rounded-lg full-height">
    <v-card-title>
      <h2 class="h2-title-in-card-title">
        <v-icon left>
          {{ mdiBookshelf }}
        </v-icon>
        {{ $t('components.crag.guideBookTitle') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <guide-list
        :crag="crag"
        :limite="3"
        :link-to-more="`${crag.slug_name}/guide-books`"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiBookshelf } from '@mdi/js'
import GuideList from '@/components/crags/GuideList'

export default {
  name: 'CragGuidesCard',
  components: { GuideList },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiBookshelf
    }
  }
}
</script>
