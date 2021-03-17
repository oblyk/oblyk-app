<template>
  <div>
    <v-list-item tow-line>
      <v-list-item-avatar
        size="50"
      >
        <v-avatar
          color="grey"
          size="50"
          tile
        >
          <v-img :src="crag.thumbnailCoverUrl()" />
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content
        class="pt-0 pb-0"
      >
        <v-list-item-title class="font-weight-bold">
          <span class="vertical-align-middle">
            {{ crag.name }}
          </span>
          <subscribe-btn subscribe-type="Crag" :subscribe-id="crag.id" :large="false" />
        </v-list-item-title>
        <v-list-item-subtitle class="mt-n1 mb-4">
          <v-alert
            dense
            text
            class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
          >
            {{ $t('components.crag.type') }}
          </v-alert>
          {{ crag.country }}, {{ crag.city }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'CragFeedCard',
  components: { SubscribeBtn },
  props: {
    crag: Object
  }
}
</script>
