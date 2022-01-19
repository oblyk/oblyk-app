<template>
  <v-form @submit.prevent="submit()">
    <markdown-input
      v-model="data.body"
      :label="$t('models.comment.body')"
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
import CommentApi from '~/services/oblyk-api/CommentApi'
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'CommentForm',
  components: { MarkdownInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    comment: {
      type: Object,
      default: null
    },
    commentableType: {
      type: String,
      default: null
    },
    commentableId: {
      type: [Number, String],
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.comment || {}).id,
        body: (this.comment || {}).body,
        commentable_type: (this.comment || {}).commentable_type || this.commentableType || this.$route.params.commentableType,
        commentable_id: (this.comment || {}).commentable_id || this.commentableId || this.$route.params.commentableId
      }
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new CommentApi(this.$axios, this.$auth).update(this.data) : new CommentApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          if (this.callback) {
            this.callback()
          } else {
            this.$router.push(this.redirectTo)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'comment')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
