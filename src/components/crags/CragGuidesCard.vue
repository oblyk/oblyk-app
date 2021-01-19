<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-bookshelf
      </v-icon>
      {{ $t('components.crag.tabs.guideBooks') }}
    </v-card-title>
    <v-card-text>
      <spinner
        class="mt-7"
        v-if="loadingGuides"
        :full-height="false"
      />
      <div
        class="guide-box-list"
        v-if="!loadingGuides"
      >
        <div
          class="guide-box"
          v-for="(guide, index) in guides"
          :key="`guide-${index}`"
        >
          <div
            v-if="guide.className === 'GuideBookPaper'"
          >
            <router-link
              :to="guide.path()"
            >
              <v-img
                height="200"
                contain
                :src="guide.coverUrl()"
              />
              <div class="text-truncate mt-1 text-center">
                {{ guide.name }}
              </div>
            </router-link>
          </div>

          <div v-else>
           <a :href="guide.url">
             <v-img
               height="200"
               contain
               :src="guide.coverUrl()"
             />
             <div class="text-truncate mt-1 text-center">
               {{ guide.name }}
             </div>
           </a>
          </div>
        </div>
        <p
          class="text-center mt-10"
          v-if="guides.length === 0"
        >
          {{ $t('components.crag.noGuide') }}<br>
          <add-guide-book-btn :crag="crag" />
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import CragApi from '@/services/oblyk-api/CragApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPdf from '@/models/GuideBookPdf'
import GuideBookWeb from '@/models/GuideBookWeb'
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'

export default {
  name: 'CragGuidesCard',
  components: { AddGuideBookBtn, Spinner },
  props: {
    crag: Object
  },

  data () {
    return {
      guides: [],
      loadingGuides: true
    }
  },

  mounted () {
    this.getGuides()
  },

  methods: {
    getGuides: function () {
      this.loadingGuides = true
      CragApi
        .guides(this.crag.id)
        .then(resp => {
          for (const guide of resp.data) {
            if (guide.guide_type === 'GuideBookPaper') this.guides.push(new GuideBookPaper(guide.guide))
            if (guide.guide_type === 'GuideBookPdf') this.guides.push(new GuideBookPdf(guide.guide))
            if (guide.guide_type === 'GuideBookWeb') this.guides.push(new GuideBookWeb(guide.guide))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        })
        .finally(() => {
          this.loadingGuides = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-box-list {
  white-space: nowrap;
  overflow-x: auto;
  .guide-box {
    margin-right: 15px;
    display: inline-block;
    height: 200px;
    width: 200px;
  }
}
</style>
