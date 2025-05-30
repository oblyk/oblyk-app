<template>
  <v-sheet class="page-header-sheet">
    <div class="page-header-sheet-back-btn">
      <v-btn
        exact-path
        icon
        large
        :to="$nuxt.context.from || '/home'"
      >
        <v-icon color="primary">
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
    </div>
    <div class="page-header-sheet-content">
      <div class="page-header-sheet-title">
        {{ $t('components.user.tabs.community') }}
      </div>
      <div class="page-header-sheet-btn-list">
        <v-btn
          to="/home/community/followers"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiAccountMultiple }}
          </v-icon>
          {{ $t('components.user.tabs.followers') }}
        </v-btn>
        <v-btn
          to="/home/community/subscribes"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiAccountHeart }}
          </v-icon>
          {{ $t('components.user.tabs.subscribes') }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mdiArrowLeft, mdiAccountMultiple, mdiAccountHeart } from '@mdi/js'

export default {
  name: 'UserCommunityTabs',

  data () {
    return {
      mdiArrowLeft,
      mdiAccountMultiple,
      mdiAccountHeart
    }
  }
}
</script>
