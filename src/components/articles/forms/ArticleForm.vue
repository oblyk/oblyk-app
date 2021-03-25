<template>
  <v-form @submit.prevent="submit()">
    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="data.name"
          required
          :label="$t('models.article.name')"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="data.author_id"
          required
          :label="$t('models.article.author_id')"
        />
      </v-col>
    </v-row>

    <v-textarea
      outlined
      v-model="data.description"
      :label="$t('models.article.description')"
    />

    <v-textarea
      outlined
      :rows="11"
      v-model="data.body"
      :label="$t('models.article.body')"
    />

    <!-- Helpers -->
    <div class="mb-5">
      <p class="font-weight-bold">{{ $t('components.article.helpers.title') }}</p>
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
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import CloseForm from '@/components/forms/CloseForm'
import Article from '@/models/Article'
import CopyBtn from '@/components/ui/CopyBtn'

export default {
  name: 'ArticleForm',
  components: { CopyBtn, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    article: Object
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
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? ArticleApi.update(this.data) : ArticleApi.create(this.data)

      promise
        .then(resp => {
          if (this.isEditingForm()) {
            this.$root.$emit('alertSimpleSuccess', this.$t('components.article.articleUpdate'))
          } else {
            const article = new Article(resp.data)
            this.$router.push(article.path())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'article')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
