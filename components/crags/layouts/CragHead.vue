<template>
  <div class="crag-header">
    <v-img
      dark
      height="400px"
      :src="croppedSrc"
      :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
      class="crag-header-banner"
    >
      <template #placeholder>
        <div class="crag-header-banner-spinner">
          <v-progress-circular
            indeterminate
            :color="$vuetify.theme.dark ? 'white' : 'blue-grey'"
          />
        </div>
      </template>
      <v-btn
        class="seeOnMapBtn"
        text
        small
        outlined
        :to="`/maps/crags?lat=${crag.latitude}&lng=${crag.longitude}&zoom=16&crag_id=${crag.id}`"
      >
        {{ $t('actions.seeOnTheMap') }}
      </v-btn>
      <div class="crag-header-title">
        <h1 class="font-weight-medium mb-n1">
          {{ crag.name }}
          <client-only>
            <subscribe-btn
              class="vertical-align-text-bottom"
              :subscribe-id="crag.id"
              :incrementable="true"
              subscribe-type="Crag"
              :type-text="true"
              :large="false"
              :outlined="true"
            />
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
          </span>
        </div>
        <div>
          <client-only>
            <share-btn
              :title="crag.name"
              :url="crag.path"
              :icon="false"
            />
            <v-menu
              v-if="$auth.loggedIn"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  text
                  outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    {{ mdiDotsVertical }}
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  :to="`${crag.path}/edit`"
                >
                  <v-list-item-icon>
                    <v-icon>{{ mdiPencil }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.edit') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="isSuperAdmin"
                  :to="`/alerts/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
                >
                  <v-list-item-icon>
                    <v-icon>{{ mdiBellPlus }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.addAlert') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </client-only>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { mdiDotsVertical, mdiMapMarkerRadiusOutline, mdiBellPlus, mdiPencil } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import ShareBtn from '~/components/ui/ShareBtn.vue'
const SubscribeBtn = () => import('@/components/forms/SubscribeBtn')

export default {
  name: 'CragHead',
  components: { ShareBtn, SubscribeBtn },
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

      mdiDotsVertical,
      mdiMapMarkerRadiusOutline,
      mdiBellPlus,
      mdiPencil
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
  .seeOnMapBtn {
    position: absolute;
    right: 7px;
    top: 7px;
    background-color: rgba(255, 255, 255, 0.2)
  }
  .crag-header-banner {
    border-radius: 15px 15px 0 0;
    .crag-header-banner-spinner {
      position: absolute;
      top: 10px;
      right: 10px;
    }
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
