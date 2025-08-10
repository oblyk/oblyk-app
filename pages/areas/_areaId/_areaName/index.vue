<template>
  <div v-if="area">
    <area-head :area="area" />
    <v-row class="mt-1">
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
</template>

<script>
import AreaDescription from '@/components/areas/AreaDescription'
import LinkList from '@/components/links/LinkList'
import AreaMap from '~/components/areas/AreaMap'
import AreaHead from '~/components/areas/layouts/AreaHead'

export default {
  components: {
    AreaHead,
    AreaMap,
    LinkList,
    AreaDescription
  },
  scrollToTop: true,
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  created () {
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.area.path, page: this.$route.path })
  }
}
</script>
