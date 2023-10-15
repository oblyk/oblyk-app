<template>
  <v-list-item
    :to="contestPath()"
  >
    <v-list-item-avatar
      tile
      size="60"
    >
      <v-img
        v-if="contest.banner"
        :src="contest.thumbnailBannerUrl"
        class="rounded-sm"
      />
      <v-icon v-else>
        {{ mdiTrophy }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <strong>{{ contest.name }}</strong> · {{ contest.gym.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ contest.contest_participants_count || 0 }} participant·es |
        <span v-if="contest.finished">
          Terminé le {{ humanizeDate(contest.end_date) }}
        </span>
        <span v-if="contest.coming">
          Commence le {{ humanizeDate(contest.start_date) }}
        </span>
        <span v-if="contest.ongoing">
          En cours
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mdiTrophy } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'ContestItemList',
  mixins: [DateHelpers],
  props: {
    contest: {
      type: Object,
      required: true
    },
    publicPath: {
      type: Boolean,
      default: true
    },
    withToken: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      mdiTrophy
    }
  },

  methods: {
    contestPath () {
      const path = this.publicPath ? this.contest.path : this.contest.adminPath
      const token = this.withToken ? `?token=${this.withToken}` : ''
      return `${path}${token}`
    }
  }
}
</script>
