<template>
  <v-container>
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
        <area-map-details-view :area="area" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AreaDescription from '@/components/areas/AreaDescription'
import LinkList from '@/components/links/LinkList'
import AreaMapDetailsView from '@/views/areas/AreaMapDetailsView'
export default {
  name: 'AreaInfoView',
  components: { AreaMapDetailsView, LinkList, AreaDescription },
  props: {
    area: Object
  }
}
</script>
