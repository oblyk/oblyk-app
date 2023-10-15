<template>
  <v-container>
    <h1 class="mb-5">
      Gestion des salles
    </h1>

    <p
      class="font-weight-bold hoverable"
      @click="showAssignedGyms = !showAssignedGyms"
    >
      <v-icon
        left
        class="vertical-align-top"
      >
        {{ showAssignedGyms ? mdiChevronDown : mdiChevronRight }}
      </v-icon>
      {{ assignedGyms.length }} Salles assignées
    </p>
    <div v-if="showAssignedGyms">
      <v-text-field
        v-model="search"
        label="Chercher une salle"
        outlined
        hide-details
        clearable
        :prepend-inner-icon="mdiMagnify"
      />
      <v-sheet
        v-for="(assignedGym, assignedGymIndex) in filteredGyms"
        :key="`assigned-gym-index-${assignedGymIndex}`"
        class="mb-6 mt-2 rounded-sm pa-4"
      >
        <v-row>
          <v-col cols="12" md="8">
            <gym-small-card
              :gym="assignedGym"
              small
              bordered
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <div class="mb-0 d-flex border-bottom">
              <div class="pt-2">
                <strong>{{ assignedGym.gym_options.length }}</strong> <small>option(s)</small>
              </div>
              <v-spacer />
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      {{ mdiPlus }}
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="addOption(assignedGym, 'contest')">
                    <v-list-item-title>
                      Contest
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <ul v-if="assignedGym.gym_options.length > 0">
              <li
                v-for="(option, optionIndex) in assignedGym.gym_options"
                :key="`option-${assignedGymIndex}-${optionIndex}`"
              >
                {{ option.option_type }}
                <v-btn
                  icon
                  color="red"
                  small
                  @click="deleteOption(assignedGym, option)"
                >
                  <v-icon small>
                    {{ mdiTrashCan }}
                  </v-icon>
                </v-btn>
              </li>
            </ul>
            <p
              v-else
              class="text--disabled text-center pt-2 mb-0"
            >
              <small>Pas d'options activées</small>
            </p>
          </v-col>
          <v-col cols="4">
            <strong>{{ assignedGym.route_count }}</strong> <small>lignes montées</small>
          </v-col>
          <v-col cols="4">
            <strong>{{ assignedGym.space_count }}</strong> <small>espaces créés</small>
          </v-col>
          <v-col cols="4">
            <small>Dernière ouverture :</small>
            <strong
              v-if="assignedGym.last_gym_route_mounted"
              v-text="humanizeDate(assignedGym.last_gym_route_mounted)"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </div>

    <p
      class="font-weight-bold hoverable"
      @click="showRequestedGyms = !showRequestedGyms"
    >
      <v-icon
        left
        class="vertical-align-top"
      >
        {{ showRequestedGyms ? mdiChevronDown : mdiChevronRight }}
      </v-icon>
      {{ requestedGyms.length }} nouvelles demander d'administrations
    </p>
    <div v-if="showRequestedGyms">
      <v-sheet
        v-for="(requestedGym, requestedGymIndex) in requestedGyms"
        :key="`requested-gym-index-${requestedGymIndex}`"
        class="mb-6 rounded-sm pa-4"
      >
        <gym-small-card
          :gym="requestedGym.gym"
          small
          bordered
        />
        <div class="back-app-color rounded-sm pa-4 mt-2 mb-2">
          {{ requestedGym.justification }}
        </div>
        <div class="mb-0">
          Par:
          <nuxt-link
            :to="userObject(requestedGym.user).path"
          >
            {{ requestedGym.first_name }} {{ requestedGym.last_name }}
          </nuxt-link>
        </div>
        <div>
          Email : {{ requestedGym.email }}
        </div>
        <div class="text-right">
          <v-btn
            outlined
            text
            color="red"
            @click="deleteRequest(requestedGym)"
          >
            <v-icon left>
              {{ mdiTrashCan }}
            </v-icon>
            Supprimer
          </v-btn>
          <v-btn
            outlined
            text
            @click="acceptRequest(requestedGym)"
          >
            <v-icon left>
              {{ mdiCheckboxOutline }}
            </v-icon>
            Accepter
          </v-btn>
        </div>
      </v-sheet>
    </div>
  </v-container>
</template>
<script>
import {
  mdiChevronDown,
  mdiChevronRight,
  mdiTrashCan,
  mdiCheckboxOutline,
  mdiPlus,
  mdiMagnify
} from '@mdi/js'
import GymAdministrationApi from '~/services/oblyk-api/GymAdministrationApi'
import Gym from '~/models/Gym'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import { DateHelpers } from '~/mixins/DateHelpers'
import User from '~/models/User'

export default {
  components: { GymSmallCard },
  mixins: [DateHelpers],
  middleware: [
    'auth',
    'admin'
  ],

  data () {
    return {
      search: null,
      showAssignedGyms: false,
      loadingAssigned: true,
      assignedGyms: [],

      showRequestedGyms: false,
      loadingRequested: true,
      requestedGyms: [],

      mdiChevronDown,
      mdiChevronRight,
      mdiTrashCan,
      mdiCheckboxOutline,
      mdiPlus,
      mdiMagnify
    }
  },

  computed: {
    filteredGyms () {
      if (this.search === null) {
        return this.assignedGyms
      }
      const gyms = []
      const search = this.search.toLowerCase()
      for (const gym of this.assignedGyms) {
        if (gym.name.toLowerCase().includes(search)) {
          gyms.push(gym)
        }
      }
      return gyms
    }
  },

  mounted () {
    this.getAssigned()
    this.getRequested()
  },

  methods: {
    getAssigned () {
      this.loadingAssigned = true
      new GymAdministrationApi(this.$axios, this.$auth)
        .assigned()
        .then((resp) => {
          this.assignedGyms = []
          for (const gym of resp.data) {
            this.assignedGyms.push(new Gym({ attributes: gym }))
          }
        })
        .finally(() => {
          this.loadingAssigned = false
        })
    },

    getRequested () {
      this.loadingRequested = true
      new GymAdministrationApi(this.$axios, this.$auth)
        .requested()
        .then((resp) => {
          this.requestedGyms = []
          for (const gym of resp.data) {
            this.requestedGyms.push(new Gym({ attributes: gym }))
          }
        })
        .finally(() => {
          this.loadingRequested = false
        })
    },

    userObject (user) {
      return new User({ attributes: user })
    },

    acceptRequest (request) {
      if (confirm("Sûr d'accepter ?")) {
        this.loadingRequested = true
        new GymAdministrationApi(this.$axios, this.$auth)
          .acceptRequested(request.id)
          .finally(() => {
            this.getAssigned()
            this.getRequested()
          })
      }
    },

    deleteRequest (request) {
      if (confirm('Sûr de supprimer ?')) {
        this.loadingRequested = true
        new GymAdministrationApi(this.$axios, this.$auth)
          .deleteRequested(request.id)
          .finally(() => {
            this.getRequested()
          })
      }
    },

    addOption (gym, optionType) {
      if (confirm('Sûr de supprimer ajouter cette option ?')) {
        this.loadingRequested = true
        new GymAdministrationApi(this.$axios, this.$auth)
          .addOption(gym.id, optionType)
          .finally(() => {
            this.getAssigned()
          })
      }
    },

    deleteOption (gym, option) {
      if (confirm('Sûr de supprimer cette option ?')) {
        this.loadingRequested = true
        new GymAdministrationApi(this.$axios, this.$auth)
          .deleteOption(gym.id, option.option_type)
          .finally(() => {
            this.getAssigned()
          })
      }
    }
  }
}
</script>
