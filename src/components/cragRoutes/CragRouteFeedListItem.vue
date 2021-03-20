<template>
  <v-list-item
    link
    class="mb-5"
    @click="$root.$emit('getCragRouteInDrawer', route.crag.id, route.id); callback ? callback() : null"
  >
    <crag-route-avatar class="grade-route-in-list" :crag-route="route" />
    <v-list-item-content class="pt-1 pb-1">
      <v-list-item-title
        class="climbs-pastille"
        v-bind:class="route.climbing_type"
      >
        {{ route.name }}
        <grade-route-note :route="route" />
        <v-icon
          :title="$tc('components.photo.countInfos', route.photos_count, { count: route.photos_count } )"
          v-if="route.photos_count > 0"
          small
          class="ml-3"
        >
          mdi-camera
        </v-icon>
        <v-icon
          :title="$tc('components.video.countInfos', route.videos_count, { count: route.videos_count } )"
          v-if="route.videos_count > 0"
          small
          class="ml-3"
        >
          mdi-filmstrip
        </v-icon>
        <v-icon
          :title="$tc('components.comment.countInfos', route.comments_count, { count: route.comments_count } )"
          v-if="route.comments_count > 0"
          small
          class="ml-3"
        >
          mdi-comment
        </v-icon>
      </v-list-item-title>
      <v-list-item-subtitle>
      <span>
        <v-icon x-small>
          mdi-terrain
        </v-icon>
        <router-link
          @click.stop=""
          class="text-decoration-none"
          :to="route.Crag.path()"
        >
          {{ route.Crag.name }}
        </router-link>
        </span>
          <span v-if="route.height">
            {{ route.height }} {{ $t('common.meters') }},
          </span>
          <span v-if="route.opener || route.open_year">
            {{ $t('common.open') }}
          <span v-if="route.opener">
            {{ $t('common.by') }} {{ route.opener }}
          </span>
          <span v-if="route.open_year">
            {{ $t('common.in') }} {{ route.open_year }}
          </span>
        </span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <ascent-crag-route-status-icon
          :crag-route="route"
          :ascent-status="ascent.ascent_status"
        />
        {{ $t(`models.ascentStatus.${ascent.ascent_status}`) }},
        {{ $t('components.ascentCragRoute.madeOn', { date: humanizeDate(ascent.released_at) }) }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import GradeRouteNote from '@/components/cragRoutes/partial/CragRouteNote'
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'

export default {
  name: 'CragRouteFeedListItem',
  mixins: [DateHelpers],
  components: { AscentCragRouteStatusIcon, CragRouteAvatar, GradeRouteNote },
  props: {
    ascent: Object,
    callback: Function
  },

  data () {
    return {
      route: this.ascent.CragRoute
    }
  }
}
</script>

<style lang="scss" scoped>
.grade-route-in-list {
  font-size: 1.2em;
}
</style>
