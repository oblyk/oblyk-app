<template>
  <v-form @submit.prevent="submit()">
    <user-search-form
      v-model="query"
      class="mb-4"
      :callback="addUser"
      :linkable-result="false"
    >
      <div class="mt-2">
        <v-chip
          v-for="(user, index) in selectedUsers"
          :key="`user-${index}`"
          close
          class="mr-1"
          @click:close="removeUser(user)"
        >
          {{ user.first_name }}
        </v-chip>
      </div>
    </user-search-form>

    <submit-form
      v-if="selectedUsers.length > 0"
      class="absolute-bottom-submit-message"
      :go-back-btn="false"
      :overlay="submitOverlay"
      submit-local-key="actions.writeMessage"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import UserSearchForm from '@/components/users/forms/UserSearchForm'
import ConversationApi from '~/services/oblyk-api/ConversationApi'

export default {
  name: 'ConversationForm',
  components: { UserSearchForm, SubmitForm },
  mixins: [FormHelpers],

  data () {
    return {
      query: null,
      selectedUsers: []
    }
  },

  methods: {
    addUser (user) {
      this.query = null

      if (this.$auth.user.id === user.id) { return }
      for (const selectedUser of this.selectedUsers) {
        if (user.id === selectedUser.id) { return }
      }
      this.selectedUsers.push(user)
    },

    removeUser (user) {
      const users = []
      for (const selectedUser of this.selectedUsers) {
        if (selectedUser.id !== user.id) {
          users.push(selectedUser)
        }
      }
      this.selectedUsers = users
    },

    submit () {
      if (this.selectedUsers.length === 0) { return }
      this.submitOverlay = true

      const userData = {
        conversation_users_attributes: [
          {
            id: null,
            user_id: this.$auth.user.id
          }
        ]
      }

      for (const selectedUser of this.selectedUsers) {
        userData.conversation_users_attributes.push({
          id: null,
          user_id: selectedUser.id
        })
      }

      new ConversationApi(this.$axios, this.$auth)
        .create(userData)
        .then((resp) => {
          this.$router.push(`/home/messenger/${resp.data.id}`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.absolute-bottom-submit-message {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
