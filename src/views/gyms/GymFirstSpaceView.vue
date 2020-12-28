<template>
  <div>
    <v-container class="global-form-width">
      <v-row>
        <v-col>
          <p class="text-center mb-7">
            <v-icon x-large>
              mdi-map-legend
            </v-icon>
          </p>
          <p class="heading text-center">
            {{ $t('components.gym.firstSpaceExplain') }}
          </p>
          <p class="text-center mt-10">
            <v-btn
              color="primary"
            >
              {{ $t('components.gym.createFirstSpace') }}
            </v-btn>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'GymFirstSpaceView'
}
</script>
