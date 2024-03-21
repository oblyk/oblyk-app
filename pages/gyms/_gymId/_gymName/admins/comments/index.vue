<template>
  <v-container>
    <spinner v-if="loadingComments && !gym" />
    <div v-if="!loadingComments && gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <div>
        <v-switch
          v-model="iMSubscribe"
          :loading="loadingUpdateSubscribe"
          :label="$t('models.gymAdministrator.subscribe_to_comment_feed')"
          @change="switchSubscribe"
        />
        <v-sheet
          v-for="(comment, commentIndex) in comments"
          :key="`comment-index-${commentIndex}`"
          class="rounded pa-2 mb-4"
        >
          <gym-route-list-item
            :gym-route="comment.commentable_type === 'GymRoute' ? gymRouteToObject(comment.commentable) : gymRouteToObject(comment.commentable.gym_route)"
            :click-callback="getGymRoute"
            class="mb-1 border pl-1"
          />
          <comment-card
            v-once
            :comment="comment"
            :last-read="lastReadAt()"
            moderable
          />
        </v-sheet>
        <loading-more
          :get-function="getComments"
          :no-more-data="noMoreDataToLoad"
          :loading-more="loadingMoreData"
        />
      </div>

      <!-- Popup for gym route -->
      <down-to-close-dialog
        ref="GymRouteDialog"
        v-model="gymRouteDialog"
        padding-x="px-2"
        :close-callback="closeGymRouteModal"
        wait-signal
      >
        <gym-route-info
          v-if="!loadingGymRoute && gymRoute"
          :close-callback="closeGymRouteModal"
          :gym-route="gymRoute"
          :gym="gym"
        />
      </down-to-close-dialog>
    </div>
  </v-container>
</template>

<script>
import { mdiArrowLeft, mdiDotsVertical, mdiPencil, mdiPower } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import Comment from '~/models/Comment'
import GymRoute from '~/models/GymRoute'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import Spinner from '~/components/layouts/Spiner'
import CommentCard from '~/components/comments/CommentCard'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'
import LoadingMore from '~/components/layouts/LoadingMore'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'

export default {
  components: {
    GymRouteInfo,
    DownToCloseDialog,
    LoadingMore,
    GymRouteListItem,
    CommentCard,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, GymRolesHelpers, LoadingMoreHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingComments: true,
      comments: [],
      gymRouteDialog: false,
      loadingGymRoute: true,
      gymRoute: null,
      iMSubscribe: false,
      loadingUpdateSubscribe: false,

      mdiArrowLeft,
      mdiDotsVertical,
      mdiPencil,
      mdiPower
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les commentaires'
      },
      en: {
        metaTitle: 'Comments'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.comments'),
          to: `${this.gym?.adminPath}/comments`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getComments()
    this.updateLastReadComment()
    this.iMSubscribe = this.subscribeToCommentFeed(this.$route.params.gymId)
  },

  methods: {
    getComments () {
      this.moreIsBeingLoaded()
      new GymApi(this.$axios, this.$auth)
        .comments(this.$route.params.gymId, this.page)
        .then((resp) => {
          this.comments = []
          for (const comment of resp.data) {
            this.comments.push(new Comment({ attributes: comment }))
          }
          this.successLoadingMore(resp)
        })
        .finally(() => {
          this.loadingComments = false
          this.finallyMoreIsLoaded()
        })
    },

    gymRouteToObject (route) {
      return new GymRoute({ attributes: route })
    },

    closeGymRouteModal () {
      this.gymRouteDialog = false
    },

    getGymRoute (route) {
      this.loadingGymRoute = true
      this.gymRouteDialog = true
      new GymRouteApi(this.$axios, this.$auth)
        .find(this.gym.id, route.gym_space.id, route.id)
        .then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
          this.$refs.GymRouteDialog?.signal()
        })
        .finally(() => {
          this.loadingGymRoute = false
        })
    },

    updateLastReadComment () {
      setTimeout(() => {
        new GymAdministratorApi(this.$axios, this.$auth)
          .updateFeedLastRead(this.$route.params.gymId, 'comment')
          .then(() => {
            this.$auth.fetchUser()
          })
      }, 2000)
    },

    lastReadAt () {
      const gymId = parseInt(this.$route.params.gymId)
      const administeredGym = this.$auth.user.gym_roles.find(administeredGym => administeredGym.gym_id === gymId)
      return administeredGym.last_comment_feed_read_at
    },

    switchSubscribe () {
      const gymId = parseInt(this.$route.params.gymId)
      const administeredGym = this.$auth.user.gym_roles.find(administeredGym => administeredGym.gym_id === gymId)
      this.loadingUpdateSubscribe = true
      new GymAdministratorApi(this.$axios, this.$auth)
        .update({
          gym_id: gymId,
          id: administeredGym.id,
          subscribe_to_comment_feed: this.iMSubscribe
        })
        .then(() => {
          this.$auth.fetchUser()
        })
        .finally(() => {
          this.loadingUpdateSubscribe = false
        })
    }
  }
}
</script>
