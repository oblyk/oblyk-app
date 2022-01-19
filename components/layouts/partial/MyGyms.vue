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
        :to="gym.adminPath"
        link
      >
        <v-list-item-icon>
          <v-avatar
            size="28"
          >
            <img
              :src="gym.logoUrl"
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
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
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

  watch: {
    isLoggedIn () {
      if (this.isLoggedIn) { this.getCurrentUser() }
    }
  },

  created () {
    if (this.isLoggedIn) { this.getCurrentUser() }
  },

  methods: {
    getCurrentUser () {
      new CurrentUserApi(this.$axios, this.$auth)
        .current()
        .then((resp) => {
          this.user = new User({ attributes: resp.data })
        }).then(() => {
          this.load = false
        })
    },

    gyms () {
      const gymList = []
      for (const gym of this.user.administered_gyms) {
        gymList.push(new Gym({ attributes: gym }))
      }
      return gymList
    }
  }
}
</script>
