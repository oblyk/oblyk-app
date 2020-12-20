<template>
  <v-list-item class="px-2" v-if="isLoggedIn">
    <v-list-item-avatar v-if="!load">
      <v-img :src="user.avatarUrl()"/>
    </v-list-item-avatar>

    <v-list-item-content v-if="!load">
      <v-list-item-title>{{ user.full_name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { Sessionable } from '@/concerns/Sessionable'
import UserApi from '@/services/oblyk-api/user'
import UserModel from '@/models/UserModel'

export default {
  name: 'AppDrawerAvatar',
  mixins: [Sessionable],

  data () {
    return {
      user: null,
      load: true
    }
  },

  created () {
    if (this.isLoggedIn) this.getCurrentUser()
  },

  watch: {
    isLoggedIn: function () {
      if (this.isLoggedIn) this.getCurrentUser()
    }
  },

  methods: {
    getCurrentUser: function () {
      UserApi
        .current()
        .then(resp => {
          this.user = new UserModel(resp.data)
        }).then(() => {
          this.load = false
        })
    }
  }
}
</script>
