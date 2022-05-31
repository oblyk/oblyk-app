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
        <area-map :area="area" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AreaDescription from '@/components/areas/AreaDescription'
import LinkList from '@/components/links/LinkList'
import AreaMap from '~/components/areas/AreaMap'

export default {
  components: { AreaMap, LinkList, AreaDescription },
  props: {
    area: {
      type: Object,
      required: true
    }
  }
}
</script>
