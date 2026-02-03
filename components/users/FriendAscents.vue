<template>
  <div>
    <p class="mb-1">
      <small class="font-weight-medium">
        <v-icon color="primary" left small class="vertical-align-sub">
          {{ mdiCheckboxOutline }}
        </v-icon>
        {{ $t('components.friendAscents.title') }}
      </small>
    </p>
    <div
      v-if="loadingFiendsAscents"
      class="text-center"
      style="width: 55px"
    >
      <v-skeleton-loader type="avatar" class="mb-1" />
      <v-skeleton-loader type="text" />
    </div>
    <div
      v-else
      class="overflow-x-auto text-no-wrap"
    >
      <div
        v-for="(user, userIndex) in users"
        :key="`user-index-${userIndex}`"
        class="text-center d-inline-block mr-1 hoverable"
        style="width: 65px"
        @click="showClimbingSession(user)"
      >
        <div style="position: relative;">
          <v-avatar size="60">
            <v-img
              :src="imageVariant(user.attachments.avatar, { fit: 'crop', width: 100, height: 100 })"
              alt="avatar"
              size="60"
            />
          </v-avatar>
          <v-chip
            v-if="user.last_ascent"
            :color="user.last_ascent.ascent_background_color"
            :text-color="user.last_ascent.ascent_text_color"
            class="font-weight-medium"
            :class="user.last_ascent.ascent_text === null ? 'px-2' : 'px-1'"
            style="position: absolute; top: 1px; right: 0;"
            x-small
          >
            {{ user.last_ascent.ascent_text }}
          </v-chip>
          <div
            v-if="user.last_ascent && user.last_ascent.released_at_is"
            style="position: absolute; bottom: 0; width: 100%"
            class="text-center"
          >
            <v-chip
              color="blue darken-1"
              x-small
              class="white--text font-weight-medium px-1"
            >
              {{ $t(`components.friendAscents.releasedAtIs.${user.last_ascent.released_at_is}`) }}
            </v-chip>
          </div>
        </div>
        <small class="font-weight-medium text-truncate d-block">
          {{ user.first_name }}
        </small>
      </div>
      <div
        v-if="!noMoreDataToLoad"
        v-intersect="onBottomPage"
        class="d-inline-block mr-1"
      >
        <div
          class="text-center"
          style="width: 55px"
        >
          <v-skeleton-loader type="avatar" class="mb-1" />
          <v-skeleton-loader type="text" />
        </div>
      </div>
    </div>

    <v-card
      v-if="!loadingFiendsAscents && users.length === 0"
      class="text-center"
    >
      <div class="inset-box-shadow pa-4 text--disabled">
        <small>
          <nuxt-link to="/community/search">{{ $t('components.friendAscents.followYourMates') }}</nuxt-link>
          {{ $t('components.friendAscents.forSeeTheirLastAscents') }}
        </small>
      </div>
    </v-card>

    <!-- CLIMBING SESSION MODAL -->
    <v-dialog
      v-model="friendAscentDialog"
      max-width="500"
    >
      <v-card
        v-if="modalUser"
        style="position: relative"
      >
        <v-img
          height="200"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          style="position: sticky; top: 0; z-index: 2"
          :src="imageVariant(modalUser.attachments.banner, { fit: 'crop', width: 720, height: 720 })"
        >
          <v-card-title class="d-flex">
            <div>
              <v-avatar
                v-if="modalUser.attachments.avatar.attached"
                size="40"
                class="mr-2"
              >
                <v-img
                  :src="imageVariant(modalUser.attachments.avatar, { fit: 'crop', width: 100, height: 100 })"
                  alt="avatar"
                  size="40"
                />
              </v-avatar>
              {{ modalTitle }}
            </div>
            <v-btn
              icon
              dark
              class="ml-auto"
              @click="closeModal"
            >
              <v-icon>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-card-title>
        </v-img>
        <v-card-text class="pt-2">
          <climbing-session
            :key="`climbing-session-${modalUser.user_uuid}`"
            :filters="{ user_uuid: modalUser.user_uuid }"
            column-mode
            guest-mode
          />
        </v-card-text>
        <v-card-actions style="position: sticky; bottom: 0;">
          <v-btn
            v-if="prevUser"
            elevation="0"
            color="primary"
            @click="showClimbingSession(prevUser)"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            {{ prevUser.first_name }}
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="nextUser"
            elevation="0"
            color="primary"
            @click="showClimbingSession(nextUser)"
          >
            {{ nextUser.first_name }}
            <v-icon right>
              {{ mdiArrowRight }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiArrowLeft, mdiArrowRight, mdiClose, mdiCheckboxOutline } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import ClimbingSession from '~/components/climbingSessions/ClimbingSession'

export default {
  name: 'FriendAscents',
  components: { ClimbingSession },
  mixins: [ImageVariantHelpers, LoadingMoreHelpers],

  data () {
    return {
      loadingFiendsAscents: true,
      friendAscentDialog: false,
      modalTitle: '',
      modalUser: null,
      climbingSession: null,
      loadingClimbingSession: true,
      users: [],

      mdiArrowLeft,
      mdiArrowRight,
      mdiClose,
      mdiCheckboxOutline
    }
  },

  computed: {
    userIndex () {
      if (this.modalUser === null) {
        return null
      }
      for (const userIndex in this.users) {
        if (this.modalUser.user_uuid === this.users[userIndex].user_uuid) {
          return userIndex
        }
      }
      return null
    },

    prevUser () {
      if (this.userIndex === 0) {
        return null
      } else {
        return this.users[parseInt(this.userIndex) - 1]
      }
    },

    nextUser () {
      if (this.userIndex <= this.users.length - 1) {
        return this.users[parseInt(this.userIndex) + 1]
      } else {
        return null
      }
    }
  },

  mounted () {
    this.getFriendsAscents()
  },

  methods: {
    getFriendsAscents () {
      this.moreIsBeingLoaded()
      new OblykApi(this.$axios, this.$auth)
        .get('/current_users/climbing_sessions/friends_climbing_sessions', { page: this.page })
        .then((resp) => {
          for (const user of resp.data) {
            this.users.push(user)
          }
          this.successLoadingMore(resp, 10)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.finallyMoreIsLoaded()
          this.loadingFiendsAscents = false
        })
    },

    onBottomPage (entries, observer) {
      if (
        entries[0].isIntersecting &&
        !this.noMoreDataToLoad &&
        !this.loadingMoreData
      ) {
        this.getFriendsAscents()
      }
    },

    showClimbingSession (user) {
      this.modalUser = user
      this.modalTitle = [user.first_name, user.last_name].join(' ')
      this.friendAscentDialog = true
    },

    closeModal () {
      this.friendAscentDialog = false
      this.modalUser = null
    }
  }
}
</script>
