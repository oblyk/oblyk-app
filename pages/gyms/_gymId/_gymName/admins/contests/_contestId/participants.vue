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
        <v-btn
          icon
          @click="openQrCodeModal(item)"
        >
          <v-icon>
            {{ mdiQrcode }}
          </v-icon>
        </v-btn>
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
        @click="importModal = true"
      >
        <v-icon left>
          {{ mdiImport }}
        </v-icon>
        Importer
      </v-btn>
      <v-btn
        outlined
        color="primary"
        :loading="loadingExport"
        @click="exportParticipants()"
      >
        <v-icon left>
          {{ mdiExport }}
        </v-icon>
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
            :key="`add-participant-form-index-${participantFormKey}`"
            :contest="contest"
            :callback="addCallback"
            :contest-categories="contestCategories"
            submit-methode="post"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Participant QrCodeModal -->
    <v-dialog
      v-model="qrCodeModal"
      width="400"
    >
      <v-card>
        <v-card-title
          v-if="selectedParticipantQrCode"
          class="pb-0"
        >
          {{ selectedParticipantQrCode.first_name }} {{ selectedParticipantQrCode.last_name }}
        </v-card-title>
        <v-card-subtitle class="mt-0">
          <v-icon
            small
            left
            class="vertical-align-sub"
          >
            {{ mdiAutoFix }}
          </v-icon>
          QrCode Magique de connexion
        </v-card-subtitle>
        <div class="px-4 pb-4">
          <v-skeleton-loader
            v-if="loadingQrCode"
            type="image"
          />
          <div v-else>
            <div
              class="participant-qr-code-svg-container"
              v-html="participantQrCode"
            />
            <p class="mt-3 mb-0">
              <strong>Note : </strong> scanner ce QrCode avec le téléphone du participant pour lui permettre de renseigner ses résultats.
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="importModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          Importer des participants
        </v-card-title>
        <div class="px-6 pb-4">
          <p class="font-weight-bold">
            Pour importer des participants depuis un fichier merci de prendre connaissance des points suivants :
          </p>
          <p>
            <strong>1.</strong> Le fichier doit être au format .csv
          </p>
          <p>
            <strong>2.</strong> Les colonnes doivent être séparées par des points virgules (;)
          </p>
          <p class="mb-1">
            <strong>3.</strong> Le fichier doit comporter les éléments suivants <strong>strictement dans cet ordre</strong> :
          </p>
          <ul class="mb-1">
            <li>Prénom</li>
            <li>Nom de famille</li>
            <li>Date de naissance</li>
            <li>Email</li>
            <li>Genre. Valeur possible : homme, femme</li>
            <li v-if="contestCategories && contestCategories.length > 0">
              Catégorie. Valeur possible : {{ contestCategories.map(cat => cat.name).join(', ') }}
            </li>
            <li v-if="contestWaves && contestWaves.length > 0">
              Vague. Valeur possible : {{ contestWaves.map(wave => wave.name).join(', ') }}
            </li>
          </ul>
          <v-btn
            text
            outlined
            :loading="loadingImportTemplate"
            class="mb-3"
            @click="importTemplate"
          >
            Télécharger le modèle
          </v-btn>
          <p>
            <strong>4.</strong> La première ligne est dédiée aux entêtes donc elle n'est pas prise en compte dans l'import.<br>
            <strong>Autrement dit :</strong> le premier participant se trouve à la ligne 2 de votre fichier.
          </p>
          <p>
            <strong>Aussi</strong>, vous pouvez importer plusieurs fois le même fichier, les participants ne seront pas créé en doublon
          </p>
          <v-form
            class="border rounded-sm pa-4"
            enctype="multipart/form-data"
          >
            <v-file-input
              v-model="importFile"
              outlined
              truncate-length="15"
              hide-details
              placeholder="Fichier .csv à importer ..."
            />
            <v-checkbox
              v-model="sendEmail"
              label="Envoyer l'email de bienvenue aux nouveaux participants"
              class="mt-2"
              hide-details
            />
            <div class="text-right mt-3">
              <v-btn
                outlined
                text
                :loading="loadingImport"
                @click="submitImport"
              >
                <v-icon left>
                  {{ mdiImport }}
                </v-icon>
                Importer
              </v-btn>
            </div>
          </v-form>
          <div
            v-if="importResults"
            class="mt-2"
          >
            <p class="font-weight-bold mb-2 text-decoration-underline">
              Résultat de l'import :
            </p>
            <p class="mb-1">
              Participants dans le fichier : <strong>{{ importResults.file_row_count }}</strong>
            </p>
            <p class="mb-1">
              Participants importé : <strong class="green--text">{{ importResults.created_count }}</strong>
            </p>
            <p>
              Participants déjà inscrit au contest : <strong class="blue--text">{{ importResults.already_imported_count }}</strong>
            </p>
            <div v-if="importResults.errors_count > 0">
              <p class="font-weight-bold mb-1 red--text">
                {{ importResults.errors_count }} erreurs de validation :
              </p>
              <ul>
                <li
                  v-for="(error, errorIndex) in importResults.errors"
                  :key="`error-index-${errorIndex}`"
                >
                  {{ error }}
                </li>
              </ul>
            </div>
            <div v-else>
              Aucune erreurs de d'import
            </div>
            <div class="text-right mt-3">
              <v-btn
                outlined
                text
                @click="importModal = false"
              >
                Fermer
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import {
  mdiDotsVertical,
  mdiPencil,
  mdiTrashCan,
  mdiMagnify,
  mdiWindowRestore,
  mdiExport,
  mdiImport,
  mdiQrcode,
  mdiAutoFix
} from '@mdi/js'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import ContestParticipant from '~/models/ContestParticipant'
import ContestParticipantForm from '~/components/contests/forms/ContestParticipantForm.vue'
import ContestParticipantCard from '~/components/contests/ContestParticipantCard.vue'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'
import ContestCategory from '~/models/ContestCategory'
import ContestWaveApi from '~/services/oblyk-api/ContestWaveApi'
import ContestWave from '~/models/ContestWave'
import { AppConcern } from '~/concerns/AppConcern'
import ToolApi from '~/services/oblyk-api/ToolApi'

