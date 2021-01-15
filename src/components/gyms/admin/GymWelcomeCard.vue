<template>
  <v-card class="full-height">
    <v-card-title>
      <v-avatar
        class="mr-3"
      >
        <v-img
          :src="gym.logoUrl()"
          :alt="`logo ${gym.name}`"
        />
      </v-avatar>
      {{ gym.name }}
    </v-card-title>
    <v-card-text>
      {{ $t('components.gymAdmin.welcome', { name: gym.name }) }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        :to="gym.path()"
        text
        color="primary"
      >
        <v-icon left>
          mdi-earth
        </v-icon>
        {{ $t('components.gymAdmin.publicPage') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'GymWelcomeCard',
  props: {
    gym: Object
  }
}
</script>
