<template>
  <v-row>
    <v-col
      class="col-12"
      v-bind:class="user.partner_search ? 'col-md-6' : ''"
    >
      <v-row>
        <v-col class="pt-0">
          <user-bio :user="user" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0">
          <user-contribution :user="user" />
        </v-col>
      </v-row>
    </v-col>
    <v-col
      class="col-12 col-md-6"
      v-if="user.partner_search"
    >
      <user-partner-map :user="user" />
    </v-col>
  </v-row>
</template>

<script>
import UserBio from '@/components/users/UserBio'
import UserContribution from '@/components/users/UserContribution'
import UserPartnerMap from '@/components/users/UserPatnerMap'

export default {
  name: 'UserProfileView',
  components: { UserPartnerMap, UserContribution, UserBio },
  props: {
    user: Object
  }
}
</script>
