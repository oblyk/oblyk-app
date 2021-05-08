<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <link-list :linkable-id="crag.id" linkable-type="Crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LinkList from '@/components/links/LinkList'

export default {
  name: 'CragLinkView',
  components: { LinkList },
  props: {
    crag: Object
  },

  data () {
    return {
      cragLinksMetaTitle: `${this.$t('meta.generics.links')} ${this.$t('meta.crag.title', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region
      })}`,
      cragLinksMetaDescription: `${this.$t('meta.generics.links')} ${this.$t('meta.crag.description', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region,
        city: (this.crag || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.cragLinksMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragLinksMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.cragLinksMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragLinksMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path('links')}`
        }
      ]
    }
  }
}
</script>
