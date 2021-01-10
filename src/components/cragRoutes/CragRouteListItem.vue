<template>
  <v-list-item>
    <v-list-item-avatar
      tile
      class="border-color-grade"
    >
      <div
        class="grade-color-bar"
        :style="`background-image: linear-gradient(${gradeValueToColor(route.grade_gap.min_grade_value)} 50%, ${gradeValueToColor(route.grade_gap.max_grade_value)} 50%);`"
      />
      <strong class="grade-value">
        {{ route.grade_to_s }}
      </strong>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        <strong v-if="route.sections_count > 1">
          {{ route.sections_count }}L.
        </strong>
        {{ route.name }}
        <grade-route-note :route="route" />
      </v-list-item-title>
      <v-list-item-subtitle>
        <span v-if="route.height">
          {{ route.height }} {{ $t('common.meters') }},
        </span>
        <span v-if="route.opener || route.open_year">
          ouvert
          <span v-if="route.opener">
            par {{ route.opener }}
          </span>
          <span v-if="route.opener">
            en {{ route.open_year }}
          </span>
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { GradeMixin } from '@/mixins/GradeMixin'
import GradeRouteNote from '@/components/cragRoutes/partial/GradeRouteNote'

export default {
  name: 'CragRouteListItem',
  components: { GradeRouteNote },
  mixins: [GradeMixin],
  props: {
    route: Object
  }
}
</script>

<style lang="scss" scoped>
.border-color-grade {
  min-width: 60px !important;
  width: 60px !important;
  justify-content: flex-start;
  .grade-color-bar {
    border-radius: 3px;
    height: 100%;
    width: 6px;
  }
  .grade-value {
    display: inline-block;
    width: 54px;
    text-align: center;
  }
}
</style>