export default {
  components: { ContestParticipantCard, ContestParticipantForm },
  mixins: [AppConcern],
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
      qrCodeModal: false,
      importModal: false,
      loadingParticipant: true,
      loadingQrCode: true,
      participantQrCode: null,
      selectedParticipantQrCode: null,
      loadingExport: false,
      participant: null,
      participantId: null,
      loadingParticipants: true,
      refreshKey: 0,
      participantFormKey: 0,
      participants: [],
      search: null,
      contestCategories: null,
      contestWaves: null,
      loadingImport: false,
      importFile: null,
      importResults: null,
      sendEmail: true,
      loadingImportTemplate: false,
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
      mdiWindowRestore,
      mdiExport,
      mdiImport,
      mdiQrcode,
      mdiAutoFix
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
    this.getWaves()
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

    getWaves () {
      new ContestWaveApi(this.$axios, this.$auth)
        .all(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          this.contestWaves = []
          for (const wave of resp.data) {
            this.contestWaves.push(new ContestWave({ attributes: wave }))
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
      this.participantFormKey += 1
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

    importTemplate () {
      this.loadingImportTemplate = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .importTemplate(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          const url = window.URL.createObjectURL(new Blob([resp.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `template-import-participant-${this.contest.slug_name}.csv`)
          document.body.appendChild(link)
          link.click()
        })
        .finally(() => {
          this.loadingImportTemplate = false
        })
    },

    submitImport () {
      this.loadingImport = true
      this.importResults = null
      const formData = new FormData()

      formData.append('contest_participant[file]', this.importFile)
      formData.append('contest_participant[send_email]', this.sendEmail)

      this.$axios.$request({
        method: 'POST',
        url: `${this.baseUrl}/gyms/${this.contest.gym.id}/contests/${this.contest.id}/contest_participants/import.json`,
        headers: {
          Authorization: this.$auth.$storage.getUniversal('_token.local'),
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then((resp) => {
          this.importResults = resp
          this.getParticipants()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        })
        .finally(() => {
          this.loadingImport = false
        })
    },

    closeModals () {
      this.editModal = false
      this.showModal = false
      this.addModal = false
      this.qrCodeModal = false
    },

    openQrCodeModal (participant) {
      this.selectedParticipantQrCode = participant
      this.qrCodeModal = true
      new ToolApi(this.$axios, this.$auth)
        .qrCoder({
          message: `${process.env.VUE_APP_OBLYK_APP_URL}${this.contest.path}?token=${participant.token}`
        })
        .then((resp) => {
          this.participantQrCode = resp.data
        })
        .finally(() => {
          this.loadingQrCode = false
        })
    }
  }
}
</script>

<style lang="scss">
.participant-qr-code-svg-container {
  width: 100%;
  overflow: hidden;
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
