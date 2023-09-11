<template>
  <div>
    <p
      v-if="loadingTreeRoutes"
      class="text-center text--disabled my-4"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <v-treeview
        :items="treeRoutes"
        dense
        hoverable
        open-on-click
      >
        <template
          #prepend="{ item, open }"
        >
          <v-icon v-if="item.type !== 'GymRoute'">
            {{ open ? mdiFolderOpen : mdiFolder }}
          </v-icon>
        </template>
        <template #label="{ item }">
          <gym-route-simple-item
            v-if="item.route"
            :gym-route="item.route"
            :callback="callback"
          />
          <div v-else>
            {{ item.name }}
          </div>
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<script>
import { mdiFolder, mdiFolderOpen } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRouteSimpleItem from '~/components/gymRoutes/GymRouteItem'

export default {
  name: 'ContestTreeRouteForm',
  components: { GymRouteSimpleItem },
  props: {
    contest: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      loadingTreeRoutes: true,
      treeRoutes: [],

      mdiFolder,
      mdiFolderOpen
    }
  },

  mounted () {
    this.getTreeRoutes()
  },

  methods: {
    getTreeRoutes () {
      this.loadingTreeRoutes = true
      new GymApi(this.$axios, this.$auth)
        .treeRoutes(this.contest.gym_id)
        .then((resp) => {
          this.treeRoutes = resp.data
        })
        .finally(() => {
          this.loadingTreeRoutes = false
        })
    }
  }
}
</script>
