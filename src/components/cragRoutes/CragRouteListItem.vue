<template>
  <v-list-item
    link
    @click="$root.$emit('getCragRouteInDrawer', route.crag.id, route.id)"
  >
    <crag-route-avatar class="grade-route-in-list" :crag-route="route" />
    <v-list-item-content>
      <v-list-item-title
        class="climbs-pastille"
        v-bind:class="route.climbing_type"
      >
        {{ route.name }}
        <grade-route-note :route="route" />
      </v-list-item-title>
      <v-list-item-subtitle>
        <span v-if="route.crag_sector.id">
          <v-icon x-small>
            mdi-texture-box
          </v-icon>
          <router-link
            :to="route.CragSector.path()"
          >
            {{ route.CragSector.name }}
          </router-link>
        </span>
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
import GradeRouteNote from '@/components/cragRoutes/partial/CragRouteNote'
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'

export default {
  name: 'CragRouteListItem',
  components: { CragRouteAvatar, GradeRouteNote },
  props: {
    route: Object
  }
}
</script>

<style lang="scss" scoped>
.grade-route-in-list {
  font-size: 1.2em;
}
</style>
