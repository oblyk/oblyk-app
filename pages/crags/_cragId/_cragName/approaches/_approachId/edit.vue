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
  meta: { orphanRoute: true },
  components: { ApproachFrom },
  mixins: [ApproachConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Modifier l'approche"
      },
      en: {
        metaTitle: 'Edit approach'
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
