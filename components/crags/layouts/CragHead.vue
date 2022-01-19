<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="src"
    >
      <div class="crag-header-title">
        <h1 class="font-weight-medium loved-by-king">
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
                  mdi-pencil
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
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragSuperAdminAction from '@/components/crags/forms/CragSuperAdminAction'

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
      src: this.crag.coverUrl
    }
  },

  watch: {
    crag () {
      this.src = this.crag.coverUrl
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
      this.src = src
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
