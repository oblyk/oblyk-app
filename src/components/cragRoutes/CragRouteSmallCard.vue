<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? cragRoute.path() : null"
    >
      <v-list-item three-line>
      <v-list-item-avatar
        size="70"
      >
        <v-avatar
          color="grey"
          size="70"
          tile
        >
          <v-img :src="cragRoute.thumbnailCoverUrl()" />
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          <span
            v-bind:class="cragRoute.climbing_type"
            class="climbs-pastille vertical-align-middle"
          >
            <ascent-crag-route-status-icon :crag-route="cragRoute" />
            {{ cragRoute.grade_to_s }} -
            {{ cragRoute.name }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle class="mt-n3 mb-4">
          <v-alert
            dense
            text
            class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
          >
            {{ $t(`models.climbs.${cragRoute.climbing_type}`) }}
          </v-alert>
          {{ cragRoute.Crag.name }}, {{ cragRoute.Crag.city }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </v-card>
  </div>
</template>

<script>
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'
export default {
  name: 'CragRouteSmallCard',
  components: { AscentCragRouteStatusIcon },
  props: {
    cragRoute: Object,
    linkable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
