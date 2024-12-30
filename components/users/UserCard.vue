<template>
  <div>
    <v-img
      dark
      gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
      :lazy-src="imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(user.attachments.banner, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(user.attachments.banner, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(user.attachments.banner, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
      :height="200"
      class="rounded align-end"
    >
      <div class="d-flex pa-4 align-center">
        <v-avatar
          size="48"
        >
          <v-img
            :src="imageVariant(user.attachments.avatar, { fit: 'crop', width: 100, height: 100 })"
            :alt="`logo ${user.full_name}`"
          />
        </v-avatar>
        <div class="ml-5">
          <p class="mb-0 font-weight-bold">
            {{ user.first_name }}
          </p>
          <p class="mb-0 mt-n1">
            <small>
              @{{ user.slug_name }}
            </small>
          </p>
        </div>
      </div>
    </v-img>
    <v-sheet
      v-if="user.description"
      class="back-app-color px-3 py-2 mt-3 rounded"
    >
      <markdown-text :text="user.description" />
    </v-sheet>
    <div class="text-right mt-3">
      <v-btn
        text
        outlined
        :to="user.path"
      >
        {{ $t('actions.see') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import MarkdownText from '~/components/ui/MarkdownText'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'UserCard',
  components: { MarkdownText },
  mixins: [ImageVariantHelpers],
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
