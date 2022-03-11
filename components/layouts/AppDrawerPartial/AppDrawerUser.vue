<template>
  <v-list
    v-if="$auth.loggedIn"
    nav
    dense
  >
    <v-subheader class="mt-0">
      {{ $t('components.layout.appDrawer.subHeaders.me') }}
    </v-subheader>

    <v-list-item to="/">
      <v-list-item-icon>
        <v-icon color="orange">
          {{ mdiArrowDecisionOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.feed') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/messenger`">
      <v-list-item-icon>
        <v-icon color="teal">
          {{ mdiForum }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.messenger') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/ascents/send-list`">
      <v-list-item-icon>
        <v-icon color="blue">
          {{ mdiCheckAll }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.ascents') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/community/followers`">
      <v-list-item-icon>
        <v-icon color="green">
          {{ mdiAccountStarOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.subscribers') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/favorites/crags`">
      <v-list-item-icon>
        <v-icon color="amber">
          {{ mdiStar }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.favorites') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item :to="`/me/${$auth.user.slug_name}/guide-books`">
      <v-list-item-icon>
        <v-icon color="deep-purple">
          {{ mdiBookshelf }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.user.guideBooks') }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { mdiArrowDecisionOutline, mdiForum, mdiCheckAll, mdiAccountStarOutline, mdiStar, mdiBookshelf } from '@mdi/js'

export default {
  name: 'AppDrawerUser',

  data () {
    return {
      mdiArrowDecisionOutline,
      mdiForum,
      mdiCheckAll,
      mdiAccountStarOutline,
      mdiStar,
      mdiBookshelf
    }
  }
}
</script>
