<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-info :crag="crag" />
        </v-col>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-comment :crag="crag" />
        </v-col>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-guides-card :crag="crag" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <crag-routes :crag="crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CragInfo from '@/components/crags/CragDescription'
import CragRoutes from '@/components/cragRoutes/CragRoutes'
import CragGuidesCard from '@/components/crags/CragGuidesCard'
import CragComment from '@/components/crags/CragComment'

export default {
  name: 'CragInfoView',
  components: { CragComment, CragGuidesCard, CragRoutes, CragInfo },
  props: {
    crag: Object
  }
}
</script>
