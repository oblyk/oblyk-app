<template>
  <v-dialog
    v-model="noteModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="pl-0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <crag-route-note :route="cragRoute" />
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('components.note.votes') }}
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          {{ cragRoute.votes }}
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t('components.note.notes') }}
                </th>
                <th class="text-left">
                  {{ $t('components.note.noteCount') }}
                </th>
                <th class="text-left">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="note in notes"
                :key="note"
              >
                <td>
                  <note :note="parseInt(note)" />
                </td>
                <td>
                  {{ (cragRoute.votes.notes[note] || {}).count }}
                </td>
                <td>
                  <span v-if="(cragRoute.votes.notes[note] || {}).count">
                    {{ Math.round(cragRoute.votes.notes[note].count / cragRoute.note_count * 100) }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CragRouteNote from '@/components/cragRoutes/partial/CragRouteNote'
import Note from '@/components/notes/Note'

export default {
  name: 'CragRouteNoteModal',
  components: { Note, CragRouteNote },
  props: {
    cragRoute: Object
  },

  data () {
    return {
      noteModal: false,
      notes: ['6', '5', '4', '3', '2', '1', '0']
    }
  }
}
</script>
