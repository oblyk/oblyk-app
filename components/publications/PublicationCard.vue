<template>
  <v-sheet
    ref="publicationCard"
    class="mb-1 rounded pb-1"
    :class="bordered ? 'border' : null"
    max-width="430px"
  >
    <div class="px-2 pt-2">
      <!-- PUBLICATION TEXT -->
      <div class="d-flex">
        <div class="d-flex align-center">
          <v-badge
            :value="$auth.loggedIn && !publication.viewed && !publication.draft"
            color="red"
            dot
            overlap
          >
            <v-avatar
              size="28"
              class="mr-1"
              :tile="publication.publishable_type === 'GuideBookPaper'"
            >
              <v-img
                :src="imageVariant(publication.publishable.attachments.avatar, { fit: 'scale-down', width: 100, height: 100 })"
                :contain="publication.publishable_type === 'GuideBookPaper'"
              />
            </v-avatar>
          </v-badge>
          <div class="d-flex flex-column ml-2">
            <nuxt-link
              :to="publication.publishable.app_path"
              class="discrete-link"
              :class="publication.viewed ? null : 'font-weight-bold blue--text'"
            >
              {{ publication.publishable.name }}
            </nuxt-link>
            <div class="mt-n2">
              <small
                class="text--disabled"
                :title="humanizeDate(publication.published_at || publication.last_updated_at, 'DATETIME_MED')"
              >
                {{ dateFromNow(publication.published_at || publication.last_updated_at) }}
              </small>
              <small
                v-if="publication.publishable_type !== 'Gym' && publication.author !== null && (!publication.generated || publication.publishable_subject === 'new_photo')"
                class="text--disabled mt-n2"
              >
                {{ $t('common.by').toLowerCase() }} <nuxt-link :to="publication.author.app_path">{{ publication.author.name }}</nuxt-link>
              </small>
            </div>
          </div>
        </div>
        <div class="ml-auto">
          <v-menu>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                text
                :loading="loadingAction"
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
                :disabled="!published"
                @click.stop="share"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiShareVariant }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :class="copied ? 'green--text font-weight-bold' : null"
                  v-text="copied ? `${$t('common.copiedLink')} !` : $t('actions.share')"
                />
              </v-list-item>
              <v-list-item
                :disabled="!published"
                @click="openIframeModal"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiXml }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ $t('actions.addToMyWebsite') }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                :disabled="!published"
                :to="`/reports/Publication/${publication.id}/new?redirect_to=${$route.fullPath}`"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ mdiFlag }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ $t('actions.reportProblem') }}
                </v-list-item-content>
              </v-list-item>

              <!-- USER OR GYM ADMIN ZONE -->
              <div v-if="canEdit && !embed">
                <v-divider />
                <v-subheader>
                  {{ $t('common.edition') }}
                </v-subheader>
                <v-list-item :to="editLink">
                  <v-list-item-icon>
                    <v-icon>
                      {{ mdiPencil }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ $t('actions.edit') }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deletePublication">
                  <v-list-item-icon>
                    <v-icon color="red">
                      {{ mdiTrashCan }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="red--text">
                    {{ $t('actions.delete') }}
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-menu>
        </div>
      </div>

      <!-- PHOTO CONTENT -->
      <publication-attachment-photos :publication="publication" />

      <!-- VIDEO CONTENT -->
      <publication-attachment-videos :publication="publication" />

      <!-- TEXT CONTENT -->
      <div
        v-if="publication.body"
        class="py-1"
      >
        <markdown-text
          :text="publication.body"
          :truncate="500"
        />
      </div>

      <!-- GENERATED PUBLICATION -->
      <div v-if="publication.generated">
        <!-- ALERT IF IS GENERATED PUBLICATION -->
        <publication-card-alert
          v-if="publication.publishable_type !== 'Article' && publication.publishable_subject !== 'new_alert'"
          :publication="publication"
        />

        <!-- DESCRIPTION FOR ARTICLE -->
        <div v-if="publication.publishable_type === 'Article'">
          {{ publication.publishable.description }}
          <div class="text-right py-1">
            <v-btn
              :to="publication.publishable.app_path"
              outlined
              small
              text
            >
              {{ $t('actions.readMore') }}
            </v-btn>
          </div>
        </div>
      </div>

      <!-- ATTACHMENTS -->
      <div v-if="bottomAttachmentsCount">
        <publication-attachment-list
          v-if="!publication.generated || bottomAttachmentsCount <= 3 || showAttachments"
          :publication="publication"
          class="my-1"
        />
        <div
          v-else
          class="text-center mt-2"
        >
          <v-btn
            outlined
            text
            block
            @click="showAttachments = !showAttachments"
          >
            {{ $t('actions.see') }}
          </v-btn>
        </div>
      </div>

      <!-- DRAFT EDITION -->
      <div
        v-if="!published"
        class="pb-2"
      >
        <v-btn
          text
          block
          class="v-btn--active"
          color="amber"
          :to="editLink"
        >
          {{ $t('actions.editDraft') }}
        </v-btn>
        <p class="mb-0 py-1" style="line-height: 1em">
          <small class="text--disabled">
            {{ $t('components.publication.autoRemove') }}
          </small>
        </p>
      </div>
    </div>

    <!-- COMMENTS AND LIKES BTN -->
    <div
      v-if="published && !publication.generated"
      class="px-1 d-flex align-center"
    >
      <v-btn
        v-if="embed"
        :to="publication.app_path"
        text
      >
        {{ publication.likes_count || null }}
        <v-icon right>
          {{ mdiHeartOutline }}
        </v-icon>
      </v-btn>
      <like-btn
        v-else
        :likeable-id="publication.id"
        likeable-type="Publication"
        :small="false"
        icon-size="18"
        :initial-like-count="publication.likes_count || null"
      />
      <v-btn
        text
        :to="embed ? publication.app_path : null"
        @click="openComments"
      >
        {{ publication.comments_count || null }}
        <v-icon
          :class="publication.comments_count > 0 ? 'ml-2' : null"
          size="18"
        >
          {{ mdiCommentOutline }}
        </v-icon>
      </v-btn>
      <a
        v-if="embed"
        class="ml-auto mr-2 discrete-link"
        :href="embedHref"
      >
        <img
          src="/svg/logo-title-black.svg"
          alt="logo d'Oblyk"
          height="18"
        >
      </a>
    </div>

    <!-- COMMENTS -->
    <div
      v-if="showComments"
      class="border-top pb-2 publication-comment-part"
    >
      <comment-list
        :commentable-id="publication.id"
        commentable-type="Publication"
        m-top-no-comment="mt-4"
        add-comment-translate-key="actions.writeComment"
      />
    </div>

    <!-- SHARE MODALE -->
    <v-dialog
      v-model="iframeDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.addToMyWebsite') }}
        </v-card-title>
        <div class="px-4 pt-4">
          <v-textarea
            v-model="iframeCode"
            outlined
            hide-details
            :label="$t('common.iframeCodeToCopy')"
          />
        </div>
        <v-card-actions>
          <v-btn
            class="ml-auto"
            text
            @click="iframeDialog = false"
          >
            {{ $t('actions.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script>
import {
  mdiPencil,
  mdiTrashCan,
  mdiDotsVertical,
  mdiHeartOutline,
  mdiCommentOutline,
  mdiShareOutline,
  mdiContentCopy,
  mdiXml,
  mdiShareVariant,
  mdiFlag
} from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'
import MarkdownText from '~/components/ui/MarkdownText'
import CommentList from '~/components/comments/CommentList'
import LikeBtn from '~/components/forms/LikeBtn'
import PublicationAttachmentList from '~/components/publications/PublicationAttachmentList'
import PublicationCardAlert from '~/components/publications/PublicationCardAlert'
import PublicationAttachmentPhotos from '~/components/publications/PublicationAttachmentPhotos'
import PublicationAttachmentVideos from '~/components/publications/PublicationAttachmentVideos'

export default {
  name: 'PublicationCard',
  components: {
    PublicationAttachmentVideos,
    PublicationAttachmentPhotos,
    PublicationCardAlert,
    PublicationAttachmentList,
    LikeBtn,
    CommentList,
    MarkdownText
  },
  mixins: [DateHelpers, ImageVariantHelpers],
  props: {
    publication: {
      type: Object,
      required: true
    },
    deleteCallback: {
      type: Function,
      default: null
    },
    oblykLogo: {
      type: Boolean,
      default: false
    },
    embed: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loadingAction: false,
      gym: this.publication.gym,
      user: this.publication.user,
      showComments: false,
      iframeDialog: false,
      iframeCode: null,
      title: `Publication de ${this.publication.owner_name}`,
      url: `${process.env.VUE_APP_OBLYK_APP_URL}/publications/${this.publication.id}`,
      embedHref: `${process.env.VUE_APP_OBLYK_APP_URL}${this.publication.publishable.app_path}/publications`,
      copied: false,
      showAttachments: false,

      mdiPencil,
      mdiTrashCan,
      mdiDotsVertical,
      mdiHeartOutline,
      mdiCommentOutline,
      mdiShareOutline,
      mdiContentCopy,
      mdiXml,
      mdiShareVariant,
      mdiFlag
    }
  },

  computed: {
    published () {
      return this.publication.published_at !== null
    },

    canEdit () {
      if (!this.$auth.loggedIn) {
        return false
      }

      if (this.publication.publishable_type === 'Gym') {
        return this.$auth.user.administered_gyms.map(gym => gym.id).includes(this.publication.publishable_id)
      } else if (this.publication.author !== null) {
        return this.publication.author.uuid === this.$auth.user.uuid
      } else {
        return false
      }
    },

    editLink () {
      if (this.publication.publishable_type === 'User') {
        return `/home/publications/${this.publication.id}/edit`
      } else {
        return `${this.publication.publishable.app_path}/publications/${this.publication.id}/edit`
      }
    },

    bottomAttachmentsCount () {
      let count = 0
      for (const attachmentType in this.publication.attachable_types_count) {
        if (['Photo', 'Video'].includes(attachmentType)) {
          continue
        }
        count += this.publication.attachable_types_count[attachmentType]
      }
      return count
    }
  },

  methods: {
    deletePublication () {
      if (confirm('Êtes vous sûr de vouloir supprimer cette publication ?')) {
        this.loadingAction = true
        new OblykApi(this.$axios, this.$auth)
          .delete(`/publications/${this.publication.id}`)
          .then((resp) => {
            if (this.deleteCallback) {
              this.deleteCallback(resp.data)
            }
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    openComments () {
      this.showComments = !this.showComments
    },

    openIframeModal () {
      const card = this.$refs.publicationCard.$el
      const comments = card.querySelector('.publication-comment-part')
      const height = card.clientHeight - (comments?.clientHeight || 0)
      const iframe = document.createElement('iframe')
      iframe.src = `${process.env.VUE_APP_OBLYK_APP_URL}/embed/publications/${this.publication.id}`
      iframe.title = `Message posté sur Oblyk par ${this.publication.publishable.name}`
      iframe.width = '430'
      iframe.height = height.toString()
      iframe.loading = 'lazy'
      iframe.style = 'border: none;'
      this.iframeCode = iframe.outerHTML
      this.iframeDialog = true
    },

    share () {
      const title = this.title
      const url = this.url
      try {
        if (navigator.canShare({ title, url })) {
          navigator.share({ title, url })
        } else {
          this.copyToClipboard()
        }
      } catch (err) {
        this.copyToClipboard()
      }
    },

    copyToClipboard () {
      navigator
        .clipboard
        .writeText(this.url)
        .then(() => {
          this.copied = true
          setTimeout(() => { this.copied = false }, 2000)
        })
    }
  }
}
</script>
