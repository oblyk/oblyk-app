<template>
  <link-list
    v-if="crag"
    :linkable-id="crag.id"
    linkable-type="Crag"
  />
</template>

<script>
import LinkList from '@/components/links/LinkList'

export default {
  name: 'CragLinkView',
  components: { LinkList },
  scrollToTop: true,
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      cragLinksMetaTitle: this.$t('metaTitle', {
        name: this.crag?.name,
        region: this.crag?.region
      }),
      cragLinksMetaDescription: this.$t('metaDescription', {
        name: this.crag?.name,
        region: this.crag?.region,
        city: this.crag?.city
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les liens de %{name}, escalade en %{region}',
        metaDescription: "Les liens de %{name} : site d'escalade à %{city} en %{region}"
      },
      en: {
        metaTitle: 'Links of %{name}, climb in %{region}',
        metaDescription: 'Links of %{name} : climbing crag in %{city} in %{region}'
      }
    }
  },

  head () {
    return {
      titleTemplate: this.cragLinksMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragLinksMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragLinksMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragLinksMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/links`
        }
      ]
    }
  }
}
</script>
