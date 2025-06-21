<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    dense
    class="rounded border"
  >
    <template v-slot:[`item.attachments`]="{ item }">
      <contest-route-avatar :contest-route="item" />
    </template>
    <template v-slot:[`item.number`]="{ item }">
      <v-chip @click="clickCallback(item.id)">
        {{ item.number }}
      </v-chip>
    </template>
    <template v-slot:[`item.zone_ratio`]="{ item }">
      <strong
        v-if="item.zone_ratio"
        :style="`color: ${percentColorFunction(item.zone_ratio)}`"
      >
        {{ item.zone_ratio }}%
      </strong>
      <span v-else>
        -
      </span>
    </template>
    <template v-slot:[`item.top_ratio`]="{ item }">
      <strong :style="`color: ${percentColorFunction(item.top_ratio)}`">
        {{ item.top_ratio }}%
      </strong>
    </template>
    <template v-slot:[`item.top_vs_zone`]="{ item }">
      <strong
        v-if="item.top_vs_zone !== null"
        :style="`color: ${percentColorFunction(item.top_vs_zone)}`"
      >
        {{ item.top_vs_zone }}%
      </strong>
      <span v-else>
        -
      </span>
    </template>
  </v-data-table>
</template>

<script>
import ContestRouteAvatar from '~/components/contests/ContestRouteAvatar'

export default {
  name: 'DivisionAndZoneRoutesTable',
  components: { ContestRouteAvatar },
  props: {
    routes: {
      type: Array,
      required: true
    },
    clickCallback: {
      type: Function,
      required: true
    },
    percentColorFunction: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      headers: [
        {
          text: 'Photo',
          align: 'start',
          sortable: false,
          value: 'attachments'
        },
        {
          text: 'Numéro',
          align: 'start',
          sortable: true,
          value: 'number'
        },
        {
          text: 'Nombre de zone',
          align: 'start',
          sortable: true,
          value: 'zone'
        },
        {
          text: 'Nombre de top',
          align: 'start',
          sortable: true,
          value: 'top'
        },
        {
          text: 'Nb. zone / participant',
          align: 'start',
          sortable: true,
          value: 'zone_ratio'
        },
        {
          text: 'Nb. top / participant',
          align: 'start',
          sortable: true,
          value: 'top_ratio'
        },
        {
          text: 'Zone vs Top',
          align: 'start',
          sortable: true,
          value: 'top_vs_zone'
        }
      ]
    }
  },

  computed: {
    items () {
      const rows = []
      for (const route of this.routes) {
        rows.push(
          {
            attachments: route.attachments,
            id: route.id,
            number: route.number,
            zone: route.zone !== null ? route.zone : '-',
            top: route.top,
            zone_ratio: route.zone_ratio,
            top_ratio: route.top_ratio,
            top_vs_zone: route.top_vs_zone
          }
        )
      }
      return rows
    }
  }
}
</script>
