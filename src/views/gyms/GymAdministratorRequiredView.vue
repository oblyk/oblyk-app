<template>
  <div>
    <v-container class="global-form-width">
      <v-row>
        <v-col>
          <p class="text-center mb-7">
            <v-icon x-large>
              mdi-lock
            </v-icon>
          </p>
          <p class="text-center">
            {{ $t('components.gym.administratorRequired') }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'GymAdministratorRequiredView',
  props: {
    gym: Object
  }
}
</script>
