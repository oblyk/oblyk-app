<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.guideBookPaper.name')"
    />

    <v-text-field
      v-model="data.author"
      outlined
      :label="$t('models.guideBookPaper.author')"
    />

    <v-text-field
      v-model="data.editor"
      outlined
      :label="$t('models.guideBookPaper.editor')"
    />

    <v-text-field
      v-model="data.publication_year"
      outlined
      type="number"
      :label="$t('models.guideBookPaper.publication_year')"
    />

    <funding-status-input v-model="data.funding_status" />

    <v-text-field
      v-model="price"
      outlined
      type="number"
      :append-icon="mdiCurrencyEur"
      :label="$t('models.guideBookPaper.price_euro')"
    />

    <v-text-field
      v-model="data.ean"
      outlined
      :label="$t('models.guideBookPaper.ean')"
    />

    <v-text-field
      v-model="data.number_of_page"
      outlined
      type="number"
      :append-icon="mdiBookOpenPageVariant"
      :label="$t('models.guideBookPaper.number_of_page')"
    />

    <v-text-field
      v-model="data.weight"
      outlined
      type="number"
      :label="$t('models.guideBookPaper.weight_in_gram')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiCurrencyEur, mdiBookOpenPageVariant } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import CloseForm from '@/components/forms/CloseForm'
import GuideBookPaper from '@/models/GuideBookPaper'
import FundingStatusInput from '@/components/forms/FundingStatusInput'

export default {
  name: 'GuideBookPaperForm',
  components: { FundingStatusInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    guideBookPaper: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.guideBookPaper?.id,
        name: this.guideBookPaper?.name,
        author: this.guideBookPaper?.author,
        editor: this.guideBookPaper?.editor,
        publication_year: this.guideBookPaper?.publication_year,
        funding_status: this.guideBookPaper?.funding_status,
        price_cents: this.guideBookPaper?.price_cents,
        ean: this.guideBookPaper?.ean,
        number_of_page: this.guideBookPaper?.number_of_page,
        weight: this.guideBookPaper?.weight,
        add_crag_id: null
      },
      price: this.guideBookPaper?.price_cents && this.guideBookPaper?.price_cents !== 0 ? this.guideBookPaper?.price_cents / 100 : null,

      mdiCurrencyEur,
      mdiBookOpenPageVariant
    }
  },

  watch: {
    price () {
      if (this.price) {
        this.data.price_cents = this.price * 100
      }
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const addCragId = urlParams.get('add_crag_id')
    if (addCragId) { this.data.add_crag_id = addCragId }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GuideBookPaperApi(this.$axios, this.$auth).update(this.data) : new GuideBookPaperApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const guideBookPaper = new GuideBookPaper({ attributes: resp.data })
          this.$router.push(guideBookPaper.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
