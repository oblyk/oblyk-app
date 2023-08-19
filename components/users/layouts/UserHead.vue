<template>
  <div>
    <v-img
      dark
      class="user-header-banner"
      gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
      :src="user.croppedBannerUrl"
      :srcset="`${user.croppedBannerUrl} 500w, ${user.bannerUrl} 600w`"
      :lazy-src="user.thumbnailBannerUrl"
    >
      <div
        v-if="itsMe()"
        class="user-header-banner-action"
      >
        <v-btn
          small
          icon
          dark
          class="black-btn-icon --with-border"
          :to="`${user.currentUserPath}/settings/banner`"
          :title="$t('actions.changeBanner')"
        >
          <v-icon small>
            {{ mdiPanorama }}
          </v-icon>
        </v-btn>
      </div>
    </v-img>
    <div class="user-header-title">
      <div class="float-left user-header-avatar-area">
        <v-avatar
          size="100"
          class="user-header-avatar"
          @click="avatarPictureDialog = true"
        >
          <v-img
            :src="user.avatarUrl"
            :alt="`logo ${user.full_name}`"
          />
        </v-avatar>
        <div
          v-if="itsMe()"
          class="user-header-avatar-action"
        >
          <v-btn
            icon
            dark
            small
            class="black-btn-icon --with-border"
            :title="$t('actions.changeAvatar')"
            :to="`${user.currentUserPath}/settings/avatar`"
          >
            <v-icon small>
              {{ mdiAccountCircle }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <h1>
        {{ user.full_name }}
        <v-btn
          v-if="itsMe()"
          dark
          icon
          small
          class="ml-2 mb-2 black-btn-icon --with-border"
          :title="$t('actions.editMyProfile')"
          :to="`${user.currentUserPath}/settings/general`"
        >
          <v-icon
            small
          >
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
        <v-btn
          text
          class="mb-2 d-none d-md-inline-flex"
          :to="`${itsMe() ? `${user.currentUserPath}/community` : user.userPath}/followers`"
        >
          <span v-if="user.followers_count > 0">
            {{ user.followers_count }} abonné·es
          </span>
          <span v-else>
            Abonné·es
          </span>
        </v-btn>
      </h1>
      <p
        v-if="user.followers_count > 0"
        class="subtitle-1 d-md-none mt-n2 mb-0"
      >
        <nuxt-link
          :to="`${itsMe() ? `${user.currentUserPath}/community` : user.userPath}/followers`"
          class="discrete-link"
        >
          {{ user.followers_count }} abonné·es
        </nuxt-link>
      </p>
    </div>

    <v-dialog
      v-model="avatarPictureDialog"
      max-width="290"
    >
      <v-img
        class="radius rounded"
        :src="user.avatarUrl"
        :alt="`logo ${user.full_name}`"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiAccountOutline, mdiAccount, mdiPencil, mdiAccountCircle, mdiPanorama } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'

export default {
  name: 'UserHead',
  mixins: [DateHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiAccountOutline,
      mdiAccount,
      mdiPencil,
      mdiAccountCircle,
      mdiPanorama,
      avatarPictureDialog: false
    }
  },

  methods: {
    itsMe () {
      return (this.$auth.loggedIn && this.$auth.user.uuid === this.user.uuid)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-header-banner {
  height: 300px;
  border-radius: 15px;
  max-height: 100%;
  .change-user-banner {
    float: right;
    margin-right: 5px;
    margin-top: 5px;
  }
  .user-header-banner-action {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.user-header-title {
  padding: 0 0.5em 1em 1em;
  bottom: 0;
  .user-header-avatar-area {
    margin-right: 10px;
    margin-top: -50px;
    position: relative;
    .user-header-avatar {
      border-width: 6px;
      border-style: solid;
    }
    .user-header-avatar-action {
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
  }
  h1 {
    .v-avatar {
      vertical-align: middle;
    }
  }
}
.theme--light {
  .user-header-title .user-header-avatar-area .user-header-avatar {
    border-color: rgb(240, 240, 245);
    background-color: rgb(225, 225, 225);
  }
}
.theme--dark {
  .user-header-title .user-header-avatar-area .user-header-avatar {
    border-color: rgb(18, 18, 18);
    background-color: rgb(30, 30, 30);
  }
}

@media only screen and (max-width: 600px) {
  .user-header-banner {
    height: 150px;
  }
}
</style>
