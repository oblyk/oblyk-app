<template>
  <div
    class="back-border-color-grade"
    :style="`
    background-image: linear-gradient(${gradeValueToColor(cragRoute.grade_gap.max_grade_value)} 50%, ${gradeValueToColor(cragRoute.grade_gap.min_grade_value)} 50%);
    height: ${size}px;
    width: ${size}px;
    font-size: ${baseFontSize};
    padding: ${borderWidth}px;`"
  >
    <div class="content-border-color-grade">
      <div
        v-if="cragRoute.grade_gap.max_grade_value === cragRoute.grade_gap.min_grade_value"
        class="route-with-one-grade"
      >
        <strong>
          {{ cragRoute.grade_gap.max_grade_text }}
        </strong>
      </div>
      <div
        v-if="cragRoute.grade_gap.max_grade_value !== cragRoute.grade_gap.min_grade_value"
        class="route-with-tow-grade"
      >
        <div class="top-grade-container">
          <strong>
            {{ cragRoute.grade_gap.max_grade_text }}
          </strong>
        </div>
        <div class="bottom-grade-container">
          <strong>
            {{ cragRoute.grade_gap.min_grade_text }}
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'CragRouteAvatar',
  mixins: [GradeMixin],
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 47
    },
    baseFontSize: {
      type: String,
      default: '1em'
    },
    borderWidth: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style lang="scss">
.back-border-color-grade {
  display: inline-block;
  white-space: nowrap;
  border-radius: 50%;
  text-align: center;
  vertical-align: bottom;
  .content-border-color-grade {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    display: block;
    .route-with-one-grade {
      height: 100%;
      line-height: 2em;
      font-size: 1.25em;
    }
    .route-with-tow-grade {
      text-align: center;
      font-size: 0.9em;
      .top-grade-container {
        padding-top: 0.15em;
        line-height: 1.3em;
        border-bottom-style: solid;
        border-width: 1px;
      }
      .bottom-grade-container {
        line-height: 1.3em;
      }
    }
  }
}
.theme--light {
  .back-border-color-grade .content-border-color-grade {
    background-color: white;
    .route-with-tow-grade .top-grade-container {
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
}
.theme--dark {
  .back-border-color-grade .content-border-color-grade {
    background-color: rgb(30, 30, 30);
    .route-with-tow-grade .top-grade-container {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
