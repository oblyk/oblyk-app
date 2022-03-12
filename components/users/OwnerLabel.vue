<template>
  <div class="caption">
    {{ $t('common.by') }}
    <nuxt-link class="owner-label-link" :to="user.userPath" v-text="owner.full_name" />
    {{ $t('common.at') }} {{ humanizeDate(history.created_at) }}

    <client-only>
      <!-- Edit btn -->
      <v-btn
        v-if="editPath && isLoggedIn && loggedInUser.uuid === user.uuid"
        :to="editPath"
        :title="$t('actions.edit')"
        icon
        small
      >
        <v-icon x-small>
          {{ mdiPencil }}
        </v-icon>
      </v-btn>

      <!-- Delete btn -->
      <v-btn
        v-if="deleteFunction && isLoggedIn && loggedInUser.uuid === user.uuid"
        :title="$t('actions.delete')"
        icon
        small
        @click="deleteFunction()"
      >
        <v-icon x-small>
          {{ mdiDelete }}
        </v-icon>
      </v-btn>

      <!-- Report btn -->
      <v-btn
        v-if="reports && isLoggedIn"
        :to="`/a/reports/${reports.type}/${reports.id}/new?redirect_to=${$route.fullPath}`"
        :title="$t('actions.reportProblem')"
        icon
        small
      >
        <v-icon x-small>
          {{ mdiFlag }}
        </v-icon>
      </v-btn>
    </client-only>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete, mdiFlag } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { SessionConcern } from '@/concerns/SessionConcern'
import User from '@/models/User'

export default {
  name: 'OwnerLabel',
  mixins: [
    DateHelpers,
    SessionConcern
  ],

  props: {
    owner: {
      type: Object,
      required: true
    },
    history: {
      type: Object,
      required: true
    },
    editPath: {
      type: String,
      default: null
    },
    deleteFunction: {
      type: Function,
      default: null
    },
    reports: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiPencil,
      mdiDelete,
      mdiFlag,
      user: new User({ attributes: this.owner })
    }
  }
}
</script>

<style lang="scss" scoped>
.owner-label-link {
  text-decoration: none;
}
</style>
