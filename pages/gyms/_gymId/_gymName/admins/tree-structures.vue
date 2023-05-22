<template>
  <v-container>
    <p
      v-if="loadingStructure || !gym"
      class="text-center my-5"
    >
      {{ $t('common.loading') }}
    </p>

    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />

      <v-row class="mb-2">
        <v-col>
          <h2>
            {{ $t('components.gymSpace.list') }}
          </h2>
        </v-col>
        <v-col class="text-right">
          <v-btn
            outlined
            text
            color="primary"
            :to="`${gym.adminPath}/space-groups/new`"
          >
            <v-icon left>
              {{ mdiCardPlusOutline }}
            </v-icon>
            {{ $t('actions.createGroup') }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- Space group -->
      <div
        v-for="(gymSpaceGroup, gymSpaceGroupIndex) in spaceGroups"
        :key="`gym-space-group-${gymSpaceGroupIndex}`"
        class="pa-4 rounded mb-8"
        style="border-style: dashed; border-color: rgb(100, 100, 100); border-width: 2px"
      >
        <v-list-item class="mb-n6 mt-n3">
          <v-list-item-content>
            <v-list-item-title>
              <v-chip
                small
                class="mr-2"
              >
                {{ gymSpaceGroup.order }}
              </v-chip>
              {{ $t('common.group') }} :
              <strong class="text-decoration-underline">
                {{ gymSpaceGroup.name }}
              </strong>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu>
              <template #activator="{ on, attrs }">
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
                <!-- Edit Space group -->
                <v-list-item
                  :to="`${gymSpaceGroup.gymPath}/admins/space-groups/${gymSpaceGroup.id}/edit?redirect_to=${$route.fullPath}`"
                >
                  <v-list-item-icon>
                    <v-icon>{{ mdiPencil }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.edit') }}
                  </v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item
                  @click="deleteSpaceGroup(gymSpaceGroup.id)"
                >
                  <v-list-item-icon>
                    <v-icon color="red">
                      {{ mdiDelete }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="red--text">
                    {{ $t('actions.delete') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <div>
          <v-sheet
            v-for="(space, spaceIndex) in gymSpaceGroup.spaces"
            :key="`space-group-index-${spaceIndex}`"
            class="pa-4 rounded mt-6"
          >
            <gym-space-tree-detail
              :gym-space="space"
              :get-structures="getStructures"
              :start-loading-structures="startLoading"
            />
          </v-sheet>
        </div>
      </div>

      <!-- Space without group -->
      <v-sheet
        v-for="(space, spaceIndex) in spaces"
        :key="`space-index-${spaceIndex}`"
        class="pa-4 rounded mt-6"
      >
        <gym-space-tree-detail
          :gym-space="space"
          :get-structures="getStructures"
          :start-loading-structures="startLoading"
        />
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
import { mdiCardPlusOutline, mdiGroup, mdiDotsVertical, mdiPencil, mdiDelete } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymApi from '~/services/oblyk-api/GymApi'
import GymSector from '~/models/GymSector'
import GymSpace from '~/models/GymSpace'
import GymSpaceGroup from '~/models/GymSpaceGroup'
import GymSpaceTreeDetail from '~/components/gymSpaces/GymSpaceTreeDetail.vue'
import GymSpaceGroupApi from '~/services/oblyk-api/GymSpaceGroupApi'

export default {
  components: { GymSpaceTreeDetail },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],

  data () {
    return {
      loadingStructure: true,
      spaces: null,
      spaceGroups: null,

      mdiCardPlusOutline,
      mdiGroup,
      mdiDotsVertical,
      mdiPencil,
      mdiDelete
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.structure')
        }
      ]
    }
  },

  mounted () {
    this.getStructures()
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'La structure'
      },
      en: {
        metaTitle: 'Structure'
      }
    }
  },

  methods: {
    getStructures () {
      this.loadingStructure = true
      new GymApi(this.$axios, this.$auth)
        .treeStructures(this.$route.params.gymId)
        .then((resp) => {
          this.spaces = []
          this.spaceGroups = []
          // Space group
          for (const spaceGroup of resp.data.gym.gym_space_groups) {
            const spaces = []
            for (const gymSpace of spaceGroup.gym_spaces) {
              const sectors = []
              for (const gymSector of gymSpace.gym_sectors) {
                sectors.push(new GymSector({ attributes: gymSector }))
              }
              const space = new GymSpace({ attributes: gymSpace })
              space.sectors = sectors
              spaces.push(space)
            }
            const group = new GymSpaceGroup({ attributes: spaceGroup })
            group.spaces = spaces
            this.spaceGroups.push(group)
          }

          // Space without group
          for (const gymSpace of resp.data.gym.gym_spaces) {
            const sectors = []
            for (const gymSector of gymSpace.gym_sectors) {
              sectors.push(new GymSector({ attributes: gymSector }))
            }
            const space = new GymSpace({ attributes: gymSpace })
            space.sectors = sectors
            this.spaces.push(space)
          }
        })
        .finally(() => {
          this.loadingStructure = false
        })
    },

    startLoading () {
      this.loadingStructure = true
    },

    deleteSpaceGroup (spaceGroupId) {
      this.loadingStructure = true
      new GymSpaceGroupApi(this.$axios, this.$auth)
        .delete(this.gym.id, spaceGroupId)
        .finally(() => {
          this.getStructures()
        })
    }
  }
}
</script>
