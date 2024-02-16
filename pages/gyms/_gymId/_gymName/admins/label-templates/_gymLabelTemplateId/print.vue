<template>
  <div class="labels-document">
    <div
      v-for="(page, pageIndex) in pages"
      :key="`page-index-${pageIndex}`"
      class="page"
      :class="preview ? 'preview' : ''"
    >
      <div class="page-container">
        <div class="label-row">
          <div class="label-grid">
            <gym-label-route
              v-for="(gymRoute, gymRouteIndex) in page.routes"
              :key="`gym-route-index-${gymRouteIndex}`"
              class="label-column"
              :class="gymLabelTemplate.label_direction"
              :gym="gym"
              :gym-route="gymRouteToObject(gymRoute)"
              :gym-label-template="gymLabelTemplate"
            />
          </div>
        </div>
        <div
          v-if="gymLabelTemplate && gymLabelTemplate.qr_code_position === 'footer'"
          class="footer"
        >
          <div>
            <p>
              Découvre le topo de <b>{{ gym.name }}</b><br> et suis ta progression sur Oblyk.org !
            </p>
            <div
              v-if="page.reference"
              class="footer-reference"
            >
              {{ page.reference }}
            </div>
          </div>
          <div
            class="footer-qr-code"
            v-html="page.footer_qrcode"
          />
        </div>
        <div
          v-if="gymLabelTemplate && gymLabelTemplate.qr_code_position !== 'footer' && page.reference"
          class="footer-reference-only"
        >
          {{ page.reference }}
        </div>
      </div>
    </div>

    <!-- Print Modal -->
    <div
      class="print-modal"
      :class="orientationFormatDialog ? '--open' : '--close'"
    >
      <div class="dialog-card">
        <div>
          <p class="card-title">
            Orientation de la page :
          </p>
          <label :class="pageOrientation === 'portrait' ? '--active' : ''">
            <input v-model="pageOrientation" type="radio" value="portrait" />
            <span class="icon-orientation --portrait" />
            {{ $t('models.gymLabelTemplate.page_direction_list.portrait') }}
          </label>
          <label :class="pageOrientation === 'landscape' ? '--active' : ''">
            <input v-model="pageOrientation" type="radio" value="landscape" />
            <span class="icon-orientation --landscape" />
            {{ $t('models.gymLabelTemplate.page_direction_list.landscape') }}
          </label>
        </div>
        <div class="margin-top">
          <p class="card-title">
            Format de la page :
          </p>
          <label :class="pageFormat === 'A3' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A3" />
            {{ $t('models.gymLabelTemplate.page_format_list.A3') }}
          </label>
          <label :class="pageFormat === 'A4' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A4" />
            {{ $t('models.gymLabelTemplate.page_format_list.A4') }}
          </label>
          <label :class="pageFormat === 'A5' ? '--active' : ''">
            <input v-model="pageFormat" type="radio" value="A5" />
            {{ $t('models.gymLabelTemplate.page_format_list.A5') }}
          </label>
        </div>
        <div class="card-actions">
          <button
            :disabled="pageFormat === null || pageOrientation === null"
            @click="closeDialogAndPrint()"
          >
            IMPRIMER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GymLabelTemplateApi from '~/services/oblyk-api/GymLabelTemplateApi'
import GymLabelTemplate from '~/models/GymLabelTemplate'
import GymRoute from '~/models/GymRoute'
import GymLabelRoute from '~/components/gymLabelTemplates/GymLabelRoute'
import Gym from '~/models/Gym'

