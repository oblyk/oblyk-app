<template>
  <page-header
    :title="gym.name"
    :back-to="backTo || '/indoor'"
    :links="headerLinks"
    :fluid-container="fluid"
    :refresh-key="unreadPublicationCount"
  >
    <template #title>
      <h1 class="text-h6 font-weight-black text-no-wrap">
        <subscribe-btn
          :subscribe-id="gym.id"
          subscribe-type="Gym"
          :large="false"
          small
          :icon-size="20"
          :incrementable="true"
          class="vertical-align-sub"
        />
        {{ gym.name }}
      </h1>
    </template>
  </page-header>
</template>
<script>
import { mdiShield, mdiSourceBranch, mdiTrophy, mdiInformationOutline } from '@mdi/js'
import { oblykArdoise } from '~/assets/oblyk-icons'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import PageHeader from '~/components/layouts/PageHeader'
import SubscribeBtn from '~/components/forms/SubscribeBtn'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'GymPageHeader',
  components: { SubscribeBtn, PageHeader },
  mixins: [GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      URLBackTo: null,
      unreadPublicationCount: 0
    }
  },

  computed: {
    headerLinks () {
      const links = [
        {
          to: this.gym.path,
          title: null,
          icon: mdiInformationOutline
        },
        {
          to: `${this.gym.path}/publications`,
          title: null,
          badge: this.unreadPublicationCount,
          icon: oblykArdoise
        }
      ]

      if (this.gym.optimal_spaces_path) {
        links.push({
          to: `${this.gym.path}${this.gym.optimal_spaces_path}`,
          title: this.$t('components.gym.tabs.guideBook'),
          exactPath: false,
          icon: mdiSourceBranch
        })
      }

      if (this.$auth.loggedIn && this.currentUserIsGymAdmin()) {
        links.push({
          to: this.gym.adminPath,
          title: this.$t('components.gym.tabs.admin'),
          icon: mdiShield
        })
      }

      if (this.$auth.loggedIn && this.gym.display_ranking) {
        links.push({
          to: `${this.gym.path}/ranking`,
          title: this.$t('components.gymRanking.rank'),
          icon: mdiTrophy
        })
      }

      links.push({
        to: `${this.gym.path}/followers`,
        title: this.$tc('common.followerCount', this.gym.follow_count, { count: this.gym.follow_count })
      })
      return links
    },

    fluid () {
      return this.$route.path.search(`${this.gym.path}/spaces`) === 0 || this.$route.path.search(`${this.gym.path}/admins`) === 0
    },

    backTo () {
      const likeHubPath = this.$route.path.search(`${this.gym.path}/spaces`) === 0 || this.$route.path.search(`${this.gym.path}/admins`) === 0
      return this.URLBackTo || this.$store.getters['oblykEnvironment/getPreviousHubs'](this.$route.path, this.gym.path, likeHubPath)
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.URLBackTo = urlParams.get('back_to')
    if (this.URLBackTo) {
      const url = new URL(window.location.href)
      url.searchParams.delete('back_to')
      window.history.replaceState({}, '', url.toString())
    }
    if (this.$auth.loggedIn) {
      this.getUnreadPublication()
    }
  },

  methods: {
    getUnreadPublication () {
      new OblykApi(this.$axios, this.$auth)
        .get('/publication_views/unread_count', { publishable_type: 'Gym', publishable_id: this.gym.id })
        .then((resp) => {
          this.unreadPublicationCount = resp.data
        })
    }
  }
}

</script>
