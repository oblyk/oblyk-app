<template>
  <div>
    <v-list-item tow-line>
      <v-list-item-avatar
        size="50"
      >
        <v-avatar
          size="50"
          tile
        >
          <v-img
            v-if="crag.photo.attachments.picture.attached"
            :src="imageVariant(crag.photo.attachments.picture, { fit: 'crop', height: 100, width: 100 })"
          />
          <v-icon
            v-else
            class="px-1 mt-n1"
          >
            {{ mdiTerrain }}
          </v-icon>
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
import { mdiTerrain } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'CragFeedCard',
  components: { SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain
    }
  }
}
</script>
