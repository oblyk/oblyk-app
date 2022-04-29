<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- Edit gym space -->
      <v-list-item
        link
        :to="`/a${gymSpace.path}/edit`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiPencil }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.edit') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Change space plan -->
      <v-list-item
        link
        :to="`${gymSpace.path}/upload-plan`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiMap }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.changePlan') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <!-- New line -->
      <v-list-item
        link
        :to="`${gymSpace.path}/select-sector`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiSourceBranchPlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.addLine') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Create a new secteur -->
      <v-list-item
        link
        :to="`/a${gymSpace.path}/sectors/new`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiShapeSquarePlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.addSector') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Create a new space -->
      <v-list-item
        link
        :to="`/a${gymSpace.gymPath}/spaces/new`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiMapPlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.createNewSpace') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiDotsVertical, mdiPencil, mdiMap, mdiSourceBranchPlus, mdiShapeSquarePlus, mdiMapPlus } from '@mdi/js'

export default {
  name: 'GymSpaceActionMenu',
  props: {
    gymSpace: Object
  },

  data () {
    return {
      mdiDotsVertical,
      mdiPencil,
      mdiMap,
      mdiSourceBranchPlus,
      mdiShapeSquarePlus,
      mdiMapPlus
    }
  }
}
</script>
