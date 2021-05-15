<template>
  <v-tabs
    show-arrows
  >

    <!-- Profil -->
    <v-tab :to="user.userPath()">
      <v-icon
        :small="!isMobile"
        color="teal"
        left
      >
        mdi-account-box
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.profile') }}
      </span>
    </v-tab>

    <!-- Ascents -->
    <v-tab :to="user.userPath('ascents')">
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

    <!-- Media -->
    <v-tab :to="user.userPath('media/photos')">
      <v-icon
        :small="!isMobile"
        left
        color="blue"
      >
        mdi-camera
      </v-icon>
      <span class="mr-1">
        {{ user.photos_count + user.videos_count }}
      </span>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.media') }}
      </span>
    </v-tab>

    <!-- Subscribes -->
    <v-tab :to="user.userPath('subscribes')">
      <v-icon
        :small="!isMobile"
        left
        color="amber"
      >
        mdi-star
      </v-icon>
      <span class="mr-1">
        {{ user.subscribes_count }}
      </span>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.subscribes') }}
      </span>
    </v-tab>

    <!-- Followers -->
    <v-tab :to="user.userPath('followers')">
      <v-icon
        :small="!isMobile"
        left
        color="green"
      >
        mdi-tooltip-account
      </v-icon>
      <span class="mr-1">
        {{ user.followers_count }}
      </span>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.followers') }}
      </span>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserTabs',
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
