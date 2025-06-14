<template>
  <v-card class="full-height">
    <v-card-title>
      {{ contestCategory.name }}
      <v-spacer />
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
          <v-divider v-if="!haveParticipant" />
          <v-list-item
            v-if="!haveParticipant"
            @click="deleteCategory()"
          >
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
    </v-card-title>
    <v-card-subtitle>
      {{ contestCategory.contest_participants_count || 0 }} / {{ contestCategory.capacity || '∞' }} compétiteurs·ices<br>
      {{ $tc('models.contestCategory.contest_participants_female_count', contestCategory.contest_participants_female_count, { count: contestCategory.contest_participants_female_count }) }},
      {{ $tc('models.contestCategory.contest_participants_male_count', contestCategory.contest_participants_male_count, { count: contestCategory.contest_participants_male_count }) }}
    </v-card-subtitle>
    <v-card-text>
      <div
        v-if="contestCategory.description"
        class="border px-2 py-1 rounded-sm mb-2 mt-n2"
      >
        {{ contestCategory.description }}
      </div>
      <ul class="pl-3">
        <li v-if="contestCategory.unisex">
          Aucune distinction de genre
        </li>
        <li v-if="contestCategory.parity">
          Parité imposé
        </li>
        <li v-if="contestCategory.waveable">
          Divisé en vague
        </li>
        <li v-if="contestCategory.waveable">
          {{ contestCategory.auto_distribute ? 'Autodistribué' : 'Le participant choisi sa vague' }}
        </li>
        <li
          v-if="contestCategory.registration_obligation"
          v-html="minMaxAgeTitle"
        />
      </ul>
    </v-card-text>
    <v-dialog
      v-model="editModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ contestCategory.name }}
        </v-card-title>
        <div class="pa-4">
          <contest-category-form
            :gym="contest.Gym"
            :contest="contest"
            :contest-category="contestCategory"
            submit-methode="put"
            :callback="editCallback"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiPencil, mdiTrashCan } from '@mdi/js'
import ContestCategoryForm from '~/components/contests/forms/ContestCategoryForm.vue'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'

export default {
  name: 'ContestCategoryCard',
  components: { ContestCategoryForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestCategory: {
      type: Object,
      required: true
    },
    getCategories: {
      type: Function,
      required: true
    },
    showCategoryNameTips: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      editModal: false,
      loadingAction: false,

      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan
    }
  },

  computed: {
    haveParticipant () {
      return (this.contestCategory.conest_participants_count || 0) > 0
    },

    minMaxAgeTitle () {
      const category = this.contestCategory
      const obligation = category.registration_obligation
      const custom = obligation === 'between_age'
      if (custom && !category.min_age && category.max_age) {
        return `Les participants doivent avoir <strong>${category.max_age} ans ou moins</strong>`
      } else if (custom && category.min_age && !category.max_age) {
        return `Les participants doivent avoir <strong>${category.min_age} ans ou plus</strong>`
      } else if (custom && category.min_age && category.max_age) {
        return `Les participants doivent avoir <strong>entre ${category.min_age} et ${category.max_age} ans</strong>`
      } else if (!custom && obligation) {
        return this.$t(`models.contestCategoryObligationType.${obligation}`)
      } else {
        return 'Pas de restriction'
      }
    }
  },

  methods: {
    deleteCategory () {
      if (confirm('ếtes vous sûr de supprimer cette catégorie ?')) {
        this.loadingAction = true
        new ContestCategoryApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, this.contestCategory.id)
          .then(() => {
            this.getCategories()
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    editCallback () {
      this.getCategories()
      this.editModal = false
    }
  }
}
</script>
