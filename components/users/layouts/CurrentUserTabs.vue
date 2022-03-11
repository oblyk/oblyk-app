<template>
  <v-tabs show-arrows>
    <!-- Feed -->
    <v-tab to="/">
      <v-icon
        :small="!isMobile"
        color="orange"
        left
      >
        {{ mdiArrowDecisionOutline }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.feed') }}
      </span>
    </v-tab>

    <!-- Messenger -->
    <v-tab :to="`${user.currentUserPath}/messenger`">
      <v-icon
        :small="!isMobile"
        left
        color="teal"
      >
        {{ mdiForum }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.messenger') }}
      </span>
    </v-tab>

    <!-- Follower -->
    <v-tab :to="`${user.currentUserPath}/community/followers`">
      <v-icon
        :small="!isMobile"
        left
        color="green"
      >
        {{ mdiAccountGroup }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.community') }}
      </span>
    </v-tab>

    <!-- Send list -->
    <v-tab :to="`${user.currentUserPath}/ascents/send-list`">
      <v-icon
        :small="!isMobile"
        left
        color="blue"
      >
        {{ mdiCheckAll }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.ascents') }}
      </span>
    </v-tab>

    <!-- Favorites / Crags -->
    <v-tab :to="`${user.currentUserPath}/favorites/crags`">
      <v-icon
        :small="!isMobile"
        left
        color="amber"
      >
        {{ mdiStar }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.favorites') }}
      </span>
    </v-tab>

    <!-- Guide book -->
    <v-tab :to="`${user.currentUserPath}/guide-books`">
      <v-icon
        :small="!isMobile"
        left
        color="deep-purple"
      >
        {{ mdiBookshelf }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.guideBooks') }}
      </span>
    </v-tab>

    <!-- Media / Photo -->
    <v-tab :to="`${user.currentUserPath}/media/photos`">
      <v-icon
        :small="!isMobile"
        left
        color="blue"
      >
        {{ mdiCamera }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.media') }}
      </span>
    </v-tab>

    <!-- Settings / General -->
    <v-tab :to="`${user.currentUserPath}/settings/general`">
      <v-icon
        :small="!isMobile"
        left
      >
        {{ mdiCog }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.settings') }}
      </span>
    </v-tab>
  </v-tabs>
</template>

<script>
import { mdiArrowDecisionOutline, mdiForum, mdiAccountGroup, mdiCheckAll, mdiStar, mdiBookshelf, mdiCamera, mdiCog } from '@mdi/js'

export default {
  name: 'CurrentUserTabs',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiArrowDecisionOutline,
      mdiForum,
      mdiAccountGroup,
      mdiCheckAll,
      mdiStar,
      mdiBookshelf,
      mdiCamera,
      mdiCog,
      isMobile: false
    }
  },

  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 600
    }
  }
}
</script>
