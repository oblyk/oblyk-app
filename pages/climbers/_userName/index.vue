<template>
  <v-row class="mt-5">
    <v-col
      class="col-12 d-flex flex-column"
      :class="user.partner_search ? 'col-md-6' : ''"
    >
      <!-- User bio -->
      <v-row>
        <v-col class="pt-0">
          <user-bio :user="user" />
        </v-col>
      </v-row>

      <!-- User contribution -->
      <v-row>
        <v-col class="pb-0">
          <spinner v-if="loadingContribution" :full-height="false" />
          <user-contribution
            v-if="!loadingContribution"
            :user="user"
            :contribution="contribution"
          />
        </v-col>
      </v-row>
    </v-col>

    <!-- User partner search -->
    <v-col
      v-if="user.partner_search"
      class="col-12 col-md-6 pt-0 pb-0"
    >
      <climber-localities :user="user" />
    </v-col>
  </v-row>
</template>

<script>
import UserBio from '~/components/users/UserBio.vue'
import UserContribution from '~/components/users/UserContribution.vue'
import UserApi from '~/services/oblyk-api/UserApi'
import Spinner from '~/components/layouts/Spiner.vue'
import ClimberLocalities from '~/components/users/ClimberLocalities.vue'

export default {
  name: 'UserProfileView',
  components: {
    ClimberLocalities,
    Spinner,
    UserContribution,
    UserBio
  },
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
