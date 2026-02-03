<template>
  <v-dialog
    v-model="attachModal"
    max-width="450"
  >
    <v-card>
      <v-card-title class="pl-3">
        <div
          v-if="tab === 'mainTab'"
          class="pl-4"
        >
          Ajouter à ma publication ...
        </div>

        <div v-else>
          <v-btn
            icon
            class="mr-2"
            @click="tab = 'mainTab'"
          >
            <v-icon color="primary">
              {{ mdiArrowLeft }}
            </v-icon>
          </v-btn>
          {{ items[tab].name }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item value="mainTab">
            <div class="rounded-sm border pa-1">
              <v-list dense>
                <v-list-item
                  v-for="(item, itemIndex) in items"
                  :key="`item-index-${itemIndex}`"
                  @click="tab = item.tab"
                >
                  <v-list-item-icon>
                    <v-icon>
                      {{ item.icon }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-tab-item>
          <v-tab-item value="gymRoutes">
            <v-alert color="blue" text>
              Pour ajouter des voies ou blocs à votre publication, rendez vous sur votre topo ou sur le tableau des voies, chercher les voies que vous souhaitez ajouter et ajouter les à votre publication
            </v-alert>
            <div class="text-center">
              <v-btn
                color="primary"
                elevation="0"
                :to="`${publishable.app_path}/admins/routes/tables`"
              >
                <v-icon left>
                  {{ mdiTable }}
                </v-icon>
                {{ $t('components.gymAdmin.table') }}
              </v-btn>
              <v-btn
                color="primary"
                elevation="0"
                :to="publishable.app_first_spaces_path"
              >
                <v-icon left>
                  {{ mdiSourceBranch }}
                </v-icon>
                {{ $t('components.gym.tabs.guideBook') }}
              </v-btn>
            </div>
          </v-tab-item>
          <v-tab-item value="gymSector">
            <v-alert color="blue" text>
              Pour ajouter un secteur à votre publication, rendez vous sur votre topo, cliquez sur le secteur à partager et ajoutez le à votre publication
            </v-alert>
            <div class="text-center">
              <v-btn
                color="primary"
                elevation="0"
                :to="publishable.app_first_spaces_path"
              >
                <v-icon left>
                  {{ mdiSourceBranch }}
                </v-icon>
                {{ $t('components.gym.tabs.guideBook') }}
              </v-btn>
            </div>
          </v-tab-item>
          <v-tab-item value="gymSpace">
            <v-skeleton-loader v-if="loadingGymSpaces" type="list-item-avatar-two-line" />
            <div v-else>
              <gym-space-list-item
                v-for="(gymSpace, gymSpaceIndex) in gymSpaces"
                :key="`gymSpace-${gymSpaceIndex}`"
                :gym-space="gymSpace"
                bordered
                class="mb-1"
                :callback="addGymSpace"
              />
            </div>
          </v-tab-item>
          <v-tab-item value="contest">
            <v-skeleton-loader v-if="loadingContests" type="list-item-avatar-two-line" />
            <div v-else>
              <contest-item-list
                v-for="(contest, contestIndex) in contests"
                :key="`contest-${contestIndex}`"
                :contest="contest"
                :callback="addContest"
              />
            </div>
          </v-tab-item>
          <v-tab-item value="picture">
            Une photo
          </v-tab-item>
          <v-tab-item value="gym">
            <gym-search-form
              :linkable-result="false"
              :callback="addGym"
            />
          </v-tab-item>
          <v-tab-item value="crag" class="pt-2">
            <crag-search-form
              :linkable-result="false"
              :callback="addCrag"
            />
          </v-tab-item>
          <v-tab-item value="cragRoute" class="pt-2">
            <crag-route-search-form
              :linkable-result="false"
              :callback="addCragRoute"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiSourceBranch,
  mdiTextureBox,
  mdiTrophy,
  mdiTerrain,
  mdiArrowLeft,
  mdiTable,
  mdiMap
} from '@mdi/js'
import { oblykIndoor } from '~/assets/oblyk-icons'
import OblykApi from '~/services/oblyk-api/OblykApi'
import CragSearchForm from '~/components/crags/forms/CragSearchForm'
import GymSearchForm from '~/components/gyms/forms/GymSearchForm'
import CragRouteSearchForm from '~/components/cragRoutes/forms/CragRouteSearchForm'
import ContestItemList from '~/components/contests/ContestItemList'
import GymSpaceListItem from '~/components/gymSpaces/GymSpaceListItem'

export default {
  name: 'PublicationAttachmentsModal',
  components: { GymSpaceListItem, ContestItemList, CragRouteSearchForm, GymSearchForm, CragSearchForm },

  props: {
    publishable: {
      type: Object,
      required: true
    },
    publishableType: {
      type: String,
      required: true
    },
    publication: {
      type: Object,
      default: null
    },
    addAttachmentsCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      attachModal: false,
      tab: 'mainTab',
      loadingContests: true,
      contests: [],
      loadingGymSpaces: true,
      gymSpaces: [],

      mdiSourceBranch,
      mdiArrowLeft,
      mdiTable
    }
  },

  computed: {
    items () {
      let commonItems = {}
      let gymItems = {}
      if (this.publishableType === 'Gym') {
        gymItems = {
          gymRoutes: { name: 'Des voies / blocs de ma salle', icon: mdiSourceBranch, tab: 'gymRoutes' },
          gymSector: { name: 'Un secteur', icon: mdiTextureBox, tab: 'gymSector' },
          gymSpace: { name: 'Un espace', icon: mdiMap, tab: 'gymSpace' },
          contest: { name: 'Un contest', icon: mdiTrophy, tab: 'contest' }
        }
      }
      commonItems = {
        gym: { name: 'Une salle', icon: oblykIndoor, tab: 'gym' },
        crag: { name: 'Une falaise', icon: mdiTerrain, tab: 'crag' },
        cragRoute: { name: 'Une voie / bloc extérieur', icon: mdiSourceBranch, tab: 'cragRoute' }
      }
      return { ...gymItems, ...commonItems }
    }
  },

  watch: {
    tab () {
      if (this.tab === 'contest' && this.contests.length === 0) {
        this.getContests()
      } else if (this.tab === 'gymSpace' && this.gymSpaces.length === 0) {
        this.getGymSpaces()
      }
    }
  },

  methods: {
    openModal () {
      this.attachModal = true
    },

    addCrag (crag) {
      this.addAttachmentsCallback([{ attachable_type: 'Crag', attachable_id: crag.id }])
      this.closeModal()
    },

    addGym (gym) {
      this.addAttachmentsCallback([{ attachable_type: 'Gym', attachable_id: gym.id }])
      this.closeModal()
    },

    addCragRoute (cragRoute) {
      this.addAttachmentsCallback([{ attachable_type: 'CragRoute', attachable_id: cragRoute.id }])
      this.closeModal()
    },

    addContest (contest) {
      this.addAttachmentsCallback([{ attachable_type: 'Contest', attachable_id: contest.id }])
      this.closeModal()
    },

    addGymSpace (gymSpace) {
      this.addAttachmentsCallback([{ attachable_type: 'GymSpace', attachable_id: gymSpace.id }])
      this.closeModal()
    },

    getContests () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.publishable.id}/contests`, { active: 'true' })
        .then((resp) => {
          this.contests = resp.data
        })
        .finally(() => {
          this.loadingContests = false
        })
    },

    getGymSpaces () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.publishable.id}/gym_spaces`)
        .then((resp) => {
          this.gymSpaces = resp.data
        })
        .finally(() => {
          this.loadingGymSpaces = false
        })
    },

    closeModal () {
      this.tab = 'mainTab'
      this.loadingContests = true
      this.contests = []
      this.loadingGymSpaces = true
      this.gymSpaces = true
      this.attachModal = false
    }
  }
}
</script>
