<template>
  <v-badge
    :value="haveNewNotification"
    color="red"
    dot
    overlap
    offset-x="18"
    offset-y="18"
  >
    <v-btn
      aria-label="go to my notifications"
      icon
      :to="`/notifications?back_to=${backTo}`"
    >
      <v-icon>{{ mdiBellOutline }}</v-icon>
    </v-btn>
  </v-badge>
</template>

<script>
import { mdiBellOutline } from '@mdi/js'

export default {
  name: 'NotificationAppBar',

  data () {
    return {
      backTo: '/home',

      mdiBellOutline
    }
  },

  computed: {
    haveNewNotification () {
      return this.$store.state.notification.newNotification
    }
  },

  watch: {
    '$route' () {
      this.setBackTo()
    }
  },

  mounted () {
    this.setBackTo()
  },

  methods: {
    setBackTo () {
      this.backTo = this.$route.path
    }
  }
}
</script>
