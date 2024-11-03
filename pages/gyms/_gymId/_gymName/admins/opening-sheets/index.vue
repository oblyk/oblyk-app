<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <v-sheet class="beta-background white--text font-weight-bold rounded pa-3 mb-2">
        <v-icon left color="white">
          {{ mdiFlask }}
        </v-icon>
        Fonction en cours de développement
      </v-sheet>
      <h1 class="mb-2">
        Les fiches d'ouvertures
      </h1>
      <div class="text-right mb-3">
        <v-btn
          v-if="!showArchive"
          text
          outlined
          @click="getArchives()"
        >
          <v-icon left>
            {{ mdiArchive }}
          </v-icon>
          Archives
        </v-btn>
        <v-btn
          v-if="showArchive"
          outlined
          text
          @click="closeArchives()"
        >
          Archives
          <v-icon right>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
        <v-btn
          v-if="!showArchive"
          elevation="0"
          :to="`${gym.adminPath}/opening-sheets/new`"
          color="primary"
        >
          <v-icon left>
            {{ mdiFilePlusOutline }}
          </v-icon>
          Nouvelle fiche
        </v-btn>
      </div>
      <v-skeleton-loader
        v-if="loadingSheets"
        type="list-item-two-line"
      />
      <v-list
        v-if="!loadingSheets && sheets.length > 0"
        rounded
      >
        <v-list-item
          v-for="(sheet, sheetIndex) in sheets"
          :key="`sheet-index-${sheetIndex}`"
        >
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="sheet.path">
                {{ sheet.title }} | {{ humanizeDate(sheet.history.created_at) }}
              </nuxt-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span v-if="sheet.archived_at">
                Archivé le {{ humanizeDate(sheet.archived_at) }} -
              </span>
              {{ sheet.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
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
                <v-list-item :to="`${sheet.path}/print`">
                  <v-list-item-icon>
                    <v-icon>{{ mdiPrinter }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ $t('actions.print') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteSheet(sheet)">
                  <v-list-item-icon>
                    <v-icon>{{ mdiTrashCan }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="red--text">
                    {{ $t('actions.delete') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="archiveSheet(sheet)">
                  <v-list-item-icon>
                    <v-icon>{{ mdiArchive }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="red--text">
                    {{ sheet.archived_at ? $t('actions.unArchive') : $t('actions.archive') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <p
        v-if="sheets.length === 0 && !loadingSheets"
        class="my-5 text-center text--disabled"
      >
        Vous n'avez pas encore de fiches d'ouvertures, cliquez sur (Nouvelle fiche) pour en créer une.
      </p>
    </div>
  </v-container>
</template>

<script>
import {
  mdiFlask,
  mdiDotsVertical,
  mdiTrashCan,
  mdiPrinter,
  mdiFilePlusOutline,
  mdiArchive,
  mdiClose
} from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { DateHelpers } from '~/mixins/DateHelpers'
import Spinner from '~/components/layouts/Spiner'
import GymOpeningSheetApi from '~/services/oblyk-api/GymOpeningSheetApi'
import GymOpeningSheet from '~/models/GymOpeningSheet'

export default {
  components: { Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, DateHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingSheets: false,
      sheets: [],
      showArchive: false,

      mdiFlask,
      mdiDotsVertical,
      mdiTrashCan,
      mdiPrinter,
      mdiFilePlusOutline,
      mdiArchive,
      mdiClose
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les fiches d'ouvertures"
      },
      en: {
        metaTitle: 'Opening sheets'
      }
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
          text: "Fiche d'ouvertures",
          to: `${this.gym?.adminPath}/opening-sheets`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getSheets()
  },

  methods: {
    getArchives () {
      this.showArchive = true
      this.sheets = []
      this.getSheets(true)
    },

    closeArchives () {
      this.showArchive = false
      this.sheets = []
      this.getSheets()
    },

    getSheets (archive = false) {
      this.loadingSheets = true
      new GymOpeningSheetApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId, archive)
        .then((resp) => {
          this.sheets = []
          for (const sheet of resp.data) {
            this.sheets.push(new GymOpeningSheet({ attributes: sheet }))
          }
        })
        .finally(() => {
          this.loadingSheets = false
        })
    },

    deleteSheet (sheet) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette fiche ?')) {
        this.loadingSheets = true
        new GymOpeningSheetApi(this.$axios, this.$auth)
          .delete(this.$route.params.gymId, sheet.id)
          .finally(() => {
            this.getSheets()
          })
      }
    },

    archiveSheet (sheet) {
      if (sheet.archived_at && confirm('Êtes-vous sûr de vouloir désarchiver cette fiche ?')) {
        this.loadingAction = true
        new GymOpeningSheetApi(this.$axios, this.$auth)
          .unArchived(this.$route.params.gymId, sheet.id)
          .finally(() => {
            this.getSheets(true)
          })
      } else if (confirm('Êtes-vous sûr de vouloir archiver cette fiche ?')) {
        this.loadingAction = true
        new GymOpeningSheetApi(this.$axios, this.$auth)
          .archived(this.$route.params.gymId, sheet.id)
          .finally(() => {
            this.getSheets()
          })
      }
    }
  }
}
</script>
