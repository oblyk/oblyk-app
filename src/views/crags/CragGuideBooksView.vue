<template>
  <v-container>
    <guide-list :crag="crag" />
    <div
      v-if="isLoggedIn"
      class="mt-3"
    >
      <add-guide-book-btn :crag="crag" />
    </div>
  </v-container>
</template>

<script>
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'

import GuideList from '@/components/crags/GuideList'
import { SessionConcern } from '@/concerns/SessionConcern'
export default {
  name: 'CragGuideBooksView',
  components: { GuideList, AddGuideBookBtn },
  mixins: [SessionConcern],
  props: {
    crag: Object
  }
}
</script>
