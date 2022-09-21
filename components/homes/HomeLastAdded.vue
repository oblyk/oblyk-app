<template>
  <div class="mb-15">
    <!-- Last crags -->
    <h3 class="mb-2 text-h5 font-weight-bold">
      <v-icon left>
        {{ mdiTerrain }}
      </v-icon>
      {{ $t('home.lastObjects.crags') }}
    </h3>

    <div v-if="loadingLastAdded">
      <v-skeleton-loader
        v-for="index in 3"
        :key="`crag-photo-list-${index}`"
        type="image"
        class="d-inline-block mr-4"
        height="170"
        width="250"
      />
    </div>
    <div
      v-else
      class="last-objects"
    >
      <div
        ref="cragsList"
        class="last-objects-list"
      >
        <div
          v-for="(crag, cragIndex) in lastObjects.crags"
          :key="`crag-index-${cragIndex}`"
          class="last-objects-item"
        >
          <nuxt-link :to="crag.path">
            <v-img
              class="rounded"
              :src="crag.thumbnailCoverUrl"
              height="170"
              :alt="crag.name"
            >
              <div class="last-objects-item-description">
                <p class="mb-n1 text-truncate font-weight-bold">
                  {{ crag.name }}
                </p>
                <p class="mb-0 text-truncate">
                  <small>
                    {{ crag.city }}, {{ crag.region }}
                  </small>
                </p>
              </div>
            </v-img>
          </nuxt-link>
        </div>
      </div>
      <v-btn
        class="last-objects-scroll-to-right black-btn-icon --with-border"
        icon
        @click="scrollLastObjectsList('cragsList')"
      >
        <v-icon>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </div>

    <!-- Last gyms -->
    <h3 class="mb-2 mt-10 text-h5 font-weight-bold">
      <v-icon left>
        {{ mdiOfficeBuildingMarker }}
      </v-icon>
      {{ $t('home.lastObjects.gyms') }}
    </h3>

    <div v-if="loadingLastAdded">
      <v-skeleton-loader
        v-for="index in 3"
        :key="`gym-list-${index}`"
        type="image"
        class="d-inline-block mr-4"
        height="170"
        width="250"
      />
    </div>
    <div
      v-else
      class="last-objects"
    >
      <div
        ref="gymsList"
        class="last-objects-list"
      >
        <div
          v-for="(gym, gymIndex) in lastObjects.gyms"
          :key="`gym-index-${gymIndex}`"
          class="last-objects-item"
        >
          <nuxt-link :to="gym.path">
            <v-img
              class="rounded"
              :src="gym.thumbnailBannerUrl"
              height="170"
              :alt="gym.name"
            >
              <div class="last-objects-item-description">
                <p class="mb-n1 text-truncate font-weight-bold">
                  {{ gym.name }}
                </p>
                <p class="mb-0 text-truncate">
                  <small>
                    {{ gym.city }}, {{ gym.country }}
                  </small>
                </p>
              </div>
            </v-img>
          </nuxt-link>
        </div>
      </div>
      <v-btn
        class="last-objects-scroll-to-right black-btn-icon --with-border"
        icon
        @click="scrollLastObjectsList('gymsList')"
      >
        <v-icon>
          {{ mdiArrowRight }}
        </v-icon>
      </v-btn>
    </div>

    <!-- Last crag routes -->
    <h3 class="mb-5 mt-10 text-h5 font-weight-bold">
      <v-icon left>
        {{ mdiSourceBranch }}
      </v-icon>
      {{ $t('home.lastObjects.cragRoutes') }}
    </h3>

    <v-row>
      <v-col
        v-for="(cragRoute, index) in lastObjects.cragRoutes"
        :key="`crag-route-ascent-${index}`"
        class="pa-1"
        cols="12"
        md="6"
        lg="4"
      >
        <crag-route-small-line :route="cragRoute" />
      </v-col>
    </v-row>

    <client-only>
      <crag-route-drawer />
    </client-only>
  </div>
</template>

<script>
import { mdiArrowRight, mdiTerrain, mdiOfficeBuildingMarker, mdiSourceBranch } from '@mdi/js'
import CommonApi from '~/services/oblyk-api/CommonApi'
import Crag from '~/models/Crag'
import Gym from '~/models/Gym'
import CragRoute from '~/models/CragRoute'
import CragRouteDrawer from '~/components/cragRoutes/CragRouteDrawer'
import CragRouteSmallLine from '~/components/cragRoutes/CragRouteSmallLine'

export default {
  name: 'HomeLastAdded',
  components: { CragRouteSmallLine, CragRouteDrawer },
  data () {
    return {
      loadingLastAdded: true,
      lastObjects: {
        crags: [],
        cragRoutes: [],
        gyms: []
      },

      mdiArrowRight,
      mdiTerrain,
      mdiOfficeBuildingMarker,
      mdiSourceBranch
    }
  },

  mounted () {
    this.getLastAdded()
  },

  methods: {
    getLastAdded () {
      new CommonApi(this.$axios, this.$auth)
        .lastAdded()
        .then((resp) => {
          for (const crag of resp.data.crags) {
            this.lastObjects.crags.push(new Crag({ attributes: crag }))
          }
          for (const cragRoute of resp.data.crag_routes) {
            this.lastObjects.cragRoutes.push(new CragRoute({ attributes: cragRoute }))
          }
          for (const gym of resp.data.gyms) {
            this.lastObjects.gyms.push(new Gym({ attributes: gym }))
          }
        })
        .finally(() => {
          this.loadingLastAdded = false
        })
    },

    scrollLastObjectsList (listRef) {
      const scrollOffset = this.$refs[listRef].offsetWidth > 520 ? 520 : 260
      this.$refs[listRef].scrollTo({
        left: this.$refs[listRef].scrollLeft + scrollOffset,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.last-objects {
  position: relative;
  .last-objects-list {
    position: relative;
    white-space: nowrap;
    overflow-x: auto;
  }
  .last-objects-item {
    position: relative;
    vertical-align: top;
    display: inline-block;
    width: 250px;
    margin-right: 10px;
    .last-objects-item-description {
      padding: 5px 10px;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      bottom: 0;
      width: 100%;
      color: white;
      text-decoration: none;
    }
  }
  .last-objects-scroll-to-right {
    position: absolute;
    right: -15px;
    top: 64px
  }
}

@media screen and (max-width: 960px) {
  .last-objects .last-objects-scroll-to-right {
    right: -8px;
  }
}
</style>
