<template>
  <div v-if="isLoggedIn && organizations.length > 0">
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
        :to="organization.path"
        link
      >
        <v-list-item-icon>
          <v-icon>
            {{ mdiCodeBrackets }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ organization.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mdiCodeBrackets } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import Organization from '@/models/Organization'

export default {
  name: 'MyOrganizations',
  mixins: [SessionConcern],

  data () {
    return {
      mdiCodeBrackets
    }
  },

  computed: {
    organizations () {
      const organizations = []
      for (const organization of this.myOrganizations) {
        organizations.push(new Organization({ attributes: organization }))
      }
      return organizations
    }
  }
}
</script>
