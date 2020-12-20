<template>
  <div v-if="isLoggedIn && !load && gyms().length > 0">
    <v-divider></v-divider>

    <v-list
      nav
      dense
    >
      <v-list-group
        prepend-icon="mdi-map"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('components.layout.appDrawer.myGyms') }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="gym in gyms()"
          :key="gym.id"
          :to="gym.url()"
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
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
import { Sessionable } from '@/concerns/Sessionable'
import UserApi from '@/services/oblyk-api/user'
import UserModel from '@/models/UserModel'
import GymModel from '@/models/GymModel'

export default {
  name: 'MyGyms',
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
    },

    gyms: function () {
      const gymList = []
      for (const gym of this.user.gyms) {
        gymList.push(new GymModel(gym))
      }
      return gymList
    }
  }
}
</script>
