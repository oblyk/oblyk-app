<template>
  <v-card :loading="loading">
    <v-card-title class="border-bottom d-flex">
      <div>
        {{ judge?.name || '...' }}
      </div>
      <v-btn
        class="ml-auto"
        icon
        @click="closeCallback()"
      >
        <v-icon>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <!-- SHOW -->
    <div v-if="mode === 'show'">
      <v-card-text v-if="judge">
        <v-row>
          <v-col cols="12" md="8" class="d-flex flex-column">
            <div class="flex-shrink-0">
              <div>
                <strong>
                  Code :
                </strong>
                <v-chip class="pr-0">
                  {{ judge.code }}
                  <copy-btn
                    small
                    :message="judge.code"
                    class="ml-1"
                  />
                </v-chip>
              </div>
              <div class="mt-1 text-no-wrap">
                <strong>Lien vers l'interface du juge :</strong><br>
                <v-chip class="pr-0">
                  <a
                    :href="judgePath"
                    class="discrete-link text-truncate"
                    target="_blank"
                  >
                    {{ judgePath }}
                  </a>
                  <copy-btn
                    small
                    :message="judgePath"
                    class="ml-1"
                  />
                </v-chip>
              </div>
            </div>
            <v-sheet class="flex-grow-1 rounded back-app-color px-4 pt-2 pb-4 mt-2">
              <p class="mb-1">
                <strong>Aide :</strong><br>
                Partager le <u>lien</u> au juge, ou scanner le <u>QrCode</u> avec son téléphone pour qu'il puisse accéder à son interface.
              </p>
              <p class="mb-0">
                Il/elle aura besoin du <u>code</u> pour noter les résultats des participants.
              </p>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="4">
            <v-skeleton-loader
              v-if="loadingQrCode"
              type="image"
            />
            <div v-else>
              <div
                class="judge-qr-code-svg-container"
                v-html="judgeQrCode"
              />
              <p class="text-center text--disabled mb-0">
                QrCode vers l'interface
              </p>
            </div>
          </v-col>
        </v-row>
        <v-sheet class="pa-1 rounded back-app-color mt-2">
          <p class="text-decoration-underline mb-1 px-2">
            Lignes attachées au juge :
          </p>
          <v-data-table
            :items="items"
            :items-per-page="-1"
            :headers="headers"
            hide-default-footer
            no-data-text="Vous n'avez pas encore rattaché de ligne aux juges, allez les épreuves et étapes de votre contest pour rattacher des lignes à vos juges."
          >
            <template
              v-once
              #[`item.action`]="{ item }"
            >
              <v-btn
                icon
                small
                color="red"
                :disabled="deleting"
                @click="deleteRoute(item.id)"
              >
                <v-icon
                  color="red"
                  small
                >
                  {{ mdiTrashCan }}
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-sheet>
      </v-card-text>
      <v-card-actions v-if="mode === 'show'">
        <v-btn
          text
          outlined
          color="red"
          class="ml-auto"
          @click="deleteJudge(judge.id)"
        >
          <v-icon left>
            {{ mdiTrashCan }}
          </v-icon>
          {{ $t('actions.delete') }}
        </v-btn>
        <v-btn
          text
          outlined
          @click="mode = 'edit'"
        >
          {{ $t('actions.edit') }}
        </v-btn>
      </v-card-actions>
    </div>

    <!-- EDIT -->
    <div v-if="judge && mode === 'edit'">
      <v-card-text>
        <contest-judge-form
          v-if="!loading && judge"
          :contest="contest"
          :contest-judge="judge"
          :callback="editCallback"
          submit-methode="put"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          icon
          @click="mode = 'show'"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mdiClose, mdiTrashCan, mdiArrowLeft } from '@mdi/js'
import ContestJudgeApi from '~/services/oblyk-api/ContestJudgeApi'
import CopyBtn from '~/components/ui/CopyBtn'
import ContestJudgeForm from '~/components/contests/forms/ContestJudgeForm'
import ToolApi from '~/services/oblyk-api/ToolApi'

export default {
  name: 'ContestJudgeCard',
  components: { ContestJudgeForm, CopyBtn },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestJudgeId: {
      type: [Number, String],
      required: true
    },
    closeCallback: {
      type: Function,
      default: null
    },
    indexCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      mode: 'show',
      judge: null,
      loading: true,
      deleting: false,
      loadingQrCode: true,
      judgeQrCode: null,
      headers: [
        {
          text: 'Numéro',
          align: 'start',
          sortable: true,
          value: 'number'
        },
        {
          text: 'Étape',
          align: 'start',
          sortable: true,
          filtrable: false,
          value: 'step'
        },
        {
          text: 'Catégories',
          align: 'start',
          sortable: true,
          filtrable: false,
          value: 'categories'
        },
        {
          text: 'Genre',
          align: 'start',
          sortable: true,
          filtrable: false,
          value: 'gender'
        },
        {
          text: '',
          align: 'start',
          sortable: false,
          filtrable: false,
          value: 'action'
        }
      ],

      mdiClose,
      mdiTrashCan,
      mdiArrowLeft
    }
  },

  computed: {
    items () {
      const routes = []
      for (const route of this.judge.routes_table) {
        const stageName = route.contest_stage.name ? route.contest_stage.name : this.$t(`models.climbs.${route.contest_stage.climbing_type}`)
        routes.push(
          {
            id: route.id,
            number: route.number,
            step: `${stageName}/${route.contest_stage_step.name}`,
            categories: route.contest_categories.map(cat => cat?.name).join(', '),
            gender: this.$t(`models.genres.${route.contest_route_group.genre_type}`),
            action: null
          }
        )
      }
      return routes
    },

    judgePath () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}/contests/${this.contest.gym_id}/${this.contest.id}/${this.judge?.uuid}`
    }
  },

  watch: {
    contestJudgeId () {
      this.getContestJudge()
    }
  },

  mounted () {
    this.getContestJudge()
  },

  methods: {
    getContestJudge () {
      this.loading = true
      new ContestJudgeApi(this.$axios, this.$auth)
        .find(this.contest.gym_id, this.contest.id, this.contestJudgeId)
        .then((resp) => {
          this.judge = resp.data
          this.getJudgeQrCode()
        })
        .finally(() => {
          this.loading = false
        })
    },

    deleteJudge () {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce juge ? Il n'y a aucun retour possible")) {
        this.loadingJudges = true
        new ContestJudgeApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, this.contestJudgeId)
          .finally(() => {
            this.closeCallback()
            this.indexCallback()
          })
      }
    },

    editCallback () {
      this.getContestJudge()
      this.mode = 'show'
    },

    deleteRoute (routeId) {
      this.deleting = true
      new ContestJudgeApi(this.$axios, this.$auth)
        .deleteRoute(this.contest.gym_id, this.contest.id, this.judge.id, routeId)
        .finally(() => {
          this.getContestJudge()
          this.deleting = false
        })
    },

    getJudgeQrCode () {
      this.loadingQrCode = false
      new ToolApi(this.$axios, this.$auth)
        .qrCoder({
          message: this.judgePath
        })
        .then((resp) => {
          this.judgeQrCode = resp.data
        })
        .finally(() => {
          this.loadingQrCode = false
        })
    }
  }
}
</script>

<style lang="scss">
.judge-qr-code-svg-container {
  width: 100%;
  overflow: hidden;
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
