<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
      <spinner v-if="loadingSubscribes" />

      <v-container v-if="!loadingSubscribes">
        <div
          v-for="(subscribe, index) in subscribes"
          :key="`subscribe-${index}`"
        >
          <guide-book-paper-small-card
            class="mb-2"
            :guide-book-paper="recordObject(subscribe.followable_object)"
          />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'

export default {
  name: 'CurrentUserGuideBooksView',
  components: { GuideBookPaperSmallCard, UserTabs, Spinner },
  mixins: [CurrentUserConcern],

  data () {
    return {
      loadingSubscribes: true,
      subscribes: []
    }
  },

  mounted () {
    this.getSubscribes()
  },

  methods: {
    getSubscribes: function () {
      this.loadingSubscribes = true
      CurrentUserApi
        .library()
        .then(resp => {
          this.subscribes = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingSubscribes = false
        })
    },

    recordObject: function (data) {
      return new GuideBookPaper(data)
    }
  }
}
</script>
