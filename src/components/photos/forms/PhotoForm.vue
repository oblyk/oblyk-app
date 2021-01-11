<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <v-file-input
      v-if="!isEditingForm()"
      v-model="file"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />

    <v-textarea
      outlined
      v-model="data.description"
      :label="$t('models.photo.description')"
    />

    <v-text-field
      outlined
      v-model="data.source"
      :label="$t('models.photo.source')"
    />

    <p class="caption">
      {{ $t('models.photo.licence') }}
    </p>
    <v-checkbox
      v-model="data.copyright_by"
      :label="$t('models.photo.copyright_by')"
    />

    <v-checkbox
      v-model="data.copyright_nc"
      :label="$t('models.photo.copyright_nc')"
    />

    <v-checkbox
      v-model="data.copyright_nd"
      :label="$t('models.photo.copyright_nd')"
    />

    <close-form />
    <submit-form :overlay="submitOverlay" />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import PhotoApi from '@/services/oblyk-api/photoApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'PhotoForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],

  props: {
    photo: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      file: null,
      redirectTo: '/',
      data: {
        id: (this.photo || {}).id,
        description: (this.photo || {}).description,
        source: (this.photo || {}).source,
        copyright_by: (this.photo || {}).copyright_by || true,
        copyright_nc: (this.photo || {}).copyright_nc || true,
        copyright_nd: (this.photo || {}).copyright_nd || true
      }
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()
      let promise

      if (this.isEditingForm()) {
        promise = PhotoApi.update(this.data)
      } else {
        formData.append('photo[illustrable_id]', this.$route.params.illustrableId)
        formData.append('photo[illustrable_type]', this.$route.params.illustrableType)
        formData.append('photo[description]', this.data.description)
        formData.append('photo[source]', this.data.source)
        formData.append('photo[copyright_by]', this.data.copyright_by)
        formData.append('photo[copyright_nc]', this.data.copyright_nc)
        formData.append('photo[copyright_nd]', this.data.copyright_nd)
        formData.append('photo[picture]', this.file)
        promise = PhotoApi.create(formData)
      }

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'photo')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
