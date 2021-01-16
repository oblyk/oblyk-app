<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-if="!loadingMeUser">
      <user-tabs :user="meUser" />
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
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'
import UserApi from '@/services/oblyk-api/UserApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'

export default {
  name: 'MyGuideBooksView',
  components: { GuideBookPaperSmallCard, UserTabs, Spinner },
  mixins: [MeUserConcern],

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
      UserApi
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
