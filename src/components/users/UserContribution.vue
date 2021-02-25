<template>
  <v-card>
    <v-card-title>
      <v-icon left>
        mdi-book-plus-multiple
      </v-icon>
      {{ $t('components.user.oblykContribution') }}
    </v-card-title>
    <v-card-text>
      <p>contribution</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserContribution',
  props: {
    user: Object
  }
}
</script>
