<template>
  <v-list-item
    link
    class="pl-1"
    @click="click"
  >
    <crag-route-avatar
      :crag-route="route"
      base-font-size="1rem"
      class="mr-2"
    />
    <v-list-item-content class="pt-2 pb-2">
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
      </v-list-item-title>
      <v-list-item-subtitle class="span-comma">
        <span>
          <v-icon x-small>
            {{ mdiTerrain }}
          </v-icon>
          {{ route.Crag.name }}
        </span>
        <span v-if="route.height">
          {{ route.height }} {{ $t('common.meters') }}
        </span>
        <span v-if="route.opener || route.open_year">
          {{ $t('common.open') }}
        </span>
        <span v-if="route.opener">
          {{ $t('common.by') }} {{ route.opener }}
        </span>
        <span v-if="route.open_year">
          {{ $t('common.in') }} {{ route.open_year }}
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mdiCamera, mdiFilmstrip, mdiComment, mdiTerrain } from '@mdi/js'
import GradeRouteNote from '@/components/cragRoutes/partial/CragRouteNote'
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'
import AscentCragRouteStatusIcon from '@/components/ascentCragRoutes/AscentCragRouteStatusIcon'

export default {
  name: 'CragRouteSmallLine',
  components: {
    AscentCragRouteStatusIcon,
    CragRouteAvatar,
    GradeRouteNote
  },

  props: {
    route: {
      type: Object,
      required: true
    },

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
      mdiTerrain
    }
  },

  methods: {
    click () {
      if (this.callback) {
        this.callback(this.route)
      } else {
        this.$root.$emit('getCragRouteInDrawer', this.route.crag.id, this.route.id)
      }
    }
  }
}
</script>
