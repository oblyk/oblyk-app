<template>
  <v-row class="mt-2 mb-2">
    <v-col cols="12" class="pb-0">
      <h1 class="mt-md-2">
        {{ guideBookPaper.name }}
      </h1>
    </v-col>
    <v-col class="pa-2 col-12 col-md-6 col-lg-7">
      <div class="d-flex flex-column justify-space-between full-height">
        <div class="flex-grow-1">
          <guide-book-paper-description :guide-book-paper="guideBookPaper" />
        </div>
        <client-only>
          <div
            class="text-right mt-4 flex-grow-0"
          >
            <subscribe-btn
              v-if="$auth.loggedIn"
              subscribe-type="GuideBookPaper"
              :subscribe-id="guideBookPaper.id"
              :large="true"
              followed-color="deep-purple"
              :followed-icon="mdiBookshelf"
              :unfollowed-icon="mdiBookshelf"
              subscribe-label="actions.addToLibrary"
              unsubscribe-label="actions.removeFromLibrary"
              class="ml-3"
            />
          </div>
        </client-only>
      </div>
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
