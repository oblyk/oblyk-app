<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <link-list :linkable-id="crag.id" linkable-type="Crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LinkList from '@/components/links/LinkList'

export default {
  name: 'CragLinkView',
  components: { LinkList },
  props: {
    crag: Object
  }
}
</script>
