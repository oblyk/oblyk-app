<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <link-list :linkable-id="guideBookPaperId" linkable-type="GuideBookPaper" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LinkList from '@/components/links/LinkList'

export default {
  name: 'GuideBookPaperLinkView',
  components: { LinkList },

  data () {
    return {
      guideBookPaperId: this.$route.params.guideBookPaperId
    }
  }
}
</script>
