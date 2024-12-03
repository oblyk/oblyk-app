<template>
  <v-input>
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-2 px-2">
      <legend class="v-label custom-fieldset-label">
        {{ $t('components.input.note') }}
      </legend>
      <div>
        <div class="d-flex">
          <div>
            <v-btn
              v-for="(star, noteIndex) in notes"
              :key="`note-index-${noteIndex}`"
              icon
              small
              :title="star.text"
              @click="click(star.value)"
            >
              <v-icon :color="note >= star.value && note !== null ? 'yellow darken-2' : null">
                {{ note >= star.value && note !== null ? mdiStar : mdiStarOutline }}
              </v-icon>
            </v-btn>
          </div>
          <div
            v-if="note !== null"
            class="ml-auto"
          >
            <v-btn
              icon
              small
              :title="$t('models.note.no_note')"
              @click="click(null)"
            >
              <v-icon>
                {{ mdiStarOffOutline }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <p class="mb-0 pt-1 pl-1 text--disabled font-italic">
          {{ label }}
        </p>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiStar, mdiStarOutline, mdiStarOffOutline } from '@mdi/js'
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'NoteInput',
  mixins: [InputHelpers],
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },

  data () {
    return {
      notes: [
        { text: this.$t('models.note.terrible'), value: 0 },
        { text: this.$t('models.note.ugly'), value: 1 },
        { text: this.$t('models.note.not_outstanding'), value: 2 },
        { text: this.$t('models.note.decent'), value: 3 },
        { text: this.$t('models.note.nice'), value: 4 },
        { text: this.$t('models.note.very_nice'), value: 5 },
        { text: this.$t('models.note.classic'), value: 6 }
      ],
      note: this.value,

      mdiStar,
      mdiStarOutline,
      mdiStarOffOutline
    }
  },

  computed: {
    label () {
      if (this.note === null) {
        return this.$t('models.note.no_note')
      } else {
        return this.notes.find((label) => { return label.value === this.note })?.text
      }
    }
  },

  methods: {
    click (note) {
      this.note = note
      this.onChange()
    },

    onChange () {
      this.$emit('input', this.note)
    }
  }
}
</script>
