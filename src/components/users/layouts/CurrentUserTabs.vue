<template>
  <v-tabs show-arrows >
    <v-tab to="/">
      <v-icon
        :small="!isMobile"
        color="orange"
        left
      >
        mdi-arrow-decision-outline
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.feed') }}
      </span>
    </v-tab>

    <v-tab :to="user.currentUserPath('messenger')">
      <v-icon
        :small="!isMobile"
        left
        color="teal"
      >
        mdi-forum
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.messenger') }}
      </span>
    </v-tab>

    <v-tab :to="user.currentUserPath('community/followers')">
      <v-icon
        :small="!isMobile"
        left
        color="green"
      >
        mdi-account-group
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.community') }}
      </span>
    </v-tab>

    <v-tab :to="user.currentUserPath('ascents/send-list')">
      <v-icon
        :small="!isMobile"
        left
        color="blue"
      >
        mdi-check-all
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.ascents') }}
      </span>
    </v-tab>

    <v-tab :to="user.currentUserPath('favorites/crags')">
      <v-icon
        :small="!isMobile"
        left
        color="amber"
      >
        mdi-star
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.favorites') }}
      </span>
    </v-tab>

    <v-tab :to="user.currentUserPath('guide-books')">
      <v-icon
        :small="!isMobile"
        left
        color="deep-purple"
      >
        mdi-bookshelf
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.guideBooks') }}
      </span>
    </v-tab>
    <v-tab :to="user.currentUserPath('settings/general')">
      <v-icon
        :small="!isMobile"
        left
      >
        mdi-cog
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.settings') }}
      </span>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'CurrentUserTabs',
  props: {
    user: Object
  },

  data () {
    return {
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
