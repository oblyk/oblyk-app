<template>
  <div>
    <v-skeleton-loader
      v-if="loadingContestCategories"
      type="list-item-avatar"
    />
    <div v-else>
      <v-alert
        type="info"
        text
      >
        Cocher les catégories similaires entre les différents contests
      </v-alert>
      <div
        v-for="(contest, contestIndex) in contests"
        :key="`contest-index-${contestIndex}`"
        class="mb-4"
      >
        <strong>{{ contest.name }}</strong> - {{ contest.gym.name }}
        <div
          v-for="(contestCategory, contestCategoryIndex) in contest.contest_categories"
          :key="`contest-category-${contestCategoryIndex}`"
          class="pl-2"
        >
          <v-checkbox
            v-model="categories"
            class="mt-0"
            :value="contestCategory.id"
            :label="contestCategory.name"
            :disabled="contestCategory.already_taken"
            hide-details
            @click="setName(contestCategory)"
          />
        </div>
      </div>
      <v-text-field
        v-model="name"
        class="mt-5"
        label="Nom de la catégorie"
        outlined
      />
      <div class="text-right">
        <v-btn
          color="primary"
          :loading="creating"
          @click="createCategory"
        >
          Créer
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Contest from '~/models/Contest'
import ChampionshipCategoryApi from '~/services/oblyk-api/ChampionshipCategoryApi'

export default {
  name: 'ChampionshipCategoryForm',
  props: {
    gym: {
      type: Object,
      required: true
    },

    championship: {
      type: Object,
      required: true
    },

    getChampionshipCategories: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      loadingContestCategories: true,
      contests: [],
      categories: [],
      creating: false,
      name: null
    }
  },

  methods: {
    getContestCategories () {
      this.loadingContestCategories = true
      new ChampionshipCategoryApi(this.$axios, this.$auth)
        .contestCategories(this.gym.id, this.championship.id)
        .then((resp) => {
          this.contests = []
          for (const contest of resp.data) {
            this.contests.push(new Contest({ attributes: contest }))
          }
        })
        .finally(() => {
          this.loadingContestCategories = false
        })
    },

    setName (category) {
      this.name ||= category.name
    },

    createCategory () {
      this.creating = true
      new ChampionshipCategoryApi(this.$axios, this.$auth)
        .create(
          this.championship.gym_id,
          this.championship.id,
          {
            name: this.name,
            contest_categories: this.categories
          }
        )
        .finally(() => {
          this.creating = false
          this.categories = []
          this.getChampionshipCategories()
        })
    }
  }
}
</script>
