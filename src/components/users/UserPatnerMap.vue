<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-map
      </v-icon>
      Carte des grimpeurs
    </v-card-title>
    <v-card-text>
      {{ user.first_name }} pratique
      <v-chip
        small
        class="ma-1"
        v-for="climb in user.climbingTypes()" :key="climb"
      >
        {{ $t(`models.climbs.${climb}`) }}
      </v-chip>
      entre <strong>{{ gradeValueToText(user.grade_min) }}</strong> et <strong>{{ gradeValueToText(user.grade_max) }}</strong>.
      <p>Partner map</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'UserPartnerMap',
  mixins: [GradeMixin],
  props: {
    user: Object
  }
}
</script>
