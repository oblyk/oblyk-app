<template>
  <v-container v-if="crag">
    <v-row justify="center">
      <v-col class="approach-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addApproach') }}
        </h2>
        <client-only>
          <approach-from
            :crag="crag"
            submit-methode="post"
          />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CragConcern } from '@/concerns/CragConcern'
const ApproachFrom = () => import('@/components/approaches/forms/ApproachForm')

export default {
  name: 'ApproachNewView',
  components: { ApproachFrom },
  mixins: [CragConcern],

  head () {
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
