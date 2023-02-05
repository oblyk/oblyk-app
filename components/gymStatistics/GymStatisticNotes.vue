<template>
  <v-sheet class="rounded pa-4 full-height">
    <h4 class="mb-4">
      <v-icon left>
        {{ mdiStar }}
      </v-icon>
      {{ $t('components.gymStatistic.notesTitle') }}
    </h4>
    <p
      v-if="loading"
      class="text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <v-simple-table>
        <tr
          v-for="(note, noteIndex) in notes"
          :key="`note-index-${noteIndex}`"
        >
          <td
            class="text-center"
            style="width: 70px"
          >
            <note
              :note="parseInt(noteIndex)"
              :color="colors[parseInt(noteIndex)]"
            />
          </td>
          <td>
            <div
              class="d-inline-block"
              :class="colors[parseInt(noteIndex)]"
              :style="`width: ${percent(note)}%; height: 0.5em`"
            />
          </td>
          <td style="width: 70px">
            {{ percent(note) }} %
          </td>
        </tr>
        <tr>
          <td
            colspan="2"
            class="text-right pr-3"
          >
            {{ $t('components.gymStatistic.noteSum') }} :
          </td>
          <td>
            <strong>
              {{ noteSum }}
            </strong>
          </td>
        </tr>
      </v-simple-table>
    </div>
  </v-sheet>
</template>

<script>
import { mdiStar } from '@mdi/js'
import GymRouteStatisticApi from '~/services/oblyk-api/GymRouteStatisticApi'
import Note from '~/components/notes/Note.vue'

export default {
  name: 'GymStatisticNotes',
  components: { Note },
  props: {
    gym: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: true,
      notes: {},
      colors: [
        'amber lighten-5',
        'amber lighten-4',
        'amber lighten-3',
        'amber lighten-2',
        'amber lighten-1',
        'amber',
        'amber darken-1'
      ],

      mdiStar
    }
  },

  computed: {
    noteSum () {
      let sum = 0
      for (const note in this.notes) {
        sum += parseInt(this.notes[note])
      }
      return sum
    }
  },

  watch: {
    filters: {
      handler () {
        this.getGrades()
      },
      deep: true
    }
  },

  mounted () {
    this.getGrades()
  },

  methods: {
    percent (note) {
      return this.noteSum !== 0 ? parseInt(note) / this.noteSum * 100 : 0
    },

    getGrades () {
      this.loading = true
      new GymRouteStatisticApi(this.$axios, this.$auth)
        .notes(this.gym.id, this.filters)
        .then((resp) => {
          this.notes = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