export default {
  components: { GymLabelRoute },
  meta: { orphanRoute: true },
  layout: 'print',

  data () {
    return {
      gymLabelTemplate: null,
      loadingLabelTemplate: true,
      footerQrcode: null,
      reference: 'Réference',
      sectorId: null,
      routeIds: null,
      previewRoutesSet: null,
      orientationFormatDialog: false,
      pageFormat: null,
      pageOrientation: null,
      groupBy: null,
      pages: [],

      gymRoutes: [],
      gym: [],
      preview: false
    }
  },

  head () {
    const date = new Date()
    return {
      title: `Étiquette ${this.reference ? `- ${this.reference} ` : ''}- ${date.toISOString().split('T')[0]}`
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.preview = urlParams.get('preview') === 'true'
    this.reference = urlParams.get('reference')
    this.sectorId = urlParams.get('sector_id')
    this.routeIds = [...urlParams.getAll('route_ids[]')]
    this.previewRoutesSet = urlParams.get('preview_routes_set')
    this.groupBy = urlParams.get('group_by')

    this.getLabelTemplate()
  },

  methods: {
    getLabelTemplate () {
      this.loadingLabelTemplate = true
      const params = {}
      if (this.routeIds.length > 0) { params.route_ids = this.routeIds }
      if (this.sectorId) { params.sector_id = this.sectorId }
      if (this.previewRoutesSet) { params.preview_routes_set = this.previewRoutesSet }
      if (this.groupBy) { params.group_by = this.groupBy }
      if (this.reference) { params.reference = this.reference }

      new GymLabelTemplateApi(this.$axios, this.$auth)
        .print(
          this.$route.params.gymId,
          this.$route.params.gymLabelTemplateId,
          params
        )
        .then((resp) => {
          this.gymLabelTemplate = new GymLabelTemplate({ attributes: resp.data.gym_label_template })
          this.gym = new Gym({ attributes: resp.data.gym })
          this.pages = resp.data.pages
          this.initCss()
          if (!this.preview) {
            if (this.gymLabelTemplate.page_direction === 'free' || this.gymLabelTemplate.page_format === 'free') {
              this.pageOrientation = this.gymLabelTemplate.page_direction !== 'free' ? this.gymLabelTemplate.page_direction : null
              this.pageFormat = this.gymLabelTemplate.page_format !== 'free' ? this.gymLabelTemplate.page_format : null
              this.orientationFormatDialog = true
            } else {
              this.pageOrientation = this.gymLabelTemplate.page_direction
              this.pageFormat = this.gymLabelTemplate.page_format
              this.initPageOrientation()
              this.print()
            }
          }
        })
        .finally(() => {
          this.loadingLabelTemplate = false
        })
    },

    gymRouteToObject (route) {
      return new GymRoute({ attributes: route })
    },

    initCss () {
      // Add font
      const newLink = document.createElement('link')
      newLink.href = `https://fonts.googleapis.com/css2?family=${this.gymLabelTemplate.font.query}`
      newLink.rel = 'stylesheet'
      document.head.appendChild(newLink)

      // Add style
      const newStyle = document.createElement('style')
      newStyle.textContent = `
      .label-row .grade {
        font-family: ${this.gymLabelTemplate.font.name};
        font-size: ${this.gymLabelTemplate.font.size};
        line-height: ${this.gymLabelTemplate.font.line_height};
      }
      .footer {
        border-top-width: ${this.gymLabelTemplate.border_style['border-width']};
        border-top-color: ${this.gymLabelTemplate.border_style['border-color']};
      }
      @page {
        margin: ${this.gymLabelTemplate.layout_options['page-margin']} !important;
      }
      .label-row {
        align-items: ${this.gymLabelTemplate.layout_options['align-items'] || 'start'};
      }`
      document.head.appendChild(newStyle)

      // Set max height label row
      setTimeout(() => {
        const colNumber = {
          one_by_row: 1,
          two_by_row: 2,
          three_by_row: 3,
          four_by_row: 4
        }
        const pages = document.querySelectorAll('.page .label-row')
        for (const page of pages) {
          const labelRow = page.offsetHeight
          const rows = page.querySelectorAll('.label-column')
          for (const row of page.querySelectorAll('.label-column')) {
            row.style.maxHeight = `${labelRow / (rows.length / colNumber[this.gymLabelTemplate.label_direction]) - 11}px`
          }
        }
      }, 250)
    },

    initPageOrientation () {
      const newStyle = document.createElement('style')
      let pageHeight = null
      if (this.pageFormat === 'A3' && this.pageOrientation === 'portrait') {
        pageHeight = '419mm'
      } else if (
        (this.pageFormat === 'A3' && this.pageOrientation === 'landscape') ||
        (this.pageFormat === 'A4' && this.pageOrientation === 'portrait')
      ) {
        pageHeight = '296mm'
      } else if (
        (this.pageFormat === 'A4' && this.pageOrientation === 'landscape') ||
        (this.pageFormat === 'A5' && this.pageOrientation === 'portrait')
      ) {
        pageHeight = '209mm'
      } else if (
        this.pageFormat === 'A5' && this.pageOrientation === 'landscape'
      ) {
        pageHeight = '147mm'
      } else {
        pageHeight = '100vh'
      }
      newStyle.textContent = `
      @page {
        size: ${this.pageFormat} ${this.pageOrientation};
      }
      .page {
        height: calc(${pageHeight} - (${this.gymLabelTemplate.layout_options['page-margin']} * 2 + 2mm));
      }
      `
      document.head.appendChild(newStyle)
    },

    closeDialogAndPrint () {
      this.orientationFormatDialog = false
      this.initPageOrientation()
      this.print()
    },

    print () {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }
}
</script>

<style lang="scss">
body {
  font-size: 14pt;
  font-family: sans-serif;
}
.page {
  break-after: page;
  page-break-after: always;
  width: 100%;
  display: block;
  margin: 0 !important;
}
.page-container {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.preview {
  padding: 3mm;
  height: 100vh;
}
.no-break {
  page-break-inside: avoid;
  &:before {
    clear: both;
  }
}
.page-break {
  break-after: page;
  page-break-after: always;
}
.label-row {
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  .label-grid {
    max-height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 3mm;
    column-gap: 3mm;
  }
  .label-column {
    height: 102px;
  }
  .one_by_row {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .two_by_row {
    width: calc(1 / 2 * 100% - (1 - 1 / 2) * 3mm);
  }
  .three_by_row {
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 3mm);
  }
  .four_by_row {
    width: calc(1 / 4 * 100% - (1 - 1 / 4) * 3mm);
  }
}
.footer {
  width: 100%;
  text-align: right;
  border-top-style: solid;
  padding-top: 1.5mm;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 12pt;
  .footer-qr-code {
    box-sizing: border-box;
    height: 2cm;
    width: 2cm;
    margin-left: 5mm;
    svg {
      height: 100%;
      width: 100%;
    }
  }
  .footer-reference {
    font-size: 1.2em;
    margin-top: 2mm;
  }
}
.footer-reference-only {
  font-size: 1.2em;
  width: 100%;
  text-align: right;
}
.print-modal {
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  &.--close {
    display: none;
  }
  &.--open {
    display: flex;
    justify-content: center;
  }
  .dialog-card {
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    align-self: center;
    background-color: white;
    border-radius: 15px;
    min-width: 400px;
    height: auto;
    max-height: calc(100% - 20px);
    padding: 15px;
    .margin-top {
      margin-top: 25px;
    }
    .card-title {
      font-weight: bold;
      margin-bottom: 15px;
    }
    label {
      border-style: solid;
      border-radius: 7px;
      border-width: 1px;
      margin-right: 10px;
      padding: 7px 15px;
      cursor: pointer;
      border-color: rgb(200, 200, 200);
      .icon-orientation {
        display: inline-block;
        border-style: solid;
        border-width: 3px;
        border-radius: 1px;
        margin-right: 7px;
        border-color: rgb(100, 100, 100);
        &.--portrait {
          vertical-align: sub;
          height: 18px;
          width: 14px;
        }
        &.--landscape {
          vertical-align: baseline;
          margin-bottom: -1px;
          height: 14px;
          width: 18px;
        }
      }
      input {
        display: none;
      }
      &.--active {
        background-color: #c5ecd0;
        border-color: #afd9bb;
      }
    }
    .card-actions {
      margin-top: 25px;
      text-align: center;
      button {
        padding: 7px 15px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        background-color: #31994e;
        &[disabled] {
          background-color: #cacaca;
        }
      }
    }
  }
}
</style>
