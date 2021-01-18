<template>
  <div>
    <v-container v-if="crag">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            Ajouter ce site à un topo
          </h2>
          <add-guide-book-on-crag-form :crag="crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import AddGuideBookOnCragForm from '@/components/guideBookPaperCrags/forms/AddGuideBookOnCragForm'

export default {
  name: 'AddGuideBookOnCragView',
  components: { AddGuideBookOnCragForm },
  mixins: [CragConcern]
}
</script>
