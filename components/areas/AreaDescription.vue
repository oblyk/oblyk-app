<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-information
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
export default {
  name: 'AreaDescription',
  props: {
    area: Object
  }
}
</script>
