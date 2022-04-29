<template>
  <v-tabs
    show-arrows
  >
    <!-- Profil -->
    <v-tab :to="user.userPath">
      <v-icon
        :small="!isMobile"
        color="teal"
        left
      >
        {{ mdiAccountBox }}
      </v-icon>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.profile') }}
      </span>
    </v-tab>

    <!-- Ascents -->
    <v-tab :to="`${user.userPath}/ascents`">
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

    <!-- Media -->
    <v-tab :to="`${user.userPath}/media/photos`">
      <v-icon
        :small="!isMobile"
        left
        color="blue"
      >
        {{ mdiCamera }}
      </v-icon>
      <span class="mr-1">
        {{ user.photos_count + user.videos_count }}
      </span>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.media') }}
      </span>
    </v-tab>

    <!-- Subscribes -->
    <v-tab :to="`${user.userPath}/subscribes`">
      <v-icon
        :small="!isMobile"
        left
        color="amber"
      >
        {{ mdiStar }}
      </v-icon>
      <span class="mr-1">
        {{ user.subscribes_count }}
      </span>
      <span class="hidden-sm-only hidden-xs-only">
        {{ $t('components.user.tabs.subscribes') }}
      </span>
    </v-tab>

    <!-- Followers -->
    <v-tab :to="`${user.userPath}/followers`">
      <v-icon
        :small="!isMobile"
        left
        color="green"
      >
        {{ mdiTooltipAccount }}
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
import { mdiAccountBox, mdiCheckAll, mdiCamera, mdiStar, mdiTooltipAccount } from '@mdi/js'

export default {
  name: 'UserTabs',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiAccountBox,
      mdiCheckAll,
      mdiCamera,
      mdiStar,
      mdiTooltipAccount,
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
