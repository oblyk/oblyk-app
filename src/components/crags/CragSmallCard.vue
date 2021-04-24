<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? crag.path() : null"
    >
      <v-list-item
        :three-line="!small"
        :two-line="small"
      >
        <v-list-item-avatar
          :size="small ? 45 : 70"
          v-bind:class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar
            color="grey"
            :size="small ? 45 : 70"
            tile
          >
            <v-img :src="crag.thumbnailCoverUrl()" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content v-bind:class="small ? 'pt-0 pb-0' : ''">
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ crag.name }}
            </span>
            <subscribe-btn subscribe-type="Crag" :subscribe-id="crag.id" :large="false" />
          </v-list-item-title>
          <v-list-item-subtitle v-bind:class="small ? 'mt-n1 mb-3' : 'mt-n3 mb-4'">
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
    </v-card>
  </div>
</template>

<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'CragSmallCard',
  components: { SubscribeBtn },
  props: {
    crag: Object,
    linkable: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
