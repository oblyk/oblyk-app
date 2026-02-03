<template>
  <div>
    <div
      v-for="(attachment, attachmentIndex) in editingPublication.publication_attachments"
      :key="`attachment-${attachmentIndex}`"
      style="position: relative; display: inline-block"
      class="mb-1 mr-1"
    >
      <crag-small-card
        v-if="attachment.attachable_type === 'Crag'"
        :crag="attachment.attachable"
        :subscribable="false"
        :linkable="false"
        bordered
        small
      />
      <crag-route-small-card
        v-if="attachment.attachable_type === 'CragRoute'"
        :crag-route="attachment.attachable"
        :linkable="false"
        bordered
      />
      <gym-small-card
        v-if="attachment.attachable_type === 'Gym'"
        :gym="attachment.attachable"
        :subscribable="false"
        :linkable="false"
        bordered
        small
      />
      <gym-route-list-item
        v-if="attachment.attachable_type === 'GymRoute'"
        :gym-route="attachment.attachable"
        bordered
        :click-callback="() => { return false }"
      />
      <gym-sector-card
        v-if="attachment.attachable_type === 'GymSector'"
        :gym-sector="attachment.attachable"
        bordered
      />
      <contest-item-list
        v-if="attachment.attachable_type === 'Contest'"
        :contest="attachment.attachable"
        bordered
        :callback="() => { return false }"
      />
      <gym-space-list-item
        v-if="attachment.attachable_type === 'GymSpace'"
        :gym-space="attachment.attachable"
        bordered
        :callback="() => { return false }"
      />
      <v-btn
        icon
        small
        style="position: absolute; top: 5px; right: 5px"
        class="back-app-color"
        @click="deleteAttachmentCallback(attachment)"
      >
        <v-icon small>
          {{ mdiCloseThick }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiCloseThick } from '@mdi/js'
import CragSmallCard from '~/components/crags/CragSmallCard'
import CragRouteSmallCard from '~/components/cragRoutes/CragRouteSmallCard'
import GymSmallCard from '~/components/gyms/GymSmallCard'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'
import GymSectorCard from '~/components/gymSectors/GymSectorCard'
import ContestItemList from '~/components/contests/ContestItemList'
import GymSpaceListItem from '~/components/gymSpaces/GymSpaceListItem'

export default {
  name: 'PublicationAttachmentListForm',
  components: {
    GymSpaceListItem,
    ContestItemList,
    GymSectorCard,
    GymRouteListItem,
    GymSmallCard,
    CragRouteSmallCard,
    CragSmallCard
  },
  props: {
    editingPublication: {
      type: Object,
      required: true
    },
    deleteAttachmentCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      mdiCloseThick
    }
  }
}
</script>
