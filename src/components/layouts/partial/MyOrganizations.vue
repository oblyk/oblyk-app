<template>
  <div v-if="isLoggedIn && !load && organizations.length > 0">

    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.myOrganizations') }}
    </v-subheader>

    <v-list
      nav
      dense
    >
      <v-list-item
        v-for="(organization, index) in organizations"
        :key="`my-organization-${index}`"
        :to="organization.path()"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-code-brackets</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ organization.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import User from '@/models/User'
import Organization from '@/models/Organization'

export default {
  name: 'MyOrganizations',
  mixins: [SessionConcern],

  data () {
    return {
      user: null,
      load: true,
      organizations: []
    }
  },

  created () {
    if (this.isLoggedIn) this.getOrganizations()
  },

  mounted () {
    this.$root.$on('reloadMyOrganizations', () => {
      this.getOrganizations()
    })
  },

  beforeDestroy () {
    this.$root.$off('reloadMyOrganizations')
  },

  watch: {
    isLoggedIn: function () {
      if (this.isLoggedIn) this.getOrganizations()
    }
  },

  methods: {
    getOrganizations: function () {
      this.organizations = []
      CurrentUserApi
        .current()
        .then(resp => {
          console.log(resp.data)
          this.user = new User(resp.data)
          for (const organization of this.user.organizations) {
            this.organizations.push(new Organization(organization))
          }
        }).then(() => {
          this.load = false
        })
    }
  }
}
</script>
