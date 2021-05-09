<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addWebGuideBook') }}
        </h2>
        <guide-book-web-form
          submit-methode="post"
          :crag-id="cragId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GuideBookWebForm from '@/components/guideBookWebs/forms/GuideBookWebForm'

export default {
  name: 'GuideBookWebNewView',
  components: { GuideBookWebForm },
  props: {
    cragId: [Number, String]
  },

  metaInfo () {
    return {
      title: this.$t('meta.guideBookWeb.new')
    }
  }
}
</script>
