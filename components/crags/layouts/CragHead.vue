<template>
  <div class="crag-header">
    <v-img
      dark
      height="400px"
      :lazy-src="crag.thumbnailCoverUrl"
      :src="croppedSrc"
      :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
      class="crag-header-banner"
    >
      <div class="crag-header-title">
        <h1 class="font-weight-medium mb-n1">
          {{ crag.name }}
          <client-only>
            <v-btn
              v-if="isLoggedIn"
              :to="`${crag.path}/edit`"
              small
              icon
              :title="$t('actions.edit')"
              class="ml-1"
            >
              <v-icon small>
                {{ mdiPencil }}
              </v-icon>
            </v-btn>
          </client-only>
        </h1>

        <!-- Localisation part -->
        <div class="mb-2">
          <v-icon
            small
            class="mr-1 mb-1"
          >
            {{ mdiMapMarkerRadiusOutline }}
          </v-icon>
          <span>
            {{ crag.city }}, {{ crag.region }} ({{ crag.country }})
            <client-only>
              <crag-super-admin-action
                v-if="isSuperAdmin"
                :crag="crag"
              />
            </client-only>
          </span>
        </div>
        <div>
          <client-only>
            <climbing-style-crag-chips
              :crag="crag"
            />
            <subscribe-btn
              :subscribe-id="crag.id"
              :incrementable="true"
              subscribe-type="Crag"
            />
            <share-btn
              :title="crag.name"
              :content="`${appPath}${crag.path}`"
            />
          </client-only>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { mdiPencil, mdiMapMarkerRadiusOutline } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import ClimbingStyleCragChips from '~/components/crags/ClimbingStyleCragChips'
import ShareBtn from '~/components/ui/ShareBtn.vue'
const SubscribeBtn = () => import('@/components/forms/SubscribeBtn')
const CragSuperAdminAction = () => import('@/components/crags/forms/CragSuperAdminAction')

export default {
  name: 'CragHead',
  components: { ShareBtn, ClimbingStyleCragChips, CragSuperAdminAction, SubscribeBtn },
  mixins: [SessionConcern],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      croppedSrc: this.crag.croppedCoverUrl,
      largeSrc: this.crag.coverUrl,
      appPath: process.env.VUE_APP_OBLYK_APP_URL,

      mdiPencil,
      mdiMapMarkerRadiusOutline
    }
  },

  mounted () {
    this.$root.$on('updateCragBannerSrc', (src) => {
      this.updateCragBannerSrc(src)
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragBannerSrc')
  },

  methods: {
    updateCragBannerSrc (src) {
      this.croppedSrc = src
      this.largeSrc = src
    }
  }
}
</script>
<style lang="scss" scoped>
.crag-header {
  .crag-header-banner {
    border-radius: 15px 15px 0 0;
  }
  .crag-header-title {
    position: absolute;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    bottom: 20px;
    left: 20px;
    h1 {
      font-size: 1.7em;
      margin: 0;
    }
  }
}
@media screen and (max-width: 767px) {
  .crag-header {
    .crag-header-title {
      width: 100%;
      border-radius: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
