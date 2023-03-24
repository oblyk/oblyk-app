<template>
  <v-list
    v-if="$auth.loggedIn"
    nav
    dense
  >
    <v-subheader class="mt-0">
      {{ $t('components.layout.appDrawer.subHeaders.mySpace') }}
    </v-subheader>

    <v-list-item
      to="/home"
      exact
    >
      <v-list-item-icon>
        <v-icon>
          {{ mdiHomeOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.home') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-group
      :prepend-icon="mdiBookOutline"
      no-action
    >
      <template #activator>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('components.layout.appDrawer.user.ascents.title') }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item to="/home/ascents/outdoor">
        <v-list-item-icon>
          <v-icon>
            {{ mdiTerrain }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.user.ascents.outdoor') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/home/ascents/indoor">
        <v-list-item-icon>
          <v-icon>
            {{ mdiOfficeBuildingMarker }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.user.ascents.indoor') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/home/climbing-sessions">
        <v-list-item-icon>
          <v-icon>
            {{ mdiTimelineText }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.user.ascents.session') }}
        </v-list-item-title>
      </v-list-item>
    </v-list-group>

    <v-list-item to="/home/favorites/crags">
      <v-list-item-icon>
        <v-icon>
          {{ mdiStarOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.favorites') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/home/messenger">
      <v-list-item-icon>
        <v-icon>
          {{ mdiMessageTextOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.messenger') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/home/guide-books">
      <v-list-item-icon>
        <v-icon>
          {{ mdiBookshelf }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.guideBooks') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/maps/my-map`">
      <v-list-item-icon>
        <v-icon>
          {{ mdiMap }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.myMap') }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import {
  mdiHomeOutline,
  mdiMessageTextOutline,
  mdiBookOutline,
  mdiAccountStarOutline,
  mdiStarOutline,
  mdiBookshelf,
  mdiMap,
  mdiTerrain,
  mdiOfficeBuildingMarker,
  mdiTimelineText
} from '@mdi/js'

export default {
  name: 'AppDrawerUser',

  data () {
    return {
      mdiHomeOutline,
      mdiMessageTextOutline,
      mdiBookOutline,
      mdiAccountStarOutline,
      mdiStarOutline,
      mdiBookshelf,
      mdiMap,
      mdiTerrain,
      mdiOfficeBuildingMarker,
      mdiTimelineText
    }
  }
}
</script>
