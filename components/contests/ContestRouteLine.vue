<template>
  <div class="border-top pa-1 pb-0 pl-2 d-flex">
    <div>
      <v-chip @click="editModal = true">
        {{ route.number }}
      </v-chip>
    </div>
    <gym-route-simple-item
      v-if="route.gym_route_id"
      :gym-route="route.gym_route"
      class="ml-3"
    />
    <v-avatar
      v-if="route.picture"
      size="32"
      rounded
      class="flex-grow-0 ml-2"
      @click="pictureModal = true"
    >
      <v-img :src="route.pictureUrl" />
    </v-avatar>
    <div
      v-if="route.disabled_at !== null"
      class="text--disabled ml-3 align-self-center"
    >
      [exclue du contest]
    </div>
    <div
      v-if="route.ranking_type === 'highest_hold'"
      class="ml-2"
    >
      <v-chip
        v-if="!route.number_of_holds"
        @click="editModal = true"
      >
        Nombre de prise ?
      </v-chip>
      <v-chip
        v-else
        @click="editModal = true"
      >
        {{ route.number_of_holds }} prises
      </v-chip>
    </div>
    <div
      v-if="route.ranking_type === 'fixed_points'"
      class="ml-2"
    >
      <v-chip
        v-if="!route.fixed_points"
        @click="editModal = true"
      >
        Points ?
      </v-chip>
      <v-chip
        v-else
        @click="editModal = true"
      >
        {{ route.fixed_points }} pts
      </v-chip>
    </div>
    <div
      v-if="route.ranking_type === 'division_and_zone'"
      class="ml-2"
    >
      <v-chip
        v-if="route.additional_zone"
        @click="editModal = true"
      >
        <v-icon left>
          {{ mdiAlphaZBoxOutline }}
        </v-icon>
        À une zone
      </v-chip>
      <v-chip
        v-else
        @click="editModal = true"
      >
        Pas de zone
      </v-chip>
    </div>
    <v-spacer />
    <v-tooltip
      top
      open-delay="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          icon
          v-on="on"
          @click="addPictureModal = true"
        >
          <v-icon>
            {{ route.picture ? mdiCameraFlip : mdiCameraPlus }}
          </v-icon>
        </v-btn>
      </template>
      <span v-text="route.picture ? 'Changer la photo' : 'Ajouter une photo'" />
    </v-tooltip>
    <div>
      <v-menu>
        <template #activator="{ on, attrs }">
          <v-btn
            :loading="loadingAction"
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
          <v-list-item
            @click="editModal = true"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiPencil }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('actions.edit') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="route.gym_route_id === null"
            @click="openRouteLink(route)"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiLinkVariant }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Lié à une ligne du topo
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="addPictureModal = true">
            <v-list-item-icon>
              <v-icon>
                {{ route.picture ? mdiCameraFlip : mdiCameraPlus }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title
              v-text="route.picture ? 'Changer la photo' : 'Ajouter une photo'"
            />
          </v-list-item>
          <v-list-item
            v-if="route.disabled_at !== null"
            @click="activateRoute()"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiArrowUpBoldBoxOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('actions.reInclude') }}
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item
            v-if="route.picture"
            @click="deletePicture()"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiCameraOff }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text">
              Supprimer la photo
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="route.disabled_at === null"
            @click="deactivateRoute()"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiCloseBoxOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text">
              {{ $t('actions.exclude') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="route.gym_route_id !== null"
            @click="unliked"
          >
            <v-list-item-icon>
              <v-icon>
                {{ mdiLinkVariantOff }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text">
              Supprimer le lien avec le topo
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteRoute()">
            <v-list-item-icon>
              <v-icon>
                {{ mdiTrashCan }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="red--text">
              {{ $t('actions.delete') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Edit dialog -->
    <v-dialog
      v-model="editModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ route.number }}
        </v-card-title>
        <div class="pa-4">
          <contest-route-form
            :contest="contest"
            :gym="contest.gym"
            :contest-route="route"
            :callback="getRoute"
            submit-methode="put"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Add picture -->
    <v-dialog
      v-model="addPictureModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          Ajouter une photo sur {{ route.number }}
        </v-card-title>
        <div class="pa-4">
          <contest-route-picture-form
            :contest="contest"
            :contest-route="route"
            :callback="getRoute"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Open picture -->
    <v-dialog
      v-model="pictureModal"
      width="700"
    >
      <v-img
        :src="route.pictureLargeUrl"
        :lazy-src="route.pictureUrl"
      />
    </v-dialog>
  </div>
</template>

<script>
import {
  mdiDotsVertical,
  mdiPencil,
  mdiTrashCan,
  mdiCloseBoxOutline,
  mdiArrowUpBoldBoxOutline,
  mdiLinkVariant,
  mdiLinkVariantOff,
  mdiCameraPlus,
  mdiCameraFlip,
  mdiCameraOff,
  mdiAlphaZBoxOutline
} from '@mdi/js'
import ContestRouteApi from '~/services/oblyk-api/ContestRouteApi'
import ContestRouteForm from '~/components/contests/forms/ContestRouteForm.vue'
import ContestRoute from '~/models/ContestRoute'
import GymRouteSimpleItem from '~/components/gymRoutes/GymRouteItem.vue'
import ContestRoutePictureForm from '~/components/contests/forms/ContestRoutePictureForm.vue'

export default {
  name: 'ContestRouteLine',
  components: { ContestRoutePictureForm, GymRouteSimpleItem, ContestRouteForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      required: true
    },
    contestStageStep: {
      type: Object,
      required: true
    },
    contestRoute: {
      type: Object,
      required: true
    },
    getRouteGroup: {
      type: Function,
      required: true
    },
    openRouteLink: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      editModal: false,
      addPictureModal: false,
      pictureModal: false,
      loadingAction: false,
      route: new ContestRoute({ attributes: this.contestRoute }),

      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan,
      mdiCloseBoxOutline,
      mdiArrowUpBoldBoxOutline,
      mdiLinkVariant,
      mdiLinkVariantOff,
      mdiCameraPlus,
      mdiCameraFlip,
      mdiCameraOff,
      mdiAlphaZBoxOutline
    }
  },

  watch: {
    contestRoute () {
      this.route = new ContestRoute({ attributes: this.contestRoute })
    }
  },

  methods: {
    getRoute () {
      this.loadingAction = true
      this.editModal = false
      this.addPictureModal = false
      new ContestRouteApi(this.$axios, this.$auth)
        .find(this.contest.gym_id, this.contest.id, this.route.id)
        .then((resp) => {
          this.route = new ContestRoute({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingAction = false
        })
    },

    deleteRoute () {
      if (confirm('Êtes-vous sûr de supprimer cette ligne ?')) {
        this.loadingAction = true
        new ContestRouteApi(this.$axios, this.$auth)
          .delete(
            this.contest.gym_id,
            this.contest.id,
            this.route.id
          )
          .then(() => {
            this.getRouteGroup()
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    deletePicture () {
      if (confirm('Êtes-vous sûr de supprimer la photo ?')) {
        this.loadingAction = true
        new ContestRouteApi(this.$axios, this.$auth)
          .deletePicture(
            this.contest.gym_id,
            this.contest.id,
            this.route.id
          )
          .then(() => {
            this.getRouteGroup()
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    deactivateRoute () {
      this.loadingAction = true
      new ContestRouteApi(this.$axios, this.$auth)
        .deactivate(
          this.contest.gym_id,
          this.contest.id,
          this.route.id
        )
        .then(() => {
          this.getRoute()
        })
    },

    activateRoute () {
      this.loadingAction = true
      new ContestRouteApi(this.$axios, this.$auth)
        .activate(
          this.contest.gym_id,
          this.contest.id,
          this.route.id
        )
        .then(() => {
          this.getRoute()
        })
    },

    unliked () {
      this.loadingAction = true
      new ContestRouteApi(this.$axios, this.$auth)
        .unlinked(
          this.contest.gym_id,
          this.contest.id,
          this.route.id
        )
        .then(() => {
          this.getRoute()
        })
    }
  }
}
</script>
