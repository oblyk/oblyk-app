<template>
  <div>
    <v-img
      dark
      class="user-header-banner"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="user.bannerUrl()"
    >
      <div class="user-header-title">
        <v-avatar
          size="80"
          class="float-left mr-3"
        >
          <v-img
            :src="user.avatarUrl()"
            :alt="`logo ${user.full_name}`"
          />
        </v-avatar>
        <h1 class="font-weight-medium loved-by-king">
          {{ user.full_name }}
        </h1>
        <span>
          {{ humanizeDate(user.date_of_birth, 'L') }}
          <v-btn
            v-if="itsMe()"
            small
            icon
            class="ml-2"
            :title="$t('actions.changeAvatar')"
            :to="user.meUrl('avatar')"
          >
            <v-icon
              small
            >
              mdi-account-circle
            </v-icon>
          </v-btn>
          <v-btn
            v-if="itsMe()"
            small
            icon
            class="ml-2"
            :to="user.meUrl('banner')"
            :title="$t('actions.changeBanner')"
          >
            <v-icon
              small
            >
              mdi-panorama
            </v-icon>
          </v-btn>
        </span>
      </div>
    </v-img>
  </div>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'UserHead',
  mixins: [SessionConcern, DateHelpers],
  props: {
    user: Object
  },

  methods: {
    itsMe: function () {
      return (this.currentUser.id === this.user.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-header-banner {
  height: 500px;
  max-height: 100%;
  .change-user-banner {
    float: right;
    margin-right: 5px;
    margin-top: 5px;
  }
}
.user-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    margin-bottom: -5px;
    .v-avatar {
      vertical-align: middle;
    }
  }
}
@media only screen and (max-width: 600px) {
  .user-header-banner {
    height: 150px;
  }
}
</style>
