<template>
  <v-container>
    <publication-list
      v-if="guideBookPaper"
      :publishable="guideBookPaper"
      publishable-type="GuideBookPaper"
    />
  </v-container>
</template>
<script>
import PublicationList from '~/components/publications/PublicationList'

export default {
  components: {
    PublicationList
  },
  scrollToTop: true,
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  }
}
</script>
