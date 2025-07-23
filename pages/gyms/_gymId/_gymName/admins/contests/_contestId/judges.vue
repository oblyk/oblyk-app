<template>
  <div>
    <div class="text-right mt-2">
      <v-btn
        elevation="0"
        color="primary"
        @click="addJudgeModal = true"
      >
        Ajouter un juge
      </v-btn>
    </div>

    <!-- Add Modal -->
    <v-dialog
      v-model="addJudgeModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          Ajouter un juge
        </v-card-title>
        <div class="px-4 pb-4">
          <contest-judge-form
            v-if="contest"
            :contest="contest"
            :callback="formCallback"
            submit-methode="post"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Show judge -->
    <v-dialog
      v-model="showModal"
      width="700"
    >
      <contest-judge-card
        :contest="contest"
        :contest-judge-id="judgeId"
        :close-callback="closeJudgeModal"
        :index-callback="getJudges"
      />
    </v-dialog>

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
        :loading="loadingJudges"
        :headers="judgeHeaders"
        :items="judgeItems"
        :search="search"
      >
        <template #[`item.name`]="{ item }">
          <v-chip @click="showJudgeModal(item.id)">
            {{ item.name }}
          </v-chip>
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import { AppConcern } from '~/concerns/AppConcern'
import ContestJudgeApi from '~/services/oblyk-api/ContestJudgeApi'
import ContestJudgeForm from '~/components/contests/forms/ContestJudgeForm'
import ContestJudgeCard from '~/components/contests/ContestJudgeCard'

export default {
  components: { ContestJudgeCard, ContestJudgeForm },
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
      formMethode: 'post',
      addJudgeModal: false,
      showModal: false,
      judgeId: null,
      loadingJudges: true,
      refreshKey: 0,
      judgeFormKey: 0,
      judges: [],
      search: null,
      judgeHeaders: [
        {
          text: this.$t('models.contestJudge.name'),
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Code',
          align: 'start',
          sortable: true,
          filterable: false,
          value: 'code'
        },
        {
          text: 'Ligne attachées',
          align: 'start',
          sortable: true,
          filterable: false,
          value: 'contest_routes_length'
        }
      ],

      mdiMagnify
    }
  },

  computed: {
    judgeItems () {
      const refreshKey = this.refreshKey
      const judges = []
      for (const judge of this.judges) {
        judges.push({
          id: judge.id,
          name: judge.name,
          code: judge.code,
          contest_routes_length: judge.contest_routes.length,
          refreshKey
        })
      }
      return judges
    }
  },

  mounted () {
    this.getJudges()
  },

  methods: {
    getJudges () {
      this.loadingJudges = true
      new ContestJudgeApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.judges = []
          for (const judge of resp.data) {
            this.judges.push(judge)
          }
        })
        .finally(() => {
          this.loadingJudges = false
        })
    },

    showJudgeModal (judgeId) {
      this.judgeId = judgeId
      this.showModal = true
    },

    formCallback (judge) {
      this.addJudgeModal = false
      this.judges.push(judge)
    },

    closeJudgeModal () {
      this.showModal = false
    }
  }
}
</script>
