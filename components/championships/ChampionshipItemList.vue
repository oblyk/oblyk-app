<template>
  <v-list-item
    :to="championshipPath()"
  >
    <v-list-item-avatar
      tile
      size="60"
    >
      <v-img
        v-if="championship.attachments.banner.attached"
        :src="imageVariant(championship.attachments.banner, { fit: 'crop', width: 100, height: 100 })"
        class="rounded-sm"
      />
      <v-icon v-else>
        {{ mdiTrophy }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title :class="archived ? 'text--disabled' : ''">
        <strong>{{ championship.name }}</strong>
      </v-list-item-title>
      <v-list-item-subtitle :class="archived ? 'text--disabled' : ''">
        {{ championship.contests_count || 0 }} contests
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mdiTrophy } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'ChampionshipItemList',
  mixins: [DateHelpers, ImageVariantHelpers],
  props: {
    championship: {
      type: Object,
      required: true
    },
    publicPath: {
      type: Boolean,
      default: true
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
    championshipPath () {
      return this.publicPath ? this.championship.path : this.championship.adminPath
    }
  }
}
</script>
