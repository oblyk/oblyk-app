<template>
  <div>
    <user-head :user="user" />
    <v-row class="mt-0">
      <v-col
        class="col-12 d-flex flex-column"
        :class="user.partner_search ? 'col-md-6' : ''"
      >
        <!-- User bio -->
        <user-bio :user="user" />

        <!-- User contribution -->
        <div class="mt-4">
          <v-skeleton-loader v-if="loadingContribution" type="article" />
          <user-contribution
            v-else
            :user="user"
            :contribution="contribution"
          />
        </div>
      </v-col>

      <!-- User partner search -->
      <v-col
        v-if="user.partner_search"
        class="col-12 col-md-6 pt-0 pb-0"
      >
        <climber-localities :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserBio from '~/components/users/UserBio'
import UserContribution from '~/components/users/UserContribution'
import UserApi from '~/services/oblyk-api/UserApi'
import ClimberLocalities from '~/components/users/ClimberLocalities'
import UserHead from '~/components/users/layouts/UserHead'

export default {
  name: 'UserProfileView',
  components: {
    UserHead,
    ClimberLocalities,
    UserContribution,
    UserBio
  },
  scrollToTop: true,
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingContribution: true,
      contribution: null
    }
  },

  created () {
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.user.userPath, page: this.$route.path })
  },

  mounted () {
    this.getContribution()
  },

  methods: {
    getContribution () {
      this.loadingContribution = true
      new UserApi(this.$axios, this.$auth)
        .contribution(this.user.uuid)
        .then((resp) => {
          this.contribution = resp.data
        }).finally(() => {
          this.loadingContribution = false
        })
    }
  }
}
</script>
