<template>
  <v-list-item
    :class="bordered ? 'border rounded' : null"
    :href="guideBookPdf.pdf_url"
    target="_blank"
  >
    <v-list-item-avatar
      rounded="0"
      size="55"
    >
      <v-img
        src="/svg/pdf-guide-book-default.svg"
        contain
        max-width="55px"
        max-height="55px"
      />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold">
        {{ guideBookPdf.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ infos() }}
      </v-list-item-subtitle>
      <v-list-item-subtitle class="text-wrap">
        {{ guideBookPdf.description }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'GuideBookPdfListItem',
  props: {
    guideBookPdf: {
      type: Object,
      required: true
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    infos () {
      const infos = []
      if (this.guideBookPdf.author) { infos.push(this.guideBookPdf.author) }
      if (this.guideBookPdf.publication_year) { infos.push(this.guideBookPdf.publication_year) }
      return infos.join(', ')
    }
  }
}
</script>
