<template>
  <v-container>
    <guide-list :crag="crag" />
    <div class="mt-3">
      <add-guide-book-btn :crag="crag" />
    </div>
  </v-container>
</template>
<script>
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'
import GuideList from '@/components/crags/GuideList'
export default {
  name: 'CragGuideBooksView',
  components: { GuideList, AddGuideBookBtn },
  props: {
    crag: Object
  }
}
</script>
