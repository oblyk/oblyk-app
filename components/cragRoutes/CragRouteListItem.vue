<template>
  <v-list-item
    link
    @click="$root.$emit('getCragRouteInDrawer', route.crag.id, route.id); callback ? callback(route) : null"
  >
    <crag-route-avatar
      :crag-route="route"
      base-font-size="1rem"
      class="mr-2"
    />
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
          {{ mdiCamera }}
        </v-icon>
        <v-icon
          v-if="route.videos_count > 0"
          :title="$tc('components.video.countInfos', route.videos_count, { count: route.videos_count } )"
          small
          class="ml-3"
        >
          {{ mdiFilmstrip }}
        </v-icon>
        <v-icon
          v-if="route.comments_count > 0"
          :title="$tc('components.comment.countInfos', route.comments_count, { count: route.comments_count } )"
          small
          class="ml-3"
        >
          {{ mdiComment }}
        </v-icon>
        <small
          v-if="route.ascents_count > 0"
          class="ml-2 d-inline-block rounded border py-1 px-2"
          :title="$tc('components.ascent.countInfos', route.ascents_count, { count: route.ascents_count } )"
        >
          {{ route.ascents_count }}
          <v-icon
            class="vertical-align-sub"
            small
          >
            {{ mdiCheckAll }}
          </v-icon>
        </small>
      </v-list-item-title>
      <v-list-item-subtitle class="span-comma">
        <span v-if="route.crag_sector">
          <v-icon x-small>
            {{ mdiTextureBox }}
          </v-icon>
          {{ route.CragSector.name }}
        </span>
        <span v-if="route.height">
          {{ route.height }} {{ $t('common.meters') }}
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
import { mdiCamera, mdiFilmstrip, mdiComment, mdiTextureBox, mdiCheckAll } from '@mdi/js'
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
  },

  data () {
    return {
      mdiCamera,
      mdiFilmstrip,
      mdiComment,
      mdiTextureBox,
      mdiCheckAll
    }
  }
}
</script>
