<template>
  <div class="border rounded px-2 pb-2">
    <!-- Sort by opened at -->
    <p class="mb-1" style="margin-top: -14px">
      <small class="font-weight-bold sheet-background-color d-inline-block px-1">
        {{ $t(`components.gymRoute.sorts.${column}`) }}
      </small>
    </p>
    <v-btn
      outlined
      text
      :title="$t(`components.gymRoute.sorts.opened_at`)"
      :icon="column !== 'opened_at'"
      :color="column === 'opened_at' ? 'primary' : null"
      :class="column === 'opened_at' ? 'v-btn--active' : null"
      @click="sorting('opened_at')"
    >
      <v-icon
        :left="column === 'opened_at'"
        :small="column !== 'opened_at'"
      >
        {{ mdiCalendar }}
      </v-icon>
      <v-icon
        v-if="column === 'opened_at'"
        small
      >
        {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
      </v-icon>
    </v-btn>

    <!-- Sort by sector -->
    <v-btn
      outlined
      text
      :title="$t(`components.gymRoute.sorts.sector`)"
      :icon="column !== 'sector'"
      :color="column === 'sector' ? 'primary' : null"
      :class="column === 'sector' ? 'v-btn--active' : null"
      @click="sorting('sector')"
    >
      <v-icon
        :left="column === 'sector'"
        :small="column !== 'sector'"
      >
        {{ mdiTextureBox }}
      </v-icon>
      <v-icon
        v-if="column === 'sector'"
        small
      >
        {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
      </v-icon>
    </v-btn>

    <!-- Sort by level -->
    <v-btn
      v-if="sortsAvailable.difficulty_by_level"
      outlined
      text
      :title="$t(`components.gymRoute.sorts.level`)"
      :icon="column !== 'level'"
      :color="column === 'level' ? 'primary' : null"
      :class="column === 'level' ? 'v-btn--active' : null"
      @click="sorting('level')"
    >
      <v-icon
        :left="column === 'level'"
        :small="column !== 'level'"
      >
        {{ mdiTag }}
      </v-icon>
      <v-icon
        v-if="column === 'level'"
        small
      >
        {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
      </v-icon>
    </v-btn>

    <!-- Sort by grade -->
    <v-btn
      v-if="sortsAvailable.difficulty_by_grade"
      outlined
      text
      :title="$t(`components.gymRoute.sorts.grade`)"
      :icon="column !== 'grade'"
      :color="column === 'grade' ? 'primary' : null"
      :class="column === 'grade' ? 'v-btn--active' : null"
      @click="sorting('grade')"
    >
      <v-icon
        :left="column === 'grade'"
        :small="column !== 'grade'"
      >
        {{ mdiSortNumericAscending }}
      </v-icon>
      <v-icon
        v-if="column === 'grade'"
        small
      >
        {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
      </v-icon>
    </v-btn>

    <!-- Sort by points -->
    <v-btn
      v-if="sortsAvailable.difficulty_by_point"
      outlined
      text
      :title="$t(`components.gymRoute.sorts.point`)"
      :icon="column !== 'point'"
      :color="column === 'point' ? 'primary' : null"
      :class="column === 'point' ? 'v-btn--active' : null"
      @click="sorting('point')"
    >
      <v-icon
        :left="column === 'point'"
      >
        {{ mdiAlphaP }}
      </v-icon>
      <v-icon
        v-if="column === 'point'"
        small
      >
        {{ direction === 'asc' ? mdiArrowDown : mdiArrowUp }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  mdiSortAscending,
  mdiCalendar,
  mdiArrowDown,
  mdiArrowUp,
  mdiTag,
  mdiTextureBox,
  mdiSortNumericAscending,
  mdiAlphaP
} from '@mdi/js'

export default {
  name: 'GymSpaceRouteSort',
  props: {
    value: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      default: null
    },
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      column: this.value.column,
      direction: this.value.direction,

      mdiSortAscending,
      mdiCalendar,
      mdiArrowDown,
      mdiArrowUp,
      mdiTag,
      mdiTextureBox,
      mdiSortNumericAscending,
      mdiAlphaP
    }
  },

  computed: {
    sortsAvailable () {
      return this.gymSpace ? this.gymSpace.sorts_available : this.gym.sorts_available
    }
  },

  watch: {
    value: {
      handler () {
        this.column = this.value.column
        this.direction = this.value.direction
      },
      deep: true
    }
  },

  methods: {
    sorting (column) {
      if (this.column === column) {
        this.direction = this.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.direction = column === 'sector' ? 'asc' : 'desc'
      }
      this.column = column
      this.$emit('input', { column: this.column, direction: this.direction })
    }
  }
}
</script>
