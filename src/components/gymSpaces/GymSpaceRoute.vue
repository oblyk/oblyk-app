<template>
  <gym-space-selector
    :gym-id="gymSpace.gym.id"
  />
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
