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
    <template v-slot:[`item.top_ratio`]="{ item }">
      <strong :style="`color: ${percentColorFunction(item.top_ratio)}`">
        {{ item.top_ratio }}%
      </strong>
    </template>
    <template v-slot:[`item.zone_ratio`]="{ item }">
      <strong :style="`color: ${percentColorFunction(item.zone_ratio)}`">
        {{ item.zone_ratio }}%
      </strong>
    </template>
  </v-data-table>
</template>

<script>
import ContestRouteAvatar from '~/components/contests/ContestRouteAvatar'

export default {
  name: 'AttemptsToOneZoneAndTopRoutesTable',
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
          text: 'Zone : faite',
          align: 'start',
          sortable: true,
          value: 'zone'
        },
        {
          text: "Zone : nb. d'essais",
          align: 'start',
          sortable: true,
          value: 'zone_attempt'
        },
        {
          text: "Zone : nb. d'essais moyen",
          align: 'start',
          sortable: true,
          value: 'zone_attempt_average'
        },
        {
          text: 'Zone : nb. / participant',
          align: 'start',
          sortable: true,
          value: 'zone_ratio'
        },
        {
          text: 'Top : fait',
          align: 'start',
          sortable: true,
          value: 'top'
        },
        {
          text: "Top : nb. d'essais",
          align: 'start',
          sortable: true,
          value: 'top_attempt'
        },
        {
          text: "Top : nb. d'essais moyen",
          align: 'start',
          sortable: true,
          value: 'top_attempt_average'
        },
        {
          text: 'Top : nb. / participant',
          align: 'start',
          sortable: true,
          value: 'top_ratio'
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
            top: route.top,
            top_attempt: route.top_attempt,
            top_attempt_average: route.top_attempt_average.toLocaleString(),
            top_ratio: route.top_ratio.toLocaleString(),
            zone: route.zone,
            zone_attempt: route.zone_attempt,
            zone_attempt_average: route.zone_attempt_average.toLocaleString(),
            zone_ratio: route.zone_ratio.toLocaleString()
          }
        )
      }
      return rows
    }
  }
}
</script>
