<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          {{ mdiPlus }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        :to="`/a/alerts/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiBellPlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('actions.addAlert') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiPlus, mdiBellPlus } from '@mdi/js'

export default {
  name: 'CragSuperAdminAction',
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPlus,
      mdiBellPlus
    }
  }
}
</script>
