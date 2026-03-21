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
      <v-list-item-subtitle class="font-weight-medium mb-1">
        {{ infos() }}
      </v-list-item-subtitle>
      <v-list-item-subtitle
        v-if="description"
        class="text-wrap"
        @click="onDescriptionClick"
      >
        {{ description }}
        <small
          v-if="!showMore && descriptionIsTooLong"
          class="font-weight-medium hoverable blue--text text--darken-1"
        >
          {{ $t('actions.readMore') }}
        </small>
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

  data () {
    return {
      showMore: false
    }
  },

  computed: {
    descriptionIsTooLong () {
      return this.guideBookPdf.description.length > 80
    },

    description () {
      let description = this.guideBookPdf.description
      if (this.descriptionIsTooLong && !this.showMore) {
        description = this.guideBookPdf.description.substring(0, 80).split(' ')
        description.pop()
        description = description.join(' ')
        description = `${description}...`
      }
      return description
    }
  },

  methods: {
    infos () {
      const infos = []
      if (this.guideBookPdf.author) { infos.push(this.guideBookPdf.author) }
      if (this.guideBookPdf.publication_year) { infos.push(this.guideBookPdf.publication_year) }
      return infos.join(', ')
    },

    onDescriptionClick (event) {
      if (this.descriptionIsTooLong && this.showMore === false) {
        event.preventDefault()
        this.showMore = true
        return false
      }
    }
  }
}
</script>
