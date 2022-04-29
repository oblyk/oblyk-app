<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiInformation }}
      </v-icon>
      {{ $t('common.informations') }}
    </v-card-title>
    <v-card-text>
      <p
        v-html="$t('components.area.description', {
          name: area.name,
          crags: area.crags_count,
          routes: area.routes_figures.routes_count,
          min: area.routes_figures.grade.min_text,
          max: area.routes_figures.grade.max_text
        })"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiInformation } from '@mdi/js'

export default {
  name: 'AreaDescription',
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiInformation
    }
  }
}
</script>
