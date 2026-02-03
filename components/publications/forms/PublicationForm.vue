<template>
  <div style="width: 450px; max-width: 100%">
    <v-tabs
      v-model="tab"
      style="border-radius: 10px 10px 0 0"
      active-class="deep-purple--text text--accent-4"
    >
      <v-tabs-slider color="#743ad5" />
      <v-tab>{{ $t('actions.write') }}</v-tab>
      <v-tab>
        <v-icon>
          {{ mdiEye }}
        </v-icon>
      </v-tab>
      <v-tab>
        <v-icon>
          {{ mdiScaleBalance }}
        </v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
      style="border-radius: 0 0 10px 10px"
    >
      <v-tab-item class="pa-4">
        <div class="mb-1 d-flex px-1">
          <v-chip
            v-if="isDraft"
            small
            color="amber"
            outlined
          >
            {{ $t('common.draft') }}
          </v-chip>
          <div class="ml-auto">
            <small class="text--disabled d-none d-sm-inline-block">
              {{ isNewPublication ? $t('components.publication.newMessage') : $t('common.updatedAt', { date: humanizeDate(lastSaveAt, 'DATETIME_MED') }) }}
            </small>
            <v-btn
              v-if="isDraft"
              :loading="loadingSaveDraft"
              :disabled="!haveChanges"
              x-small
              text
              outlined
              @click="saveDraft"
            >
              <v-icon left x-small>
                {{ mdiContentSave }}
              </v-icon>
              {{ $t('actions.save') }}
            </v-btn>
          </div>
        </div>
        <markdown-input
          v-model="data.body"
          :disabled="loadingSaveDraft"
          :hide-detail="false"
          persistent-hint
          :placeholder="$t(`components.publication.placeholder.${publishableType}`)"
          auto-grow
        />

        <!-- ATTACHEMENT LIST -->
        <publication-attachment-list-form
          v-if="editingPublication && editingPublication.publication_attachments.length > 0"
          class="mb-4"
          :editing-publication="editingPublication"
          :delete-attachment-callback="deleteAttachment"
        />

        <!-- ADD ATTACHMENTS BUTTON -->
        <div class="text-right">
          <v-btn
            :loading="waitAddAttachments"
            outlined
            small
            text
            @click="openAttachModal"
          >
            <v-icon left>
              {{ mdiPaperclipPlus }}
            </v-icon>
            {{ $t('actions.add') }} ...
          </v-btn>
        </div>
      </v-tab-item>
      <v-tab-item class="pa-4">
        <v-sheet class="py-2 px-4 rounded-sm back-app-color">
          <markdown-text :text="data.body" />
        </v-sheet>
      </v-tab-item>
      <v-tab-item class="pa-4">
        <h4 class="mb-2">
          {{ $t('components.publication.regulations.title') }}
        </h4>
        <p>
          {{ $t(`components.publication.regulations.intro.${publishableType}`) }}
        </p>
        <p>
          {{ $t('components.publication.regulations.body') }}
        </p>
        <p>
          {{ $t('components.publication.regulations.limitation', { count: publishableType === 'Gym' ? 2 : 1 }) }}
        </p>
        <p>
          {{ $t('components.publication.regulations.thanks') }}
        </p>
      </v-tab-item>
    </v-tabs-items>
    <div class="d-flex mt-4">
      <v-btn
        icon
        exact-path
        class="mr-auto"
        :to="backLink"
      >
        <v-icon>
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
      <v-btn
        v-if="isDraft"
        text
        :loading="loadingSaveDraft"
        @click="saveDraft"
      >
        {{ $t('actions.save') }}
      </v-btn>
      <v-btn
        v-if="isDraft"
        color="primary"
        elevation="0"
        :disabled="loadingSaveDraft || (data.body === null || data.body === '')"
        :loading="loadingPublish"
        @click="publish"
      >
        <v-icon left>
          {{ mdiSend }}
        </v-icon>
        {{ $t('actions.publish') }}
      </v-btn>
      <v-btn
        v-else
        color="primary"
        elevation="0"
        :disabled="loadingSaveDraft"
        :loading="loadingPublish"
        @click="saveDraft"
      >
        {{ $t('actions.edit') }}
      </v-btn>
    </div>

    <!-- ATTACHMENTS MODAL -->
    <publication-attachments-modal
      ref="publicationAttachmentsModal"
      :publishable="publishable"
      :publishable-type="publishableType"
      :publication="editingPublication"
      :add-attachments-callback="addAttachments"
    />
  </div>
