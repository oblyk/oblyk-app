<template>
  <div>
    <div class="d-flex align-center">
      <v-card
        :to="mode === 'link' ? '/community/search' : null"
        class="rounded-pill rounded-focus community-gradient-search-box"
        :class="shortCutButons && $auth.loggedIn ? '--with-short-cuts-btn' : ''"
        @click="openDialog"
      >
        <div class="d-flex justify-center align-center" style="height: 45px;">
          <svg style="width: 100%; height: 100%;">
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #007b8b;" />
                <stop offset="100%" style="stop-color: #23e6ff;" />
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
          <div class="pl-3">
            <v-icon
              color="#007b8b"
              class="vertical-align-sub"
            >
              {{ oblykPartner }}
            </v-icon>
          </div>
          <div class="text--disabled community-search-placeholder pl-3">
            <p class="text-truncate mb-0">
              {{ $t('components.community.search') }}
            </p>
          </div>
        </div>
      </v-card>
      <div
        v-if="shortCutButons && $auth.loggedIn"
        class="community-search-icons"
      >
        <v-btn
          :to="`/notifications?back_to=${$route.fullPath}`"
          class="ml-1"
          icon
        >
          <v-icon color="#007b8b">
            {{ mdiBell }}
          </v-icon>
        </v-btn>
        <v-btn
          :to="`/home/messenger?back_to=${$route.fullPath}`"
          class="ml-1"
          icon
        >
          <v-icon color="#007b8b">
            {{ mdiSend }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <v-card>
        <v-card-title class="d-flex">
          <div>
            {{ $t('components.community.search') }}
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
        <community-search-overview
          v-if="mode === 'dialog'"
          ref="communitySearchOverview"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiSend, mdiBell, mdiClose } from '@mdi/js'
import { oblykPartner } from '~/assets/oblyk-icons'
const CommunitySearchOverview = () => import('~/components/community/CommunitySearchOverview')

export default {
  name: 'CommunityGlobalSearch',
  components: { CommunitySearchOverview },

  props: {
    mode: {
      type: String,
      default: 'link'
    },
    shortCutButons: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      dialog: false,

      oblykPartner,
      mdiClose,
      mdiSend,
      mdiBell
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
          this.$refs.communitySearchOverview.giveFocus()
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss">
.community-gradient-search-box {
  //border: solid 2px transparent !important;
  //border-radius: 30px !important;
  &.--with-short-cuts-btn {
    max-width: calc(100% - 85px);
    min-width: calc(100% - 85px);
  }
  &:not(.--with-short-cuts-btn) {
    max-width: 100%;
    min-width: 100%;
  }
  .community-search-icons {
    white-space: nowrap;
    min-width: 85px;
  }
  .community-search-placeholder {
    max-width: calc(100% - 50px);
  }
}
</style>
