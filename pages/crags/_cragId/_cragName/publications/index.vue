<template>
  <v-container>
    <publication-list
      v-if="crag"
      :publishable="crag"
      publishable-type="Crag"
    />
  </v-container>
</template>
<script>
import PublicationList from '~/components/publications/PublicationList'

export default {
  components: { PublicationList },
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
        metaTitle: 'Les dernières informations de %{name}, escalade en %{region}',
        metaDescription: "Le panneau d'infos, retrouver les dernières actualité de %{name} : site d'escalade à %{city} en %{region}"
      },
      en: {
        metaTitle: 'The latest news from %{name}, climb in %{region}',
        metaDescription: 'The information board, find the latest news about %{name} : climbing crag in %{city} in %{region}'
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
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/publications`
        }
      ]
    }
  }
}
</script>
