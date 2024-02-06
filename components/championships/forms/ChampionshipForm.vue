<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      class="required-field"
      :label="$t('models.championship.name')"
    />

    <markdown-input
      v-model="data.description"
      :label="$t('models.championship.description')"
    />

    <combined-ranking-type-input
      v-model="data.combined_ranking_type"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
      :go-back-btn="!isEditingForm()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '~/mixins/FormHelpers'
import CloseForm from '~/components/forms/CloseForm'
import MarkdownInput from '~/components/forms/MarkdownInput'
import SubmitForm from '~/components/forms/SubmitForm'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import Championship from '~/models/Championship'
import CombinedRankingTypeInput from '~/components/forms/CombinedRakingTypeInput.vue'

export default {
  name: 'ChampionshipForm',
  components: {
    CombinedRankingTypeInput,
    SubmitForm,
    MarkdownInput,
    CloseForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    championship: {
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
        id: this.championship?.id,
        name: this.championship?.name,
        description: this.championship?.description,
        combined_ranking_type: this.championship?.combined_ranking_type || 'addition',
        gym_id: this.championship?.gym_id || this.gym.id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ChampionshipApi(this.$axios, this.$auth).update(this.data) : new ChampionshipApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const championship = new Championship({ attributes: resp.data })
          if (this.callback) {
            this.callback(championship)
          } else {
            this.$router.push(championship.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contest')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
