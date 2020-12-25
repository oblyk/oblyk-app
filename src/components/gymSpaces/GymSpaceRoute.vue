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

    <gym-sector-list :gym-space="gymSpace" />

    <v-btn
      class="mt-4"
      :to="gymSpace.newSectorUrl()"
    >
      <v-icon leff>
        mdi-plus
      </v-icon>
      Ajouter un secteur
    </v-btn>
  </div>
</template>
<script>
import GymSpaceSelector from '@/components/gymSpaces/GymSpaceSelector'
import GymSectorList from '@/components/gymSectors/GymSectorList'
export default {
  name: 'GymSpaceRoute',
  components: { GymSectorList, GymSpaceSelector },
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
