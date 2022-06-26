<template>
  <div>
    <v-skeleton-loader type="image, image" boilerplate />
    <v-skeleton-loader type="table-thead" :types="{ 'table-thead': 'heading@1' }" />
    <v-row class="mt-3">
      <v-col cols="12" md="4">
        <v-sheet class="pa-2">
          <v-skeleton-loader type="heading" class="mb-8" />
          <v-skeleton-loader type="paragraph, table-cell" />
          <v-skeleton-loader type="actions" />
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet class="pa-2">
          <v-skeleton-loader type="heading" class="mb-8" />
          <v-skeleton-loader type="paragraph, paragraph, paragraph" />
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet class="pa-2">
          <v-skeleton-loader type="heading" class="mb-3" />
          <v-skeleton-loader type="list-item-two-line, list-item-two-line, list-item" />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoaderHead'
}
</script>
