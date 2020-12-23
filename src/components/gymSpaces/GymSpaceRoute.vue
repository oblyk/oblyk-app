<template>
  <div>
    <gym-space-selector
      :gym-id="gymSpace.gym.id"
    />

    <p class="gym-space-description" >
      {{ gymSpace.description }}
    </p>
    <div class="text-right">
      <v-btn
        small
        :to="gymSpace.url('upload-plan')"
      >
        <v-icon left>
          mdi-map
        </v-icon>
        {{ $t('actions.changePlan') }}
      </v-btn>
      <v-btn
        small
        class="ml-2"
        :to="gymSpace.url('edit')"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        {{ $t('actions.edit') }}
      </v-btn>
    </div>
  </div>
</template>
<script>
import GymSpaceSelector from '@/components/gymSpaces/GymSpaceSelector'
export default {
  name: 'GymSpaceRoute',
  components: { GymSpaceSelector },
  props: {
    gymSpace: Object
  }
}
</script>
<style lang="scss" scoped>
.gym-space-description {
  margin-top: -1.2em;
}
</style>
