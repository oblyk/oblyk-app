<template>
    <v-list-item three-line>
      <v-list-item-avatar
        rounded="0"
        size="60"
      >
        <v-img
          :src="guideBookPdf.coverUrl()"
          contain
          max-width="60px"
          max-height="60px"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold mt-n1">
          <span class="vertical-align-middle">
            {{ guideBookPdf.name }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle class="mb-3 mt-0">
          <a
            class="link-to-pdf-file"
            :href="guideBookPdf.url"
          >
            <v-icon left small class="mb-1" color="red darken-1">
              mdi-file-pdf
            </v-icon>
            {{ $t('models.guideBookPdf.pdf_file') }}
          </a> |
          <span class="span-comma">
            <span v-if="guideBookPdf.author">{{ guideBookPdf.author }}</span>
            <span v-if="guideBookPdf.editor">{{ guideBookPdf.editor }}</span>
            <span v-if="guideBookPdf.publication_year">{{ guideBookPdf.publication_year }}</span>
          </span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="mt-n3 mb-4">
          {{ guideBookPdf.description }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
  name: 'GuideBookPdfFeedCard',
  props: {
    guideBookPdf: Object
  }
}
</script>

<style lang="scss" scoped>
.link-to-pdf-file {
  color: #e53935;
  text-decoration: none;
}
</style>
