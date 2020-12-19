<template>
  <v-menu
    bottom
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        class="align-self-center mr-4"
        v-bind="attrs"
        v-on="on"
      >
        Actions
        <v-icon right>
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item link :to="gym.editUrl()">
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Modifier les infos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-image-album</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Changer le logo</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-image-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Changer le bandeau</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'GymActionMenu',
  props: {
    gym: Object
  }
}
</script>
