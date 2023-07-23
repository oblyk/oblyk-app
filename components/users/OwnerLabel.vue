<template>
  <div class="caption">
    {{ $t('common.by') }}
    <nuxt-link class="owner-label-link text-decoration-none" :to="user.userPath" v-text="owner.full_name" />
    {{ $t('common.at') }} {{ humanizeDate(history.created_at) }}

    <client-only>
      <v-menu v-if="$auth.loggedIn">
        <template #activator="{ on, attrs }">
          <v-btn
            class="vertical-align-sub"
            left
            small
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small>
              {{ mdiDotsVertical }}
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-if="editPath && $auth.user.uuid === user.uuid"
            :to="editPath"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiPencil }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ $t('actions.edit') }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="deleteFunction && $auth.user.uuid === user.uuid"
            @click="deleteFunction()"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiDelete }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ $t('actions.delete') }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="reports"
            :to="`/reports/${reports.type}/${reports.id}/new?redirect_to=${$route.fullPath}`"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiFlag }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ $t('actions.reportProblem') }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </client-only>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete, mdiFlag, mdiDotsVertical } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import User from '@/models/User'

export default {
  name: 'OwnerLabel',
  mixins: [DateHelpers],

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
      user: new User({ attributes: this.owner }),

      mdiPencil,
      mdiDelete,
      mdiFlag,
      mdiDotsVertical
    }
  }
}
</script>
