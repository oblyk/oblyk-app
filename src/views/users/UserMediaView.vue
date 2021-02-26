<template>
  <div>
    <user-media-tabs :user="user" />
    <v-container>
      <router-view :user="user" />
    </v-container>
  </div>
</template>

<script>
import UserMediaTabs from '@/components/users/layouts/UserMediaTabs'
export default {
  name: 'UserMediaView',
  components: { UserMediaTabs },
  props: {
    user: Object
  }
}
</script>
