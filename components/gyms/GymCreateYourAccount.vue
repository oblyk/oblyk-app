<template>
  <div class="pa-4 border rounded-sm mt-2 mb-7 text-center missing-background">
    <p class="font-weight-bold">
      {{ $t('components.gymRoute.createCount') }}
    </p>
    <div class="text-center mt-2">
      <v-btn
        elevation="0"
        color="primary"
        :to="`/sign-up?redirect_to=${$route.fullPath}`"
      >
        {{ $t('actions.createMyAccount') }}
      </v-btn>
      <div class="mt-1">
        <v-btn
          small
          elevation="0"
          link
          :to="`/sign-in?redirect_to=${$route.fullPath}`"
        >
          {{ $t('actions.signIn') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GymCreateYourAccount'
}
</script>
