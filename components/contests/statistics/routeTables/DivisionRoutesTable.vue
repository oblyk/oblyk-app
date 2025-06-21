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
  </v-data-table>
</template>

<script>
import ContestRouteAvatar from '~/components/contests/ContestRouteAvatar'

export default {
  name: 'DivisionRoutesTable',
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
          text: 'Nombre de top',
          align: 'start',
          sortable: true,
          value: 'top'
        },
        {
          text: 'Nb. top / participant',
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
            top_ratio: route.top_ratio
          }
        )
      }
      return rows
    }
  }
}
</script>
