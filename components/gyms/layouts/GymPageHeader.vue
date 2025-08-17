<template>
  <page-header
    :title="gym.name"
    :back-to="backTo || '/indoor'"
    :links="headerLinks"
    :fluid-container="fluid"
  >
    <template #title>
      <h1 class="text-h6 font-weight-black text-no-wrap">
        <subscribe-btn
          :subscribe-id="gym.id"
          subscribe-type="Gym"
          :large="false"
          small
          :icon-size="20"
          class="vertical-align-sub"
        />
        {{ gym.name }}
      </h1>
    </template>
  </page-header>
</template>
<script>
import { mdiShield, mdiSourceBranch, mdiTrophy } from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import PageHeader from '~/components/layouts/PageHeader'
import SubscribeBtn from '~/components/forms/SubscribeBtn'

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

  computed: {
    headerLinks () {
      const links = []
      links.push({
        to: this.gym.path,
        title: this.$t('components.gym.tabs.info')
      })

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
      return this.$route.path.search(`${this.gym.path}/spaces`) === 0
    },

    backTo () {
      return this.$store.getters['oblykEnvironment/getPreviousHubs'](this.$route.path, this.gym.path)
    }
  }
}

</script>
