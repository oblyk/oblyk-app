<template>
  <div>
    <v-img
      dark
      class="user-header-banner"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="user.croppedBannerUrl"
      :srcset="`${user.croppedBannerUrl} 500w, ${user.bannerUrl} 600w`"
      :lazy-src="user.thumbnailBannerUrl"
    >
      <div class="user-header-title">
        <v-avatar
          size="80"
          class="float-left mr-3"
          @click="avatarPictureDialog = true"
        >
          <v-img
            :src="user.avatarUrl"
            :alt="`logo ${user.full_name}`"
          />
        </v-avatar>
        <h1 class="font-weight-medium loved-by-king">
          {{ user.full_name }}
          <subscribe-btn
            v-if="!itsMe()"
            subscribe-type="User"
            :subscribe-id="user.id"
            unfollowed-icon="mdi-account-outline"
            followed-icon="mdi-account"
            followed-color="green"
            :large="true"
          />
        </h1>
        <span>
          <span v-if="user.genre">
            {{ $t(`models.genres.${user.genre}`) }},
          </span>
          <span v-if="user.age">
            {{ user.age }} ans
          </span>

          <small
            v-if="!itsMe()"
            class="ml-2"
          >
            {{ $t('date.lastActivity', { date: dateFromNow(user.last_activity_at) }) }}
          </small>

          <v-btn
            v-if="itsMe()"
            small
            icon
            class="ml-2"
            :title="$t('actions.editMyProfile')"
            :to="`${user.currentUserPath}/settings/general`"
          >
            <v-icon
              small
            >
              mdi-pencil
            </v-icon>
          </v-btn>

          <v-btn
            v-if="itsMe()"
            small
            icon
            class="ml-2"
            :title="$t('actions.changeAvatar')"
            :to="`${user.currentUserPath}/settings/avatar`"
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
            :to="`${user.currentUserPath}/settings/banner`"
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

    <v-dialog
      v-model="avatarPictureDialog"
      max-width="290"
    >
      <v-card>
        <v-card-text
          class="pa-0"
        >
          <v-img
            class="radius rounded-lg"
            :src="user.avatarUrl"
            :alt="`logo ${user.full_name}`"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'UserHead',
  components: { SubscribeBtn },
  mixins: [SessionConcern, DateHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      avatarPictureDialog: false
    }
  },

  methods: {
    itsMe () {
      return (this.loggedInUser.uuid === this.user.uuid)
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
