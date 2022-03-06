<template>
  <v-list-item
    link
    @click="$root.$emit('getCragRouteInDrawer', route.crag.id, route.id); callback ? callback() : null"
  >
    <crag-route-avatar class="grade-route-in-list" :crag-route="route" />
    <v-list-item-content>
      <v-list-item-title
        class="climbs-pastille"
        :class="route.climbing_type"
      >
        <ascent-crag-route-status-icon
          v-if="$auth.loggedIn"
          :crag-route="route"
        />
        {{ route.name }}
        <grade-route-note :route="route" />
        <v-icon
          v-if="route.photos_count > 0"
          :title="$tc('components.photo.countInfos', route.photos_count, { count: route.photos_count } )"
          small
          class="ml-3"
        >
          mdi-camera
        </v-icon>
        <v-icon
          v-if="route.videos_count > 0"
          :title="$tc('components.video.countInfos', route.videos_count, { count: route.videos_count } )"
          small
          class="ml-3"
        >
          mdi-filmstrip
        </v-icon>
        <v-icon
          v-if="route.comments_count > 0"
          :title="$tc('components.comment.countInfos', route.comments_count, { count: route.comments_count } )"
          small
          class="ml-3"
        >
          mdi-comment
        </v-icon>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span
          v-if="route.crag_sector.id"
          @click.stop=""
        >
          <v-icon x-small>
            mdi-texture-box
          </v-icon>
          <nuxt-link
            class="text-decoration-none"
            :to="route.CragSector.path"
          >
            {{ route.CragSector.name }}
          </nuxt-link>
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
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import GradeRouteNote from '@/components/cragRoutes/partial/CragRouteNote'
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'

export default {
  name: 'CragRouteListItem',
  components: { AscentCragRouteStatusIcon, CragRouteAvatar, GradeRouteNote },
  props: {
    route: { type: Object, required: true },
    callback: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.grade-route-in-list {
  font-size: 1.2em;
}
</style>
