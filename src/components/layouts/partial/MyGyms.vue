<template>
  <div v-if="isLoggedIn && !load && gyms().length > 0">

    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.myGyms') }}
    </v-subheader>

    <v-list
      nav
      dense
    >
      <v-list-item
        v-for="gym in gyms()"
        :key="gym.id"
        :to="gym.url('admin')"
        link
      >
        <v-list-item-icon>
          <v-avatar
            size="28"
          >
            <img
              :src="gym.logoUrl()"
              :alt="`logo ${gym.name}`"
            >
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-title>
          {{ gym.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import UserApi from '@/services/oblyk-api/UserApi'
import User from '@/models/User'
import Gym from '@/models/Gym'

export default {
  name: 'MyGyms',
  mixins: [SessionConcern],

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
          this.user = new User(resp.data)
        }).then(() => {
          this.load = false
        })
    },

    gyms: function () {
      const gymList = []
      for (const gym of this.user.gyms) {
        gymList.push(new Gym(gym))
      }
      return gymList
    }
  }
}
</script>
