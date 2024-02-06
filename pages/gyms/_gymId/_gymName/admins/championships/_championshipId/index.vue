<template>
  <div>
    <div class="d-flex border-bottom mb-2 mt-5">
      <h2>
        Les contests
      </h2>
      <v-btn
        class="ml-auto"
        elevation="0"
        text
        @click="openAddContestModal()"
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        Lier un contest
      </v-btn>
    </div>
    <v-row v-if="!loadingContests && contests.length > 0">
      <v-col
        v-for="(contest, contestIndex) in contests"
        :key="`contest-index-${contestIndex}`"
        cols="12"
        md="6"
      >
        <v-sheet class="rounded">
          <contest-item-list :contest="contest" />
          <div class="text-right px-2 pb-2">
            <v-btn
              outlined
              text
              @click="deleteContest(contest)"
            >
              <v-icon left>
                {{ mdiTrashCan }}
              </v-icon>
              {{ $t('actions.remove') }}
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <p
      v-else
      class="text-center text--disabled my-5"
    >
      Vous n'avez pas encore lié de contest à votre championnat
    </p>
    <v-dialog
      v-model="addContestModal"
      width="500"
    >
      <v-card>
        <v-card-title>
          Ajouter un contest à {{ championship.name }}
        </v-card-title>
        <championship-add-contest-form
          ref="championshipAddContestFrom"
          :championship="championship"
          :gym="championship.Gym"
          :get-contests="getContests"
        />
      </v-card>
    </v-dialog>

    <!-- Championship categories -->
    <div v-if="contests.length > 0">
      <div class="mt-7 border-bottom mb-2 d-lg-flex">
        <h2>
          Correspondance entre les catégories
        </h2>
        <v-btn
          class="ml-auto"
          text
          elevation="0"
          @click="openChampionshipCategoryModal"
        >
          <v-icon left>
            {{ mdiLinkPlus }}
          </v-icon>
          Créer une correspondance
        </v-btn>
      </div>

      <div v-if="!loadingChampionshipCategories && championshipCategories.length > 0">
        <v-row>
          <v-col
            v-for="(category, categoryIndex) in championshipCategories"
            :key="`championship-category-${categoryIndex}`"
            cols="12"
            md="6"
          >
            <v-sheet class="pa-4 rounded">
              <p class="font-weight-bold mb-1">
                {{ category.name }}
              </p>
              <p class="text--disabled mb-2">
                Liste des catégories des contests correspondant à la catégorie <span class="text-decoration-underline">{{ category.name }}</span> de votre championnat.
              </p>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Salle</th>
                    <th>Contest</th>
                    <th>Catégorie</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(contestCategory, contestCategoryIndex) in category.contest_categories"
                  >
                    <tr :key="`contest-category-index-${contestCategoryIndex}`">
                      <td>
                        {{ contestCategory.gym.name }}
                      </td>
                      <td>
                        {{ contestCategory.contest.name }}
                      </td>
                      <td>
                        {{ contestCategory.name }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </v-simple-table>
              <div class="text-right">
                <v-btn
                  outlined
                  text
                  color="red"
                  @click="deleteCategory(category)"
                >
                  <v-icon left>
                    {{ mdiTrashCan }}
                  </v-icon>
                  {{ $t('actions.delete') }}
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      <p
        v-else
        class="text-center text--disabled my-5"
      >
        Vous n'avez pas encore construit vos correspondances de catégories
      </p>
      <v-dialog
        v-model="addChampionshipCategoryModal"
        width="500"
      >
        <v-card>
          <v-card-title>
            Correspondance de catégorie
          </v-card-title>
          <div class="px-4 pb-4">
            <championship-category-form
              ref="championshipCategoryFrom"
              :get-championship-categories="getChampionshipCategories"
              :championship="championship"
              :gym="championship.gym"
            />
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mdiTrashCan, mdiPlus, mdiLinkPlus, mdiPencil } from '@mdi/js'
import ChampionshipAddContestForm from '~/components/championships/forms/ChampionshipAddContestForm.vue'
import ContestItemList from '~/components/contests/ContestItemList.vue'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import Contest from '~/models/Contest'
import ChampionshipContestApi from '~/services/oblyk-api/ChampionshipContestApi'
import ChampionshipCategoryForm from '~/components/championships/forms/ChampionshipCategoryForm.vue'
import ChampionshipCategoryApi from '~/services/oblyk-api/ChampionshipCategoryApi'
import ChampionshipCategory from '~/models/ChampionshipCategory'

export default {
  components: {
    ChampionshipCategoryForm,
    ContestItemList,
    ChampionshipAddContestForm
  },
  meta: { orphanRoute: true },
  middleware: ['auth', 'gymAdmin'],
  props: {
    championship: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingContests: true,
      contests: [],
      addContestModal: false,

      championshipCategories: [],
      loadingChampionshipCategories: true,
      addChampionshipCategoryModal: false,

      mdiTrashCan,
      mdiPlus,
      mdiLinkPlus,
      mdiPencil
    }
  },

  mounted () {
    this.getContests()
  },

  methods: {
    openAddContestModal () {
      this.addContestModal = true
      setTimeout(() => {
        this.$refs.championshipAddContestFrom.getAvailableContests()
      }, 500)
    },

    openChampionshipCategoryModal () {
      this.addChampionshipCategoryModal = true
      setTimeout(() => {
        this.$refs.championshipCategoryFrom.getContestCategories()
      }, 500)
    },

    getContests () {
      this.loadingContests = true
      new ChampionshipApi(this.$axios, this.$auth)
        .contests(this.championship.gym_id, this.championship.id)
        .then((resp) => {
          this.contests = []
          for (const contest of resp.data) {
            this.contests.push(new Contest({ attributes: contest }))
          }
          this.getChampionshipCategories()
        })
        .finally(() => {
          this.addContestModal = false
          this.loadingContests = false
        })
    },

    getChampionshipCategories () {
      this.loadingChampionshipCategories = true
      new ChampionshipCategoryApi(this.$axios, this.$auth)
        .all(this.championship.gym_id, this.championship.id)
        .then((resp) => {
          this.championshipCategories = []
          for (const category of resp.data) {
            this.championshipCategories.push(new ChampionshipCategory({ attributes: category }))
          }
        })
        .finally(() => {
          this.addChampionshipCategoryModal = false
          this.loadingChampionshipCategories = false
        })
    },

    deleteContest (contest) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${contest.name} du championnat ?`)) {
        this.loadingContests = true
        new ChampionshipContestApi(this.$axios, this.$auth)
          .delete(
            this.championship.gym_id,
            this.championship.id,
            contest.id
          )
          .then(() => {
            this.getContests()
          })
      }
    },

    deleteCategory (category) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${category.name} du championnat ?`)) {
        this.loadingChampionshipCategories = true
        new ChampionshipCategoryApi(this.$axios, this.$auth)
          .delete(
            this.championship.gym_id,
            this.championship.id,
            category.id
          )
          .then(() => {
            this.getChampionshipCategories()
          })
      }
    }
  }
}
</script>
