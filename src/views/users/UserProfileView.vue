<template>
  <v-container>
    <v-row>
      <v-col
        class="col-12 d-flex flex-column"
        v-bind:class="user.partner_search ? 'col-md-6' : ''"
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
        class="col-12 col-md-6"
        v-if="user.partner_search && user.partner_latitude"
      >
        <user-partner-map :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserBio from '@/components/users/UserBio'
import UserContribution from '@/components/users/UserContribution'
import UserPartnerMap from '@/components/users/UserPatnerMap'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'UserProfileView',
  components: { Spinner, UserPartnerMap, UserContribution, UserBio },
  props: {
    user: Object
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
    getContribution: function () {
      this.loadingContribution = true
      UserApi
        .contribution(this.user.uuid)
        .then(resp => {
          this.contribution = resp.data
        }).finally(() => {
          this.loadingContribution = false
        })
    }
  }
}
</script>
