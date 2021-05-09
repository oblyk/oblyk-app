<template>
  <v-container v-if="crag">
    <v-row justify="center">
      <v-col class="approach-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addApproach') }}
        </h2>
        <approach-from
          :crag="crag"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import ApproachFrom from '@/components/approaches/forms/ApproachForm'

export default {
  name: 'ApproachNewView',
  components: { ApproachFrom },
  mixins: [CragConcern],

  metaInfo () {
    return {
      title: this.$t('meta.approach.new')
    }
  }
}
</script>

<style lang="scss" scoped>
.approach-form-width {
  max-width: 1100px;
}
</style>
