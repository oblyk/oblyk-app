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
  meta: { orphanRoute: true },
  components: { ApproachFrom },
  mixins: [CragConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer une approche'
      },
      en: {
        metaTitle: 'Create approach'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>

<style lang="scss" scoped>
.approach-form-width {
  max-width: 1100px;
}
</style>
