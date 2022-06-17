<template>
  <v-sheet
    class="pa-4 --bordered-card text-center"
    elevation="0"
  >
    <p>
      {{ $t('components.subscribesAscents.followYourFriends') }}
    </p>
    <v-btn
      text
      color="primary"
      :to="`${user.currentUserPath}/community/subscribes`"
    >
      {{ $t('components.subscribesAscents.addSubscribesBtn') }}
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: 'AddSubscribesCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
