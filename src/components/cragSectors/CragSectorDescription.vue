<template>
  <v-simple-table class="no-hover-table">
    {{ cragSector.description }}
    <template v-slot:default>
      <tbody>
        <tr>
          <td colspan="2" class="text-right">
            <contributions-label
              version-type="cragSector"
              :version-id="cragSector.id"
              :versions-count="cragSector.versions_count"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import ContributionsLabel from '@/components/globals/ContributionsLable'
export default {
  name: 'CragSectorDescription',
  components: { ContributionsLabel },
  props: {
    cragSector: Object
  }
}
</script>
