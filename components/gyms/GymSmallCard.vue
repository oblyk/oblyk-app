<template>
  <div>
    <v-card
      :link="linkable"
      :class="bindClass"
      :to="!callback ? path : null"
      @click="callback ? callback(gym) : null"
    >
      <v-list-item
        :three-line="!small"
        :two-line="!small"
      >
        <v-list-item-avatar
          tile
          :size="small ? 45 : 70"
          :class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar
            :size="small ? 45 : 70"
            class="rounded-sm"
            tile
          >
            <v-img :src="imageVariant(gym.attachments.logo, { fit: 'crop', width: 100, height: 100 })" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content
          :class="small ? 'pt-3 pb-0' : ''"
        >
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ gym.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle :class="small ? 'mb-3' : 'mb-4'">
            <v-chip
              v-if="gym.have_guide_book"
              class="px-1 vertical-align-text-top"
              x-small
              pill
            >
              <v-icon
                x-small
                class="mr-1"
              >
                {{ mdiSourceBranch }}
              </v-icon>
              TOPO
            </v-chip>
            {{ gym.country }}, {{ gym.city }}
            <client-only>
              <cite v-if="IAmGeolocated"> - {{ $t('common.is') }} {{ distance }} km</cite>
            </client-only>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <subscribe-btn
            subscribe-type="Gym"
            :subscribe-id="gym.id"
            :large="false"
          />
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiSourceBranch } from '@mdi/js'
import { LocalizationHelpers } from '@/mixins/LocalizationHelpers'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GymSmallCard',
  components: { SubscribeBtn },
  mixins: [LocalizationHelpers, ImageVariantHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    goToSpaces: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      mdiSourceBranch
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
        this.gym.latitude,
        this.gym.longitude
      )
    },

    bindClass () {
      const classList = []
      if (this.bordered) {
        classList.push('border')
      }
      if (this.linkable) {
        classList.push('hoverable-card')
      }
      return classList.join(' ')
    },

    path () {
      if (this.linkable) {
        if (this.goToSpaces) {
          return this.gym.guideBookPath
        } else {
          return this.gym.path
        }
      } else {
        return null
      }
    }
  }
}
</script>
