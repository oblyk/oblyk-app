<template>
  <v-btn
    color="red lighten-2"
    outlined
    dark
    to="/delete-account"
  >
    {{ $t('components.user.deleteMyAccount') }}
  </v-btn>
</template>

<script>
export default {
  name: 'DeleteUserForm',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
