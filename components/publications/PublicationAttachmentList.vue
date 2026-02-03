<template>
  <div v-if="publication.attachables_count > 0">
    <div
      v-for="(attachment, attachmentIndex) in publication.publication_attachments"
      :key="`attachment-${attachmentIndex}`"
      class="mt-1"
    >
      <crag-small-card
        v-if="attachment.attachable_type === 'Crag'"
        :crag="attachment.attachable"
        linkable
        bordered
        small
      />
      <crag-route-small-card
        v-if="attachment.attachable_type === 'CragRoute'"
        :crag-route="attachment.attachable"
        bordered
      />
      <gym-small-card
        v-if="attachment.attachable_type === 'Gym'"
        :gym="attachment.attachable"
        bordered
        small
      />
      <gym-route-list-item
        v-if="attachment.attachable_type === 'GymRoute'"
        :gym-route="attachment.attachable"
        :relative-path="false"
        bordered
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
      />
      <gym-space-list-item
        v-if="attachment.attachable_type === 'GymSpace'"
        :gym-space="attachment.attachable"
        bordered
      />
      <alert-card
        v-if="attachment.attachable_type === 'Alert'"
        :alert="attachment.attachable"
      />
      <guide-book-web-list-item
        v-if="attachment.attachable_type === 'GuideBookWeb'"
        :guide-book-web="attachment.attachable"
        bordered
      />
      <guide-book-pdf-list-item
        v-if="attachment.attachable_type === 'GuideBookPdf'"
        :guide-book-pdf="attachment.attachable"
        bordered
      />
    </div>
  </div>
</template>

<script>
import CragSmallCard from '~/components/crags/CragSmallCard'
import CragRouteSmallCard from '~/components/cragRoutes/CragRouteSmallCard'
import GymSmallCard from '~/components/gyms/GymSmallCard'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'
import GymSectorCard from '~/components/gymSectors/GymSectorCard'
import ContestItemList from '~/components/contests/ContestItemList'
import GymSpaceListItem from '~/components/gymSpaces/GymSpaceListItem'
import AlertCard from '~/components/alerts/AlertCard'
import GuideBookWebListItem from '~/components/guideBookWebs/GuideBookWebListItem'
import GuideBookPdfListItem from '~/components/guideBookPdfs/GuideBookPdfListItem'

export default {
  name: 'PublicationAttachmentList',
  components: {
    GuideBookPdfListItem,
    GuideBookWebListItem,
    AlertCard,
    GymSpaceListItem,
    ContestItemList,
    GymSectorCard,
    GymRouteListItem,
    GymSmallCard,
    CragRouteSmallCard,
    CragSmallCard
  },
  props: {
    publication: {
      type: Object,
      required: true
    }
  }
}
</script>
