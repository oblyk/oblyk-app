<template>
  <div>
    <span
      v-for="(section, sectionIndex) in gymRoute.sections"
      :key="`section-${sectionIndex}`"
    >
      <span v-if="gymRoute.sections.length > 1">
        L.{{ sectionIndex + 1 }} :
      </span>
      <v-chip
        v-for="(tag, tagIndex) in section.tags"
        :key="`tag-${tagIndex}`"
        small
        class="mr-2"
      >
        <v-icon
          class="mr-1"
          small
        >
          {{ mdiPound }}
        </v-icon>
        {{ $t(`models.tags.${tag}`) }}
      </v-chip>
    </span>
  </div>
</template>

<script>
import { mdiPound } from '@mdi/js'

export default {
  name: 'GymRouteTags',
  props: {
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPound
    }
  }
}
</script>
