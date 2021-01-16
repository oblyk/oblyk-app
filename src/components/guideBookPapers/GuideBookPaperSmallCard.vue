<template>
  <div>
    <v-card
      link
      flat
      :to="guideBookPaper.path()"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          rounded="0"
          size="70"
        >
          <v-img
            :src="guideBookPaper.thumbnailCoverUrl()"
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
            <subscribe-btn subscribe-type="GuideBookPaper" :subscribe-id="guideBookPaper.id" :large="false" />
          </v-list-item-title>
          <v-list-item-subtitle class="mt-n3 mb-4">
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
    </v-card>
  </div>
</template>

<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GuideBookPaperSmallCard',
  components: { SubscribeBtn },
  props: {
    guideBookPaper: Object
  }
}
</script>
