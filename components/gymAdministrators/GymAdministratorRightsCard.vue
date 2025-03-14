<template>
  <v-sheet
    class="pa-4 mt-4"
    rounded
  >
    <p class="font-weight-bold mb-1">
      {{ $t('models.gymAdministrator.rights') }}
    </p>
    <p
      v-for="(role, roleIndex) in roles"
      :key="`explain-role-index-${roleIndex}`"
      class="mb-1"
    >
      <u>
        {{ $t(`models.roles.${role}`) }}
      </u> :
      {{ $t(`models.rolesExplain.${role}`) }}
    </p>
  </v-sheet>
</template>
<script>
export default {
  name: 'GymAdministratorRightsCard',

  data () {
    return {
      roles: [
        'manage_gym',
        'manage_space',
        'manage_opening',
        'manage_team_member',
        'manage_opener',
        'manage_subscription'
      ]
    }
  }
}
</script>
