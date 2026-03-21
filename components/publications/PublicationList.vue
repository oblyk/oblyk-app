<template>
  <div style="max-width: 100%; width: 430px">
    <!-- DRAFTS -->
    <div
      v-if="drafts.length > 0"
      class="mb-4"
    >
      <p class="mb-2 font-weight-bold">
        <v-icon
          left
          color="amber darken-1"
        >
          {{ mdiPen }}
        </v-icon>
        {{ $tc('components.publication.draftInProgress', drafts.length, { count: drafts.length }) }}
      </p>
      <publication-card
        v-for="(publication, publicationIndex) in drafts"
        :key="`publication-draft-index-${publicationIndex}`"
        :publication="publication"
        class="mb-3"
        :delete-callback="resteDrafts"
      />
    </div>

    <!-- PUBLICATION TITLE -->
    <div class="mb-3 d-flex">
      <p
        v-if="publishableType === 'CurrentUser'"
        class="mb-n2"
      >
        <small class="font-weight-medium">
          <v-icon color="primary" left small class="vertical-align-sub">
            {{ boardIcon[publishableType] }}
          </v-icon>
          {{ $t(`components.publication.CurrentUser.title`) }}
        </small>
      </p>
      <h3
        v-else
        class="text-truncate"
      >
        <v-icon
          left
          size="24"
          color="primary"
          class="vertical-align-top"
        >
          {{ boardIcon[publishableType] }}
        </v-icon>
        {{ $t(`components.publication.${publishableType}.title`) }}
      </h3>
      <div
        v-if="unreadCount > 0"
        class="ml-auto pr-1"
      >
        <v-badge dot overlap color="red">
          <v-chip
            small
            color="blue"
            outlined
          >
            {{ $tc('common.new', unreadCount, { count: unreadCount }) }}
          </v-chip>
        </v-badge>
      </div>
    </div>

    <!-- BTN FOR WRITE A NEW PUBLICATIONS -->
    <client-only>
      <v-card
        v-if="canWrite"
        class="pa-2 mb-4"
        :to="newPublicationUrl"
      >
        <v-text-field
          :label="$t(`components.publication.${publishableType}.writeLabel`, { name: publishable.name})"
          hide-details
          outlined
          rounded
          :append-icon="mdiPenPlus"
        />
      </v-card>
    </client-only>

    <!-- PUBLICATION LIST -->
    <div>
      <publication-card
        v-for="(publication, publicationIndex) in publications"
        :key="`publication-index-${publicationIndex}`"
        :publication="publication"
        class="mb-3"
        :delete-callback="restePublication"
      />
      <loading-more
        :get-function="getPublications"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-three-line"
      />
      <v-sheet
        v-if="publications.length === 0 && !loadingPublications"
        class="text-center text--disabled font-italic pa-4 rounded"
      >
        <p class="mb-0">
          {{ $t(`components.publication.${publishableType}.noPublication`, { name: publishableName }) }}
        </p>
      </v-sheet>
    </div>
  </div>
</template>
<script>
import { mdiPenPlus, mdiPen } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import { oblykArdoise, oblykOutdoorPanel } from '~/assets/oblyk-icons'
import PublicationCard from '~/components/publications/PublicationCard'
import LoadingMore from '~/components/layouts/LoadingMore'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'PublicationList',
  components: { LoadingMore, PublicationCard },
  mixins: [LoadingMoreHelpers],
  props: {
    publishable: {
      type: Object,
      required: true
    },
    publishableType: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      loadingPublications: true,
      loadingDrafts: true,
      publications: [],
      drafts: [],
      unreadCount: 0,
      boardIcon: {
        Gym: oblykArdoise,
        Crag: oblykOutdoorPanel,
        GuideBookPaper: oblykOutdoorPanel,
        User: oblykOutdoorPanel,
        CurrentUser: oblykOutdoorPanel
      },

      mdiPenPlus,
      mdiPen
    }
  },

  computed: {
    myFeed () {
      return this.publishableType === 'CurrentUser'
    },
    canWrite () {
      if (!this.$auth.loggedIn) {
        return false
      }
      if (['Crag', 'GuideBookPaper'].includes(this.publishableType)) {
        return true
      }
      if (this.publishableType === 'CurrentUser') {
        return true
      }
      if (this.publishableType === 'Gym') {
        return this.$auth.user.administered_gyms.map(gym => gym.id).includes(this.publishable.id)
      }
      return false
    },

    publishableName () {
      if (['User', 'CurrentUser'].includes(this.publishableType)) {
        return this.publishable.first_name
      } else {
        return this.publishable.name
      }
    },

    newPublicationUrl () {
      if (this.publishableType === 'CurrentUser') {
        return '/home/publications/new'
      } else {
        return `${this.publishable.app_path}/publications/new`
      }
    }
  },

  mounted () {
    this.getPublications()
    this.getDrafts()
    this.getUnreadCount()
  },

  methods: {
    restePublication () {
      this.loadingPublications = true
      this.publications = []
      this.resetLoadMorePageNumber()
      this.getPublications()
    },

    resteDrafts () {
      this.loadingDrafts = true
      this.drafts = []
      this.getDrafts()
    },

    getPublications () {
      this.moreIsBeingLoaded()
      const promise = new OblykApi(this.$axios, this.$auth)
      const params = { page: this.page, per_page: 5 }
      const methode = this.myFeed
        ? promise.get('/publications/my_publication_feed', params)
        : promise.get(
          '/publications',
          { ...params, publishable_type: this.publishableType, publishable_id: this.publishable.id }
        )

      methode.then((resp) => {
        for (const publication of resp.data) {
          this.publications.push(publication)
        }
        this.successLoadingMore(resp, 5)
      }).catch((err) => {
        this.$root.$emit('alertFromApiError', err, 'publication')
        this.failureToLoadingMore()
      }).finally(() => {
        this.loadingPublications = false
        this.finallyMoreIsLoaded()
      })
    },

    getDrafts () {
      if (this.publishableType === 'User') {
        this.loadingDrafts = false
        return false
      }

      this.loadingDrafts = true
      new OblykApi(this.$axios, this.$auth)
        .get(
          '/publications/drafts',
          {
            publishable_type: this.publishableType,
            publishable_id: this.publishable.id
          }
        )
        .then((resp) => {
          this.drafts = resp.data
          this.loadingDrafts = false
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'publication')
        })
        .finally(() => {
          this.loadingDrafts = false
        })
    },

    getUnreadCount () {
      const promise = new OblykApi(this.$axios, this.$auth)
      const methode = this.myFeed
        ? promise.get('/publication_views/my_unread_count')
        : promise.get(
          '/publication_views/unread_count',
          { publishable_type: this.publishableType, publishable_id: this.publishable.id }
        )

      methode.then((resp) => { this.unreadCount = resp.data })
    }
  }
}
</script>
