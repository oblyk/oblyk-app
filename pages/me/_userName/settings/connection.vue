<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.user.changePassword') }}
        </h2>
        <connection-form :user="user" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConnectionForm from '~/components/users/forms/ConnectionForm'

export default {
  components: { ConnectionForm },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.edit')
    }
  }
}
</script>
