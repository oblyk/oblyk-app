<template>
  <div>
    <v-list-item three-line>
      <v-list-item-avatar
        rounded="0"
        size="70"
      >
        <v-img
          :src="guideBookPaper.thumbnailCoverUrl"
          contain
          max-width="70px"
          max-height="70px"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          <span class="vertical-align-middle">
            {{ guideBookPaper.name }}
          </span>
          <subscribe-btn
            subscribe-type="GuideBookPaper"
            :subscribe-id="guideBookPaper.id"
            :large="false"
            followed-color="deep-purple"
            :followed-icon="mdiBookshelf"
            :unfollowed-icon="mdiBookshelf"
            subscribe-label="actions.addToLibrary"
            unsubscribe-label="actions.removeFromLibrary"
          />
        </v-list-item-title>
        <v-list-item-subtitle class="mt-n3 mb-4 text-truncate">
          <v-alert
            dense
            text
            class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
          >
            {{ $t('components.guideBookPaper.type') }}
          </v-alert>
          {{ guideBookPaper.author }}, {{ guideBookPaper.editor }}, {{ guideBookPaper.publication_year }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { mdiBookshelf } from '@mdi/js'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GuideBookPaperFeedCard',
  components: { SubscribeBtn },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiBookshelf
    }
  }
}
</script>
