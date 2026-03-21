<template>
  <div>
    <spinner v-if="!currentUser" />

    <v-container
      v-else
      style="max-width: 1000px"
    >
      <user-head :user="currentUser" />

      <!-- DASH BOARD ACCESS -->
      <client-only>
        <v-row class="mt-0 mt-md-5">
          <v-col>
            <div
              class="mx-auto"
              :style="$vuetify.breakpoint.mobile ? null : 'max-width: 430px'"
            >
              <!-- FRIENDS ASCENTS -->
              <friend-ascents class="mb-6 mb-md-6" />

              <user-todo
                v-if="$vuetify.breakpoint.mobile"
                class="mb-6"
              />

              <user-fast-access
                v-if="$vuetify.breakpoint.mobile"
                class="mb-6"
              />

              <!-- PUBLICATION -->
              <div v-intersect="loadPublications">
                <publication-list
                  v-if="showPublication"
                  :publishable="currentUser"
                  publishable-type="CurrentUser"
                />
              </div>
            </div>
          </v-col>

          <!-- RIGHT SIDE BAR, ONLY ON DESKTOP -->
          <v-col
            cols="5"
            class="d-none d-md-block"
          >
            <div style="position: sticky; top: 70px;">
              <dashboard-desktop-sidebar v-if="!$vuetify.breakpoint.mobile" />
            </div>
          </v-col>
        </v-row>
      </client-only>
    </v-container>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import UserHead from '~/components/users/layouts/UserHead'
import FriendAscents from '~/components/users/FriendAscents'
import UserTodo from '~/components/users/UserTodo'
import UserFastAccess from '~/components/users/UserFastAccess'
const DashboardDesktopSidebar = () => import('~/components/users/DashboardDesktopSidebar')
const PublicationList = () => import('~/components/publications/PublicationList')

export default {
  components: {
    UserFastAccess,
    UserTodo,
    DashboardDesktopSidebar,
    FriendAscents,
    PublicationList,
    UserHead,
    Spinner
  },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      showPublication: false
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mon profil Oblyk'
      },
      en: {
        metaTitle: 'My Oblyk profile'
      }
    }
  },

  methods: {
    loadPublications (entries, observer) {
      if (entries[0].isIntersecting) {
        this.showPublication = true
      }
    }
  }
}
</script>
