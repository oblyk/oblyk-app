<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? crag.path : null"
    >
      <v-list-item
        :three-line="!small"
        :two-line="small"
      >
        <v-list-item-avatar
          :size="small ? 45 : 70"
          :class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar
            color="grey"
            :size="small ? 45 : 70"
            tile
          >
            <v-img :src="crag.thumbnailCoverUrl" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content :class="small ? 'pt-0 pb-0' : ''">
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ crag.name }}
            </span>
            <subscribe-btn subscribe-type="Crag" :subscribe-id="crag.id" :large="false" />
          </v-list-item-title>
          <v-list-item-subtitle :class="small ? 'mb-2' : 'mt-n3 mb-4'">
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
            >
              {{ $t('components.crag.type') }}
            </v-alert>
            {{ crag.country }}, {{ crag.city }}
            <client-only>
              <cite v-if="IAmGeolocated"> - {{ $t('common.is') }} {{ distance }} km</cite>
            </client-only>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import { LocalizationHelpers } from '@/mixins/LocalizationHelpers'

export default {
  name: 'CragSmallCard',
  components: { SubscribeBtn },
  mixins: [LocalizationHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    },

    distance () {
      if (!this.IAmGeolocated) { return false }

      return this.geoDistance(
        this.$store.state.geolocation.latitude,
        this.$store.state.geolocation.longitude,
        this.crag.latitude,
        this.crag.longitude
      )
    }
  }
}
</script>
