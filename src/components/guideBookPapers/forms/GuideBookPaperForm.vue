<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.guideBookPaper.name')"
    />

    <v-text-field
      outlined
      v-model="data.author"
      :label="$t('models.guideBookPaper.author')"
    />

    <v-text-field
      outlined
      v-model="data.editor"
      :label="$t('models.guideBookPaper.editor')"
    />

    <v-text-field
      outlined
      v-model="data.publication_year"
      type="number"
      :label="$t('models.guideBookPaper.publication_year')"
    />

    <v-text-field
      outlined
      v-model="price"
      type="number"
      append-icon="mdi-currency-eur"
      :label="$t('models.guideBookPaper.price_euro')"
    />

    <v-text-field
      outlined
      v-model="data.ean"
      :label="$t('models.guideBookPaper.ean')"
    />

    <v-text-field
      outlined
      v-model="data.number_of_page"
      type="number"
      append-icon="mdi-book-open-page-variant"
      :label="$t('models.guideBookPaper.number_of_page')"
    />

    <v-text-field
      outlined
      v-model="data.weight"
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
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import CloseForm from '@/components/forms/CloseForm'
import GuideBookPaper from '@/models/GuideBookPaper'

export default {
  name: 'GuideBookPaperForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    guideBookPaper: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      data: {
        id: (this.guideBookPaper || {}).id,
        name: (this.guideBookPaper || {}).name,
        author: (this.guideBookPaper || {}).author,
        editor: (this.guideBookPaper || {}).editor,
        publication_year: (this.guideBookPaper || {}).publication_year,
        price_cents: (this.guideBookPaper || {}).price_cents,
        ean: (this.guideBookPaper || {}).ean,
        number_of_page: (this.guideBookPaper || {}).number_of_page,
        weight: (this.guideBookPaper || {}).weight
      },
      price: (this.guideBookPaper || {}).price_cents && (this.guideBookPaper || {}).price_cents !== 0 ? (this.guideBookPaper || {}).price_cents / 100 : null
    }
  },

  watch: {
    price: function () {
      if (this.price) {
        console.log(this.price)
        this.data.price_cents = this.price * 100
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? GuideBookPaperApi.update(this.data) : GuideBookPaperApi.create(this.data)

      promise
        .then((resp) => {
          const guideBookPaper = new GuideBookPaper(resp.data)
          this.$router.push(guideBookPaper.path())
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
