<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <conversation-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConversationForm from '~/components/messengers/forms/ConversationForm.vue'

export default {
  components: { ConversationForm },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Nouvelle conversation'
      },
      en: {
        metaTitle: 'New conversation'
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
