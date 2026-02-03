<template>
  <div>
    <user-todo class="mb-4" />

    <!-- FAST ACCESS -->
    <user-fast-access class="mb-4" />

    <!-- DASH BOARDS -->
    <user-environment-card class="mb-4" />

    <div class="text-center mt-8 caption text--disabled">
      <a
        href="https://oblyk.github.io/app-user-doc/"
        class="discrete-link text--disabled text-no-wrap"
        target="_blank"
      >
        {{ $t('components.layout.appDrawer.helps') }}
      </a> •
      <nuxt-link to="/contact?back_to=/home" class="discrete-link text--disabled text-no-wrap">
        {{ $t('components.layout.appDrawer.contact') }}
      </nuxt-link> •
      <nuxt-link to="/home/settings?back_to=/home" class="discrete-link text--disabled text-no-wrap">
        {{ $t('actions.mySettings') }}
      </nuxt-link> •
      <nuxt-link to="/about?back_to=/home" class="discrete-link text--disabled text-no-wrap">
        {{ $t('components.layout.appDrawer.about') }}
      </nuxt-link>
      <div class="mt-1">
        <nuxt-link to="/about/indoor?back_to=/home" class="discrete-link text--disabled text-no-wrap">
          <v-icon class="vertical-align-sub" x-small>
            {{ mdiSourceBranch }}
          </v-icon>
          {{ $t('components.indoor.createMyIndoorGuideBook') }}
        </nuxt-link>
        <a
          href="https://github.com/oblyk"
          class="discrete-link text--disabled text-no-wrap ml-2"
          target="_blank"
        >
          <v-icon class="vertical-align-sub" x-small>
            {{ mdiGithub }}
          </v-icon>
          Code
        </a>
      </div>
      <div class="mt-2">
        <a
          href="https://apps.apple.com/fr/app/oblyk/id6569245391"
          class="discrete-link text--disabled text-no-wrap mx-1"
          target="_blank"
        >
          <v-icon class="vertical-align-sub" x-small>
            {{ mdiApple }}
          </v-icon>
          Iphone
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=org.oblyk.twa"
          class="discrete-link text--disabled text-no-wrap mx-1"
          target="_blank"
        >
          <v-icon class="vertical-align-sub" x-small>
            {{ mdiGooglePlay }}
          </v-icon>
          Android
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiApple, mdiGooglePlay, mdiGithub, mdiSourceBranch } from '@mdi/js'
import UserFastAccess from '~/components/users/UserFastAccess'
import UserEnvironmentCard from '~/components/users/UserEnvironmentCard'
import UserTodo from '~/components/users/UserTodo'

export default {
  name: 'DashboardDesktopSidebar',
  components: {
    UserTodo,
    UserEnvironmentCard,
    UserFastAccess
  },

  data () {
    return {
      mdiApple,
      mdiGooglePlay,
      mdiGithub,
      mdiSourceBranch
    }
  }
}
</script>
