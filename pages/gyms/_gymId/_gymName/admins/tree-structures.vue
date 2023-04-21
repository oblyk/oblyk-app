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

      <h2 class="mb-3 mt-3">
        {{ $t('components.gymSpace.list') }}
      </h2>
      <v-sheet
        v-for="(space, spaceIndex) in spaces"
        :key="`space-index-${spaceIndex}`"
        class="pa-4 rounded mb-6"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar>
              <v-img :src="space.planThumbnailUrl" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              <v-chip
                small
                class="mr-2"
              >
                {{ space.order }}
              </v-chip>
              {{ space.name }}
              <v-btn
                text
                x-small
                outlined
                color="primary"
                class="ml-1"
                :to="space.path"
              >
                {{ $t('actions.see') }}
              </v-btn>
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
                <!-- Edit article -->
                <v-list-item
                  :to="`${space.path}/edit?redirect_to=${$route.fullPath}`"
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
                  @click="deleteSpace(space.id)"
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
        <markdown-text
          v-if="space.description"
          :text="space.description"
          class="border rounded-sm pt-4 px-4"
        />
        <p class="text-decoration-underline mt-5 mb-2">
          {{ $t('components.cragSector.sectors') }} :
        </p>
        <v-sheet
          v-for="(sector, sectorIndex) in space.sectors"
          :key="`sector-index-${sectorIndex}`"
          class="mb-2 back-app-color rounded"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <v-chip
                  small
                  class="mr-2"
                >
                  {{ sector.order }}
                </v-chip>
                {{ sector.name }}
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
                  <!-- Edit article -->
                  <v-list-item
                    :to="`${sector.path}/edit?redirect_to=${$route.fullPath}`"
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
                    @click="deleteSector(space.id, sector.id)"
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
        </v-sheet>
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
import { mdiArrowLeft, mdiDotsVertical, mdiPencil, mdiDelete } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'
import GymSector from '~/models/GymSector'
import GymSpace from '~/models/GymSpace'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'

export default {
  components: { MarkdownText },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],

  data () {
    return {
      loadingStructure: true,
      spaces: null,

      mdiArrowLeft,
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

    deleteSpace (spaceId) {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.loadingStructure = true
        new GymSpaceApi(this.$axios, this.$auth)
          .delete(this.gym.id, spaceId)
          .then(() => {
            this.getStructures()
          })
      }
    },

    deleteSector (spaceId, sectorId) {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.loadingStructure = true
        new GymSectorApi(this.$axios, this.$auth)
          .delete(this.gym.id, spaceId, sectorId)
          .then(() => {
            this.getStructures()
          })
      }
    }
  }
}
</script>
