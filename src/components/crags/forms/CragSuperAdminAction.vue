<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        :to="`/alerts/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
      >
        <v-list-item-icon>
          <v-icon>mdi-bell-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('actions.addAlert') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'CragSuperAdminAction',
  props: {
    crag: Object
  }
}
</script>
