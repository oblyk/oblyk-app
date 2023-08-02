<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar>
          <v-img :src="gymSpace.planThumbnailUrl" />
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          <v-chip
            small
            class="mr-2"
          >
            {{ gymSpace.order }}
          </v-chip>
          {{ gymSpace.name }}
          <v-btn
            text
            x-small
            outlined
            color="primary"
            class="ml-1"
            :to="gymSpace.path"
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
              :to="`${gymSpace.path}/edit?redirect_to=${$route.fullPath}`"
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
              @click="deleteSpace()"
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
      v-if="gymSpace.description"
      :text="gymSpace.description"
      class="border rounded-sm pt-4 px-4 mb-4"
    />
    <v-row>
      <v-col>
        <description-line
          :icon="mdiCircle"
          :icon-color="climbingTypeColors[gymSpace.climbing_type]"
          class="border rounded-sm pa-1"
          :item-title="$t('components.input.climbing_type')"
          :item-value="$t(`models.climbs.${gymSpace.climbing_type}`)"
        />
      </v-col>
      <v-col>
        <description-line
          :icon="mdiSortBoolAscending"
          class="border rounded-sm pa-1"
          :item-title="$t('components.gymAdmin.difficultySystem')"
        >
          <template #content>
            <nuxt-link :to="`${gymSpace.Gym.adminPath}/grades/${gymSpace.gym_grade.id}`">
              {{ gymSpace.gym_grade.name }}
            </nuxt-link>
          </template>
        </description-line>
      </v-col>
      <v-col
        v-if="gymSpace.anchor"
        cols="12"
      >
        <v-icon
          class="vertical-align-text-top"
          small
          left
        >
          {{ mdiCheck }}
        </v-icon>
        {{ $t('models.gymSpace.anchor') }}
      </v-col>
    </v-row>
    <p class="text-decoration-underline mt-5 mb-2">
      {{ $t('components.cragSector.sectors') }} :
    </p>
    <v-sheet
      v-for="(sector, sectorIndex) in gymSpace.sectors"
      :key="`sector-index-${sectorIndex}`"
      class="mb-2 back-app-color rounded"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-chip
              small
              class="mr-2"
            >
              {{ sector.order }}
            </v-chip>
            <strong>
              {{ sector.name }}
            </strong>
            , {{ sector.height }}m
            <span v-if="sector.can_be_more_than_one_pitch">
              , {{ $t('models.gymSector.can_be_more_than_one_pitch') }}
            </span>
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
                @click="deleteSector(sector.id)"
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
  </div>
</template>

<script>
import { mdiDotsVertical, mdiDelete, mdiPencil, mdiCircle, mdiSortBoolAscending, mdiCheck } from '@mdi/js'
import MarkdownText from '~/components/ui/MarkdownText.vue'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import { ClimbingTypeMixin } from '~/mixins/ClimbingTypeMixin'

export default {
  name: 'GymSpaceTreeDetail',
  components: { DescriptionLine, MarkdownText },
  mixins: [ClimbingTypeMixin],
  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    getStructures: {
      type: Function,
      required: true
    },
    startLoadingStructures: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      mdiDotsVertical,
      mdiDelete,
      mdiPencil,
      mdiCircle,
      mdiSortBoolAscending,
      mdiCheck
    }
  },

  methods: {
    deleteSpace () {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.startLoadingStructures()
        new GymSpaceApi(this.$axios, this.$auth)
          .delete(this.gymSpace.gym.id, this.gymSpace.id)
          .then(() => {
            this.getStructures()
          })
      }
    },

    deleteSector (sectorId) {
      if (confirm(this.$t('common.areYouSurToDelete'))) {
        this.startLoadingStructures()
        new GymSectorApi(this.$axios, this.$auth)
          .delete(this.gymSpace.gym.id, this.gymSpace.id, sectorId)
          .then(() => {
            this.getStructures()
          })
      }
    }
  }
}
</script>
