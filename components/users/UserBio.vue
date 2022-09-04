<template>
  <v-card class="full-height d-flex flex-column">
    <v-card-title class="flex-grow-0">
      <v-icon left>
        {{ mdiTextAccount }}
      </v-icon>
      {{ $t('components.user.bio') }}
    </v-card-title>
    <v-card-text class="flex-grow-1">
      <!-- Bio -->
      <markdown-text
        v-if="user.description"
        :text="user.description"
      />

      <!-- Bio empty -->
      <p
        v-if="!user.description"
        class="text-center text--disabled mt-7 mb-7"
      >
        {{ $t('components.user.bioIsEmpty', { name: user.first_name} ) }}
      </p>
      <p
        v-if="user.last_activity_at"
        class="mt-2 text--disabled font-italic"
      >
        {{ $t('date.lastActivity', { date: dateFromNow(user.last_activity_at) }) }}
      </p>
    </v-card-text>
    <client-only>
      <div
        v-if="$auth.loggedIn && $auth.user.id !== user.id"
        class="flex-grow-0 text-right pa-2"
      >
        <subscribe-btn
          subscribe-type="User"
          :subscribe-id="user.id"
          :unfollowed-icon="mdiAccountOutline"
          :followed-icon="mdiAccount"
          followed-color="primary"
          :type-text="true"
          :large="true"
          text-color="primary"
          :block="isMobile"
          class="mb-2 mb-md-0"
        />
        <start-conversation-btn
          :user="user"
          :block="isMobile"
        />
      </div>
    </client-only>
  </v-card>
</template>

<script>
import { mdiTextAccount, mdiAccountOutline, mdiAccount } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import StartConversationBtn from '@/components/messengers/forms/StartConversationBtn'
import SubscribeBtn from '~/components/forms/SubscribeBtn'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'UserBio',
  components: { SubscribeBtn, StartConversationBtn, MarkdownText },
  mixins: [DateHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isMobile: false,
      mdiTextAccount,
      mdiAccountOutline,
      mdiAccount
    }
  },

  mounted () {
    this.isMobile = window.innerWidth < 600
  }
}
</script>

<style lang="scss" scoped>
.last-activity-label {
  position: absolute;
  bottom: 0;
  right: 5px;
}
</style>
