<template>
  <v-container>
    <v-row>
      <v-col>
        <search-filed />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SearchFiled from '@/components/Search'

export default {
  name: 'SearchView',
  components: { SearchFiled }
}
</script>
