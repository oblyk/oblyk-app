<template>
  <v-form @submit.prevent="submit()">
    <v-row>
      <v-col>
        <v-text-field
          v-model="data.name"
          outlined
          required
          :label="$t('models.article.name')"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="data.author_id"
          outlined
          required
          :label="$t('models.article.author_id')"
        />
      </v-col>
    </v-row>

    <v-textarea
      v-model="data.description"
      outlined
      :label="$t('models.article.description')"
    />

    <v-textarea
      v-model="data.body"
      outlined
      :rows="11"
      :label="$t('models.article.body')"
    />

    <!-- Helpers -->
    <div class="mb-5">
      <p class="font-weight-bold">
        {{ $t('components.article.helpers.title') }}
      </p>
      <ul>
        <li>
          <code>text-center</code> : {{ $t('components.article.helpers.textCenter') }} <copy-btn message="text-center" />
        </li>
        <li>
          <code>text--disabled</code> : {{ $t('components.article.helpers.textDisabled') }} <copy-btn message="text--disabled" />
        </li>
      </ul>
    </div>

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
import ArticleApi from '~/services/oblyk-api/ArticleApi'
import CloseForm from '@/components/forms/CloseForm'
import Article from '@/models/Article'
import CopyBtn from '@/components/ui/CopyBtn'

export default {
  name: 'ArticleForm',
  components: { CopyBtn, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    article: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.article || {}).id,
        name: (this.article || {}).name,
        author_id: (this.article || {}).author_id,
        description: (this.article || {}).description,
        body: (this.article || {}).body
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ArticleApi(this.$axios, this.$auth).update(this.data) : new ArticleApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.isEditingForm()) {
            this.$root.$emit('alertSimpleSuccess', this.$t('components.article.articleUpdate'))
          } else {
            const article = new Article({ attributes: resp.data })
            this.$router.push(article.path)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'article')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
