<template>
  <v-form @submit.prevent="submit()">
    <v-row no-gutters>
      <v-col
        v-if="isEditingForm()"
        class="pr-4"
        cols="5"
        lg="3"
      >
        <v-text-field
          v-model="data.order"
          type="number"
          outlined
          :label="$t('models.contestCategory.order')"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="data.name"
          outlined
          required
          class="required-field"
          :label="$t('models.contestCategory.name')"
        />
      </v-col>
    </v-row>

    <v-alert
      v-if="showNameAlert"
      text
      type="info"
      class="mt-n4 mb-7"
    >
      Ne faite pas une catégorie "Homme" ou "Femme", vous aurez deux classements suivant le genre des participant·e·s.
    </v-alert>

    <v-textarea
      v-model="data.description"
      outlined
      rows="3"
      persistent-placeholder
      :placeholder="$t('models.contestCategory.descriptionPlaceholder')"
      :label="$t('models.contestCategory.description')"
    />

    <v-text-field
      v-model="data.capacity"
      type="number"
      outlined
      :label="$t('models.contestCategory.capacity')"
    />

    <contest-category-obligation-input
      v-model="data.registration_obligation"
      :label="$t('models.contestCategory.registrationObligation')"
      hide-details
    />

    <div
      v-if="data.registration_obligation === 'between_age'"
      class="mt-7"
    >
      <v-row class="mb-1">
        <v-col cols="6">
          <v-text-field
            v-model="data.min_age"
            type="number"
            outlined
            clearable
            hide-details
            :label="$t('models.contestCategory.minAge')"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="data.max_age"
            type="number"
            outlined
            clearable
            hide-details
            :label="$t('models.contestCategory.maxAge')"
          />
        </v-col>
      </v-row>
      <p
        v-if="data.min_age || data.max_age"
        v-html="minMaxAgeTitle"
      />
    </div>

    <v-checkbox
      v-model="data.unisex"
      hide-details
      :label="$t('models.contestCategory.unisex')"
    />

    <v-checkbox
      v-model="data.waveable"
      hide-details
      :label="$t('models.contestCategory.waveable')"
    />

    <v-checkbox
      v-model="data.auto_distribute"
      :disabled="!data.waveable"
      :label="$t('models.contestCategory.auto_distribute')"
    />

    <submit-form
      :go-back-btn="false"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import SubmitForm from '~/components/forms/SubmitForm'
import { FormHelpers } from '~/mixins/FormHelpers'
import ContestCategoryApi from '~/services/oblyk-api/ContestCategoryApi'
import ContestCategory from '~/models/ContestCategory'
import ContestCategoryObligationInput from '~/components/forms/ContestCategoryObligationInput.vue'

export default {
  name: 'ContestCategoryForm',
  components: {
    ContestCategoryObligationInput,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    contest: {
      type: Object,
      required: true
    },
    contestCategory: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.contestCategory?.id,
        name: this.contestCategory?.name,
        description: this.contestCategory?.description,
        capacity: this.contestCategory?.capacity,
        unisex: this.contestCategory?.unisex,
        auto_distribute: this.contestCategory?.auto_distribute,
        waveable: this.contestCategory?.waveable,
        registration_obligation: this.contestCategory?.registration_obligation,
        min_age: this.contestCategory?.min_age,
        max_age: this.contestCategory?.max_age,
        order: this.contestCategory?.order,
        gym_id: this.gym.id,
        contest_id: this.contest.id
      }
    }
  },

  computed: {
    minMaxAgeTitle () {
      if (!this.data.min_age && this.data.max_age) {
        return `👉 Le participant doit avoir <strong>${this.data.max_age} ans ou moins</strong> pour s'inscrire en ${this.data.name}`
      } else if (this.data.min_age && !this.data.max_age) {
        return `👉 Le participant doit avoir <strong>${this.data.min_age} ans ou plus</strong> pour s'inscrire en ${this.data.name}`
      } else {
        return `👉 Le participant doit avoir <strong>entre ${this.data.min_age} et ${this.data.max_age} ans</strong> pour s'inscrire en ${this.data.name}`
      }
    },

    showNameAlert () {
      if (!this.data.name) {
        return false
      }
      return this.data.name.toLowerCase().includes('homme') || this.data.name.toLowerCase().includes('femme')
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestCategoryApi(this.$axios, this.$auth).update(this.data) : new ContestCategoryApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const contestCategory = new ContestCategory({ attributes: resp.data })
          if (this.callback) {
            this.callback(contestCategory)
          } else {
            this.$router.push(contestCategory.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ContestCategory')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
