<template>
  <photo-gallery
    v-if="user"
    gallery-type="User"
    :gallery-id="user.uuid"
  />
</template>

<script>
import PhotoGallery from '~/components/photos/PhotoGallery.vue'

export default {
  components: { PhotoGallery },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Photos de %{name}',
        metaDescription: "Voir les photos d'escalade prise par %{name} sur les différentes falaises qu'iel a parcourut"
      },
      en: {
        metaTitle: 'Photos of %{name}',
        metaDescription: 'See the climbing pictures taken by %{name} on the different cliffs he climbed'
      }
    }
  },

  head () {
    return {
      title: this.userMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.userMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.userMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.userMetaDescription },
        { hid: 'og:url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  computed: {
    userMetaTitle () {
      return this.$t('metaTitle', { name: this.user?.first_name })
    },
    userMetaDescription () {
      return this.$t('metaDescription', { name: this.user?.first_name })
    },
    userMetaUrl () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user?.path}/media/photos`
      }
      return ''
    }
  }
}
</script>
