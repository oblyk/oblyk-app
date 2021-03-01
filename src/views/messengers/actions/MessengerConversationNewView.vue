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
import ConversationForm from '@/components/messengers/forms/ConversationForm'

export default {
  name: 'MessengerConversationNewView',
  components: { ConversationForm }
}
</script>
