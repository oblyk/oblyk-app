<template>
  <v-container>
    <publication-list
      v-if="gym"
      :publishable="gym"
      publishable-type="Gym"
    />
  </v-container>
</template>
<script>
import PublicationList from '~/components/publications/PublicationList'

export default {
  components: { PublicationList },
  scrollToTop: true,
  props: {
    gym: {
      type: Object,
      required: true
    }
  }
}
</script>