</template>
<script>
import {
  mdiPaperclipPlus,
  mdiSend,
  mdiArrowLeft,
  mdiContentSave,
  mdiEye,
  mdiScaleBalance
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import MarkdownInput from '~/components/forms/MarkdownInput'
import MarkdownText from '~/components/ui/MarkdownText'
import PublicationAttachmentsModal from '~/components/publications/forms/PublicationAttachmentsModal'
import PublicationAttachmentListForm from '~/components/publications/forms/PublicationAttachmentListForm'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'PublicationForm',
  components: { PublicationAttachmentListForm, PublicationAttachmentsModal, MarkdownText, MarkdownInput },
  mixins: [DateHelpers],

  props: {
    publishable: {
      type: Object,
      required: true
    },
    publishableType: {
      type: String,
      required: true
    },
    publication: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      tab: 0,
      loadingSaveDraft: false,
      loadingPublish: false,
      waitAddAttachments: false,
      lastSaveAt: this.publication?.last_updated_at,
      editingPublication: this.publication,
      draft: true,
      lastBodyState: this.publication?.body || '',
      attachments: [],
      loadingAttachments: false,
      data: {
        id: this.publication?.id || null,
        body: this.publication?.body || '',
        publishable_type: this.publishableType,
        publishable_id: this.publishable.id
      },

      mdiPaperclipPlus,
      mdiSend,
      mdiArrowLeft,
      mdiContentSave,
      mdiEye,
      mdiScaleBalance
    }
  },

  computed: {
    isNewPublication () {
      return this.data.id === null || this.data.id === undefined
    },

    haveChanges () {
      return this.data.body !== this.lastBodyState
    },

    isDraft () {
      return this.data.id === null || this.editingPublication?.published_at === null
    },

    backLink () {
      if (this.publishableType === 'User') {
        return '/home'
      } else {
        return `${this.publishable.app_path}/publications`
      }
    }
  },

  methods: {
    openAttachModal () {
      if (this.data.id === null) {
        this.waitAddAttachments = true
        this.updateOrCreate().then(() => {
          setTimeout(() => {
            this.waitAddAttachments = false
            this.$refs.publicationAttachmentsModal.openModal()
          }, 300)
        })
      } else {
        this.$refs.publicationAttachmentsModal.openModal()
      }
    },

    saveDraft () {
      if (this.data.body === this.lastBodyState) {
        return
      } else {
        this.lastBodyState = this.data.body
      }
      this.updateOrCreate()
    },

    updateOrCreate () {
      return new Promise((resolve, reject) => {
        this.loadingSaveDraft = true
        const promise = this.isNewPublication
          ? new OblykApi(this.$axios, this.$auth).post('/publications', { publication: this.data })
          : new OblykApi(this.$axios, this.$auth).put(`/publications/${this.data.id}`, { publication: this.data })

        promise
          .then((resp) => {
            const publication = resp.data
            if (this.isNewPublication) {
              let url = ''
              if (this.publishableType === 'User') {
                url = `/home/publications/${publication.id}/edit`
              } else {
                url = `${publication.publishable.app_path}/publications/${publication.id}/edit`
              }
              window.history.replaceState({}, '', url.toString())
            }
            this.data.id = publication.id
            this.lastSaveAt = publication.last_updated_at
            this.editingPublication = publication
          })
          .finally(() => {
            this.loadingSaveDraft = false
            resolve()
          })
      })
    },

    publish () {
      this.loadingSaveDraft = true
      this.loadingPublish = true
      this.updateOrCreate()
        .then(() => {
          new OblykApi(this.$axios, this.$auth)
            .put(`/publications/${this.editingPublication.id}/publish`)
            .then(() => {
              this.$router.push(this.backLink)
            })
            .catch((err) => {
              this.$root.$emit('alertFromApiError', err, 'publication')
            })
            .finally(() => {
              this.loadingPublish = false
              this.loadingSaveDraft = false
            })
        })
    },

    addAttachments (attachments) {
      this.loadingSaveDraft = true
      new OblykApi(this.$axios, this.$auth)
        .post(
          `/publications/${this.editingPublication.id}/publication_attachments/create_bulk`,
          { publication_attachments: attachments }
        )
        .then((resp) => {
          this.editingPublication = resp.data
        })
        .finally(() => {
          this.loadingSaveDraft = false
        })
    },

    deleteAttachment (attachment) {
      this.loadingSaveDraft = true
      new OblykApi(this.$axios, this.$auth)
        .delete(`/publications/${this.editingPublication.id}/publication_attachments/${attachment.id}`)
        .then((resp) => {
          this.editingPublication = resp.data
        })
        .finally(() => {
          this.loadingSaveDraft = false
        })
    }
  }
}
</script>
