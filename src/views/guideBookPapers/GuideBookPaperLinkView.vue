<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <link-list :linkable-id="guideBookPaper.id" linkable-type="GuideBookPaper" />
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
  props: {
    guideBookPaper: Object
  }
}
</script>
