<template>
  <div>
    <v-img
      dark
      class="user-header-banner"
      gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
      :lazy-src="imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(user.attachments.banner, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(user.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
    >
      <div
        v-if="itsMe"
        class="user-header-banner-action"
      >
        <v-btn
          small
          icon
          class="update-banner-btn"
          :to="`${user.currentUserPath}/settings/banner`"
          :title="$t('actions.changeBanner')"
        >
          <v-icon small>
            {{ mdiImageEdit }}
          </v-icon>
        </v-btn>
      </div>
    </v-img>
    <div class="user-header-title d-flex">
      <div class="user-header-avatar-area">
        <v-avatar
          size="100"
          class="user-header-avatar"
          @click="avatarPictureDialog = true"
        >
          <v-img
            :lazy-src="imageVariant(user.attachments.avatar, { fit: 'crop', width: 50, height: 50 })"
            :src="imageVariant(user.attachments.avatar, { fit: 'crop', width: 1080, height: 1080 })"
            :alt="`logo ${user.full_name}`"
          />
        </v-avatar>
        <div
          v-if="itsMe"
          class="user-header-avatar-action"
        >
          <v-btn
            icon
            small
            class="update-avatar-btn"
            :title="$t('actions.changeAvatar')"
            :to="`${user.currentUserPath}/settings/avatar`"
          >
            <v-icon small color="white">
              {{ mdiImageEdit }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div>
        <h1>
          {{ user.full_name }}
        </h1>
        <div class="mt-n1">
          <small class="text--disabled">
            @{{ user.slug_name }}
          </small>
          <v-menu v-if="itsMe">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                x-small
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>
                  {{ mdiDotsVertical }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="`${user.userPath}`">
                <v-list-item-title>
                  {{ $t('components.user.seeMyPublicProfile') }}
                </v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item :to="`${user.currentUserPath}/settings/general`">
                <v-list-item-title>
                  {{ $t('actions.editMyProfile') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item :to="`${user.currentUserPath}/settings/avatar`">
                <v-list-item-title>
                  {{ $t('actions.changeAvatar') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item :to="`${user.currentUserPath}/settings/banner`">
                <v-list-item-title>
                  {{ $t('actions.changeBanner') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            text
            x-small
            :to="itsMe ? `${user.currentUserPath}/community/followers` : `${user.userPath}/followers`"
          >
            {{ $tc('common.followerCount', user.followers_count, { count: user.followers_count }) }}
          </v-btn>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="avatarPictureDialog"
      max-width="500"
    >
      <v-img
        class="radius rounded"
        :src="imageVariant(user.attachments.avatar, { fit: 'scale-down', width: 1080, height: 1080 })"
        :alt="`avatar ${user.full_name}`"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiImageEdit, mdiDotsVertical } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'UserHead',
  mixins: [DateHelpers, ImageVariantHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      avatarPictureDialog: false,

      mdiImageEdit,
      mdiDotsVertical
    }
  },

  computed: {
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
.update-banner-btn, .update-avatar-btn {
  background-color: black;
  border-style: solid;
  border-width: 2px;
}
.user-header-title {
  padding: 0 0.5em 0 1em;
  bottom: 0;
  .user-header-avatar-area {
    max-width: 100px;
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
    font-size: 1.60em;
    line-height: 1.1;
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
  .update-avatar-btn {
    border-color: #f0f0f5;
    color: white;
  }
  .update-banner-btn {
    border-color: white;
  }
}
.theme--dark {
  .user-header-title .user-header-avatar-area .user-header-avatar {
    border-color: rgb(18, 18, 18);
    background-color: rgb(30, 30, 30);
  }
  .update-avatar-btn {
    border-color: black;
  }
  .update-banner-btn {
    border-color: white;
  }
}

@media only screen and (max-width: 600px) {
  .user-header-banner {
    height: 150px;
  }
}
</style>
