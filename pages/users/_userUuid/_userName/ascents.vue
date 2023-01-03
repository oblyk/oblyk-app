<template>
  <div class="mt-2">
    <v-tabs
      height="30"
      class="transparent-tabs"
    >
      <v-tab
        :to="`${user.userPath}/ascents/outdoor`"
      >
        Outdoor
      </v-tab>
      <v-tab
        :to="`${user.userPath}/ascents/indoor`"
      >
        Indoor
      </v-tab>
    </v-tabs>

    <nuxt-child :user="user" />
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
