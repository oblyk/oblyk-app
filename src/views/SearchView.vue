<template>
  <v-container class="search-form-width">
    <v-row>
      <v-col>
        <search-filed />
        <close-form class="close-search-form" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SearchFiled from '@/components/Search'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'SearchView',
  components: { CloseForm, SearchFiled },

  mounted () {
    this.$root.$emit(
      'setAppTitle',
      {
        title: this.$t('components.search.title')
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.search-form-width {
  max-width: 700px;
}
@media only screen and (max-width: 600px) {
  .search-form-width {
    margin-top: 0;
  }
  .close-search-form {
    display: none;
  }
}
</style>
