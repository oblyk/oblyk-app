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
      :to="`/me/${$auth.user.slug_name}`"
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

    <v-list-item :to="`/me/${$auth.user.slug_name}/ascents/send-list`">
      <v-list-item-icon>
        <v-icon>
          {{ mdiBookOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.ascents') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/favorites/crags`">
      <v-list-item-icon>
        <v-icon>
          {{ mdiStarOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.favorites') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/messenger`">
      <v-list-item-icon>
        <v-icon>
          {{ mdiMessageTextOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.messenger') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/guide-books`">
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
  mdiMap
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
      mdiMap
    }
  }
}
</script>
