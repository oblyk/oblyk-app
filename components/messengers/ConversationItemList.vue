<template>
  <v-list-item
    :to="`/home/messenger/${conversation.id}`"
    @click="showConversation()"
  >
    <v-list-item-avatar
      v-for="(src, index) in userAvatarSources()"
      :key="`avatar-${index}`"
      :size="userAvatarSources().length > 1 ? 40 : 48"
      :class="index > 0 ? 'more-than-one-avatar' : ''"
    >
      <v-img :src="src" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title
        :class="newMessage ? 'new-message' : ''"
      >
        {{ conversationTitle }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <strong>
          {{ lastMessageUser() }}
        </strong>
        {{ conversation.last_message.body }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text>
        {{ lastMessageAt() }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import User from '@/models/User'
import { SessionConcern } from '@/concerns/SessionConcern'
import { DateHelpers } from '@/mixins/DateHelpers'
import ConversationApi from '~/services/oblyk-api/ConversationApi'

export default {
  name: 'ConversationItemList',
  mixins: [SessionConcern, DateHelpers],
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      newMessage: true
    }
  },

  computed: {
    conversationTitle () {
      const title = []
      for (const user of (this.conversation || {}).conversation_users || []) {
        if (this.loggedInUser.uuid !== user.uuid) {
          title.push(user.first_name)
        }
      }
      return title.join(', ')
    }
  },

  mounted () {
    this.haveNewMessage()
  },

  methods: {
    user () {
      return new User({ attributes: this.conversation.conversation_users[0] })
    },

    userAvatarSources () {
      const avatarSources = []
      for (const conversationUser of this.conversation.conversation_users) {
        const user = new User({ attributes: conversationUser })
        if (user.uuid !== this.loggedInUser.uuid) { avatarSources.push(user.thumbnailAvatarUrl) }
        if (avatarSources.length === 2) { break }
      }
      return avatarSources
    },

    lastMessageAt () {
      if (this.conversation.last_message.posted_at) {
        return this.humanizeDateDuration(this.conversation.last_message.posted_at)
      } else {
        return ''
      }
    },

    lastMessageUser () {
      if (this.conversation.last_message.user_uuid) {
        if (this.conversation.last_message.user_uuid === this.loggedInUser.uuid) {
          return `${this.$t('common.me')} :`
        } else if (this.conversation.conversation_users.length > 2) {
          return `${this.conversation.last_message.user_name} :`
        } else {
          return ''
        }
      }
    },

    haveNewMessage () {
      for (const conversationUser of this.conversation.conversation_users) {
        if (conversationUser.uuid === this.loggedInUser.uuid) {
          if (conversationUser.last_read_at === null) {
            this.newMessage = true
            return
          }
          this.newMessage = this.dateIsAfterDate(conversationUser.last_read_at, this.conversation.last_message_at)
          return
        }
      }
      this.newMessage = false
    },

    showConversation () {
      this.$root.$emit('showMessengerMessageList')
      new ConversationApi(this.$axios, this.$auth)
        .read(this.conversation.id)
        .then(() => {
          this.newMessage = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.more-than-one-avatar {
  margin-left: -45px;
  margin-right: 12px;
}
.new-message {
  font-weight: bold;
  color: #01579b;
}
</style>
