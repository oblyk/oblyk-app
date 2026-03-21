<template>
  <v-container>
    <div v-if="user">
      <publication-list
        v-if="currentUserCanPublications()"
        :publishable="user"
        publishable-type="User"
      />
      <div
        v-else
        class="text-center mt-10 mb-10"
      >
        {{ $t('components.publication.youCannotSee', { name: user.first_name }) }}
      </div>
    </div>
  </v-container>
</template>
<script>
import { SubscribeConcern } from '~/concerns/SubscribeConcern'
import PublicationList from '~/components/publications/PublicationList'

export default {
  components: { PublicationList },
  mixins: [SubscribeConcern],
  scrollToTop: true,

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      userLinksMetaTitle: this.$t('metaTitle', { name: this.user?.first_name }),
      userLinksMetaDescription: this.$t('metaDescription', { name: this.user?.first_name })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les publications et actualités de %{name}',
        metaDescription: 'Les publications et actualités de %{name}'
      },
      en: {
        metaTitle: "%{name}'s publications and news",
        metaDescription: "%{name}'s publications and news"
      }
    }
  },

  head () {
    return {
      titleTemplate: this.userLinksMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.userLinksMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.userLinksMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.userLinksMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.user?.app_path}/publications`
        }
      ]
    }
  },

  methods: {
    currentUserCanPublications () {
      // If user have public profil
      if (this.user.public_profile) { return true }

      // If current user is subscribed to user
      return (this.$auth.loggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    }
  }
}
</script>
