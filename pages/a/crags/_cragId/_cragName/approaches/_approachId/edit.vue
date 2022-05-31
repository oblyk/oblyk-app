<template>
  <v-container v-if="approach">
    <v-row justify="center">
      <v-col class="approach-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
        </h2>
        <client-only>
          <approach-from
            :crag="approach.Crag"
            :approach="approach"
            submit-methode="put"
          />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ApproachConcern } from '~/concerns/ApproachConcern'
const ApproachFrom = () => import('~/components/approaches/forms/ApproachForm')

export default {
  components: { ApproachFrom },
  mixins: [ApproachConcern],
  middleware: ['auth'],

  head () {
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
