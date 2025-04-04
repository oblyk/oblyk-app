<template>
  <v-list-item
    :to="callback ? null : contestPath()"
    @click="callback ? callback(contest) : null"
  >
    <v-list-item-avatar
      tile
      size="60"
    >
      <v-img
        v-if="contest.attachments.banner.attached"
        :src="imageVariant(contest.attachments.banner, { fit: 'crop', width: 100, height: 100 })"
        class="rounded-sm"
      />
      <v-icon v-else>
        {{ mdiTrophy }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        :class="archived ? 'text--disabled' : ''"
      >
        <strong>{{ contest.name }}</strong> · {{ contest.gym.name }}
        <v-chip
          v-if="contest.draft"
          outlined
          color="amber"
          class="ml-1"
        >
          Brouillon
        </v-chip>
      </v-list-item-title>
      <v-list-item-subtitle
        :class="archived ? 'text--disabled' : ''"
      >
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
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'ContestItemList',
  mixins: [DateHelpers, ImageVariantHelpers],
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
    },
    callback: {
      type: Function,
      default: null
    },
    archived: {
      type: Boolean,
      default: false
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
