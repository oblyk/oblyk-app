<template>
  <v-container v-if="crag && approach">
    <v-row justify="center">
      <v-col class="approach-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
        </h2>
        <approach-from
          :crag="crag"
          :approach="approach"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import { ApproachConcern } from '@/concerns/ApproachConcern'
import ApproachFrom from '@/components/approaches/forms/ApproachForm'

export default {
  name: 'ApproachEditView',
  components: { ApproachFrom },
  mixins: [CragConcern, ApproachConcern],

  metaInfo () {
    return {
      title: this.$t('meta.approach.edit')
    }
  }
}
</script>

<style lang="scss" scoped>
.approach-form-width {
  max-width: 1100px;
}
</style>
