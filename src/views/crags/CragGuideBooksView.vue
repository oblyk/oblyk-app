<template>
  <v-container>
    Les topos
    <add-guide-book-btn :crag="crag" />
  </v-container>
</template>
<script>
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'
export default {
  name: 'CragGuideBooksView',
  components: { AddGuideBookBtn },
  props: {
    crag: Object
  }
}
</script>
