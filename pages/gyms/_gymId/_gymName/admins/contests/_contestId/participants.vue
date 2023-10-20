<template>
  <v-sheet class="mt-2 pa-4 rounded">
    <v-text-field
      v-model="search"
      :append-icon="mdiMagnify"
      :label="$t('actions.search')"
      outlined
      hide-details
      dense
    />
    <v-data-table
      :loading="loadingParticipants"
      :headers="participantHeaders"
      :items="participantItems"
      :search="search"
    >
      <template #[`item.token`]="{ item }">
        <v-chip @click="showParticipantModal(item.id)">
          {{ item.token }}
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              text
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="showParticipantModal(item.id)">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiWindowRestore }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ $t('actions.see') }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="getParticipant(item.id, 'edit')">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPencil }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ $t('actions.edit') }}
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item @click="deleteParticipant(item.id)">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiTrashCan }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="red--text">
                {{ $t('actions.delete') }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div class="text-right">
      <v-btn
        outlined
        color="primary"
        :loading="loadingExport"
        @click="exportParticipants()"
      >
        Exporter
      </v-btn>
      <v-btn
        v-if="contestCategories"
        elevation="0"
        color="primary"
        @click="addModal = true"
      >
        Ajouter un·e participant·e
      </v-btn>
    </div>

    <!-- Show modal -->
    <v-dialog
      v-model="showModal"
      width="800"
    >
      <v-card>
        <div class="pa-4">
          <contest-participant-card
            v-if="showModal && participantId"
            :ref="`participant-card-${participantId}`"
            :contest-participant-id="participantId"
            :contest="contest"
            :close-modal="closeModals"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Edit Modal -->
    <v-dialog
      v-model="editModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ (participant || {}).first_name || '...' }}
        </v-card-title>
        <div class="px-4 pb-4">
          <p
            v-if="loadingParticipant || !contestCategories"
            class="text-center my-4"
          >
            {{ $t('common.loading') }}
          </p>
          <contest-participant-form
            v-else
            :ref="`edit-participant-form-${participant.id}`"
            :contest="contest"
            :contest-participant="participant"
            :contest-categories="contestCategories"
            :callback="editCallback"
            submit-methode="put"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Add Modal -->
    <v-dialog
      v-model="addModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          Ajouter un participant
        </v-card-title>
        <div class="px-4 pb-4">
          <contest-participant-form
            :contest="contest"
            :callback="addCallback"
            :contest-categories="contestCategories"
            submit-methode="post"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mdiDotsVertical, mdiPencil, mdiTrashCan, mdiMagnify, mdiWindowRestore } from '@mdi/js'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import ContestParticipant from '~/models/ContestParticipant'
import ContestParticipantForm from '~/components/contests/forms/ContestParticipantForm.vue'
import ContestParticipantCard from '~/components/contests/ContestParticipantCard.vue'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'
import ContestCategory from '~/models/ContestCategory'

export default {
  components: { ContestParticipantCard, ContestParticipantForm },
  middleware: ['auth', 'gymAdmin'],

  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      editModal: false,
      showModal: false,
      addModal: false,
      loadingParticipant: true,
      loadingExport: false,
      participant: null,
      participantId: null,
      loadingParticipants: true,
      refreshKey: 0,
      participants: [],
      search: null,
      contestCategories: null,
      participantHeaders: [
        {
          text: 'Référence',
          align: 'start',
          sortable: false,
          value: 'token'
        },
        {
          text: 'Prénom',
          align: 'start',
          sortable: true,
          value: 'first_name'
        },
        {
          text: 'Nom',
          align: 'start',
          sortable: true,
          value: 'last_name'
        },
        {
          text: 'Genre',
          align: 'start',
          sortable: true,
          value: 'genre'
        },
        {
          text: 'Vague',
          align: 'start',
          sortable: true,
          value: 'wave'
        },
        {
          text: 'Catégorie',
          align: 'start',
          sortable: true,
          value: 'category'
        },
        {
          text: 'Club / Salle',
          align: 'start',
          sortable: true,
          value: 'affiliation'
        },
        {
          text: '',
          align: 'end',
          sortable: false,
          value: 'actions'
        }
      ],

      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan,
      mdiMagnify,
      mdiWindowRestore
    }
  },

  computed: {
    participantItems () {
      const refreshKey = this.refreshKey
      const participants = []
      for (const participant of this.participants) {
        participants.push({
          id: participant.id,
          first_name: participant.first_name,
          last_name: participant.last_name,
          token: participant.token,
          affiliation: participant.affiliation,
          wave: participant.contest_wave?.name,
          category: participant.contest_category.name,
          genre: this.$t(`models.genres.${participant.genre}`),
          refreshKey
        })
      }
      return participants
    }
  },

  mounted () {
    this.getParticipants()
    this.getCategories()
  },

  methods: {
    getParticipants () {
      this.loadingParticipants = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.participants = []
          for (const participant of resp.data) {
            this.participants.push(new ContestParticipant({ attributes: participant }))
          }
        })
        .finally(() => {
          this.loadingParticipants = false
        })
    },

    showParticipantModal (participantId) {
      this.participantId = participantId
      this.showModal = true
    },

    getParticipant (participantId, mode = 'edit') {
      this.editModal = mode === 'edit'
      this.showModal = mode === 'get'
      new ContestParticipantApi(this.$axios, this.$auth)
        .find(this.contest.gym_id, this.contest.id, participantId)
        .then((resp) => {
          this.participant = new ContestParticipant({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingParticipant = false
        })
    },

    getCategories () {
      new ContestCategoryApi(this.$axios, this.$auth)
        .all(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          this.contestCategories = []
          for (const category of resp.data) {
            this.contestCategories.push(new ContestCategory({ attributes: category }))
          }
        })
    },

    editCallback (participant) {
      this.editModal = false
      for (const participantIndex in this.participants) {
        if (this.participants[participantIndex].id === participant.id) {
          this.participants[participantIndex] = participant
          this.refreshKey++
          return
        }
      }
    },

    addCallback (participant) {
      this.addModal = false
      this.participants.push(participant)
    },

    deleteParticipant (participantId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce participant ? Il n'y a aucun retour possible")) {
        this.loadingParticipants = true
        new ContestParticipantApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, participantId)
          .finally(() => {
            this.getParticipants()
          })
      }
    },

    exportParticipants () {
      this.loadingExport = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .export(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          const url = window.URL.createObjectURL(new Blob([resp.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `export-participant-${this.contest.slug_name}.csv`)
          document.body.appendChild(link)
          link.click()
        })
        .finally(() => {
          this.loadingExport = false
        })
    },

    closeModals () {
      this.editModal = false
      this.showModal = false
      this.addModal = false
    }
  }
}
</script>
