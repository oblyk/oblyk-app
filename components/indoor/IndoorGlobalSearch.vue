<template>
  <div>
    <v-card
      :to="mode === 'link' ? '/indoor/search' : null"
      class="rounded-pill rounded-focus"
      @click="openDialog"
    >
      <div class="full-width d-flex justify-center align-center" style="height: 45px;">
        <svg style="width: 100%; height: 100%;">
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#743ad5;" />
              <stop offset="100%" style="stop-color:#d53a9d;" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="calc(100% - 3px)"
            height="42"
            fill="none"
            stroke="url(#borderGradient)"
            stroke-width="2"
            rx="22"
          />
        </svg>
      </div>
      <div class="d-flex align-center" style="margin-top: -45px; height: 45px">
        <div class="pl-4">
          <v-icon
            color="#743ad5"
            class="vertical-align-sub"
          >
            {{ oblykIndoor }}
          </v-icon>
        </div>
        <div class="flex-grow-1 text--disabled pl-3">
          {{ $t('components.gym.searchGym') }} ...
        </div>
      </div>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <v-card>
        <v-card-title class="d-flex">
          <div>
            {{ $t('components.gym.searchGym') }}
          </div>
          <v-btn
            icon
            class="ml-auto"
            @click="dialog = false"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <indoor-search-overview
          v-if="mode === 'dialog'"
          ref="indoorSearchOverview"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { oblykIndoor } from '~/assets/oblyk-icons'
const IndoorSearchOverview = () => import('~/components/indoor/IndoorSearchOverview')

export default {
  name: 'IndoorGlobalSearch',
  components: { IndoorSearchOverview },

  props: {
    mode: {
      type: String,
      default: 'link'
    }
  },

  data () {
    return {
      dialog: false,

      oblykIndoor,
      mdiClose
    }
  },

  watch: {
    '$route' () {
      this.dialog = false
    }
  },

  methods: {
    openDialog () {
      if (this.mode === 'link') {
        return false
      } else {
        this.dialog = true
        setTimeout(() => {
          this.$refs.indoorSearchOverview.giveFocus()
        }, 500)
      }
    }
  }
}
</script>
