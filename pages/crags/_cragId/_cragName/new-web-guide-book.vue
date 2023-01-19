<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addWebGuideBook') }}
        </h2>
        <guide-book-web-form
          submit-methode="post"
          :crag-id="$route.params.cragId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GuideBookWebForm from '~/components/guideBookWebs/forms/GuideBookWebForm'

export default {
  meta: { orphanRoute: true },
  components: { GuideBookWebForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un topo web'
      },
      en: {
        metaTitle: 'Add web guide'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
