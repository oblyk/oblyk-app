<template>
  <div>
    <v-container class="area-container">
      <div v-if="$fetchState.pending">
        <skeleton-loader-head />
      </div>
      <div v-else>
        <div class="rounded">
          <area-head :area="area" />
          <area-tabs :area="area" />
        </div>
        <div>
          <v-row>
            <v-col class="col-12 col-md-6 col-lg-7">
              <area-description :area="area" />
            </v-col>
            <v-col class="col-12 col-md-6 col-lg-5 pt-0">
              <link-list :linkable-id="area.id" linkable-type="Area" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <area-map :area="area" />
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { AreaConcern } from '~/concerns/AreaConcern'
import AreaDescription from '@/components/areas/AreaDescription'
import LinkList from '@/components/links/LinkList'
import AreaMap from '~/components/areas/AreaMap'
import AppFooter from '~/components/layouts/AppFooter'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'
import AreaTabs from '~/components/areas/layouts/AreaTabs'
import AreaHead from '~/components/areas/layouts/AreaHead'

export default {
  components: {
    AreaHead,
    AreaTabs,
    SkeletonLoaderHead,
    AppFooter,
    AreaMap,
    LinkList,
    AreaDescription
  },
  mixins: [AreaConcern]
}
</script>
