<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h3 class="mb-3">
          {{ $t('actions.writeMessage') }}
        </h3>
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
  middleware: ['auth'],

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
