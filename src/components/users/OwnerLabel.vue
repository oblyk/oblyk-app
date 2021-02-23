<template>
  <div class="caption">
    {{ $t('common.by') }}
    <router-link class="owner-label-link" :to="user.userPath()" v-text="owner.name" />
    {{ $t('common.at') }} {{ humanizeDate(history.created_at) }}

    <!-- Edit btn -->
    <v-btn
      v-if="editPath && isLoggedIn && loggedInUser.id === user.id"
      :to="editPath"
      :title="$t('actions.edit')"
      icon
      small
    >
      <v-icon x-small>mdi-pencil</v-icon>
    </v-btn>

    <!-- Delete btn -->
    <v-btn
      v-if="deleteFunction && isLoggedIn && loggedInUser.id === user.id"
      @click="deleteFunction()"
      :title="$t('actions.delete')"
      icon
      small
    >
      <v-icon x-small>mdi-delete</v-icon>
    </v-btn>

    <!-- Report btn -->
    <v-btn
      v-if="reports && isLoggedIn"
      :to="`/reports/${reports.type}/${reports.id}/new?redirect_to=${$route.fullPath}`"
      :title="$t('actions.reportProblem')"
      icon
      small
    >
      <v-icon x-small>mdi-flag</v-icon>
    </v-btn>
  </div>
</template>

<script>
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
    owner: Object,
    history: Object,

    editPath: {
      type: String,
      required: false
    },
    deleteFunction: {
      type: Function,
      required: false
    },
    reports: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      user: new User(this.owner)
    }
  }
}
</script>

<style lang="scss" scoped>
.owner-label-link {
  text-decoration: none;
}
</style>
