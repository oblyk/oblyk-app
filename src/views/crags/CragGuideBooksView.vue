<template>
  <v-container>
    Les topos

    <v-btn
      text
      color="primary"
      :to="crag.path('add-on-guide-book')"
    >
      ajouter à un topo
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: 'CragGuideBooksView',

  props: {
    crag: Object
  }
}
</script>
