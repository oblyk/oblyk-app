<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :lazy-src="crag.thumbnailCoverUrl"
      :src="croppedSrc"
      :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
    >
      <div class="crag-header-title">
        <h1 class="font-weight-medium">
          {{ crag.name }}
          <client-only>
            <subscribe-btn
              :subscribe-id="crag.id"
              :incrementable="true"
              subscribe-type="Crag"
            />
          </client-only>
        </h1>
        <div>
          <span>
            {{ crag.country }}, {{ crag.region }}, {{ crag.city }}
            <client-only>
              <v-btn
                v-if="isLoggedIn"
                :to="`/a${crag.path}/edit`"
                small
                icon
                :title="$t('actions.edit')"
                class="ml-1"
              >
                <v-icon small>
                  {{ mdiPencil }}
                </v-icon>
              </v-btn>
              <crag-super-admin-action
                v-if="isSuperAdmin"
                :crag="crag"
              />
            </client-only>
          </span>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { mdiPencil } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
const SubscribeBtn = () => import('@/components/forms/SubscribeBtn')
const CragSuperAdminAction = () => import('@/components/crags/forms/CragSuperAdminAction')

export default {
  name: 'CragHead',
  components: { CragSuperAdminAction, SubscribeBtn },
  mixins: [SessionConcern],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPencil,
      croppedSrc: this.crag.croppedCoverUrl,
      largeSrc: this.crag.coverUrl
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
.crag-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
</style>
