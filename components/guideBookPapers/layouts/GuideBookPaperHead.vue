<template>
  <v-row class="mt-2 mb-2">
    <v-col class="pa-2 col-12 col-md-6 col-lg-7">
      <h1 class="mb-3 mt-2">
        {{ guideBookPaper.name }}
      </h1>
      <guide-book-paper-description :guide-book-paper="guideBookPaper" />
      <client-only>
        <div
          v-if="$auth.loggedIn"
          class="text-right mt-4"
        >
          <subscribe-btn
            subscribe-type="GuideBookPaper"
            :subscribe-id="guideBookPaper.id"
            :large="true"
            followed-color="deep-purple"
            :followed-icon="mdiBookshelf"
            :unfollowed-icon="mdiBookshelf"
            subscribe-label="actions.addToLibrary"
            unsubscribe-label="actions.removeFromLibrary"
          />
        </div>
      </client-only>
    </v-col>

    <!-- Cover -->
    <v-col class="pa-2 col-12 col-md-6 col-lg-5">
      <guide-book-paper-cover :guide-book-paper="guideBookPaper" />
    </v-col>
  </v-row>
</template>

<script>
import { mdiBookshelf } from '@mdi/js'
import GuideBookPaperDescription from '~/components/guideBookPapers/GuideBookPaperDescription'
import SubscribeBtn from '~/components/forms/SubscribeBtn'
import GuideBookPaperCover from '~/components/guideBookPapers/GuideBookPaperCover'

export default {
  name: 'GuideBookPaperHead',
  components: { GuideBookPaperCover, SubscribeBtn, GuideBookPaperDescription },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiBookshelf
    }
  }
}
</script>
