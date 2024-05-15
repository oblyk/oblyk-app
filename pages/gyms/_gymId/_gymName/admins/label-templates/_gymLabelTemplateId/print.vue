<template>
  <div
    class="labels-document"
    :class="previewClass"
  >
    <div
      v-for="(page, pageIndex) in pages"
      :key="`page-index-${pageIndex}`"
      class="page"
      :class="preview ? 'preview' : ''"
    >
      <div class="page-container">
        <!-- Header -->
        <div
          v-if="gymLabelTemplate && gymLabelTemplate.header_options.display"
          class="header"
          :style="headerStyle()"
        >
          <!-- Header Left Part -->
          <div
            v-if="gymLabelTemplate.header_options.left.display || gymLabelTemplate.header_options.right.display"
            class="header-side-part"
            :style="`width: ${gymLabelTemplate.header_options.height}`"
          >
            <footer-header-side-part
              v-if="gymLabelTemplate.header_options.left.display"
              :logo-height="gymLabelTemplate.header_options.height"
              :qr-code="page.footer_qrcode"
              :gym="gym"
              :type="gymLabelTemplate.header_options.left.type"
            />
          </div>

          <!-- Header Center Part -->
          <div class="header-center">
            <div
              v-if="page.header_body"
              :style="headerCenterStyle()"
              v-html="page.header_body"
            />
          </div>

          <!-- Header Right Part -->
          <div
            v-if="gymLabelTemplate.header_options.left.display || gymLabelTemplate.header_options.right.display"
            class="header-side-part"
            :style="`width: ${gymLabelTemplate.header_options.height}`"
          >
            <footer-header-side-part
              v-if="gymLabelTemplate.header_options.right.display"
              :logo-height="gymLabelTemplate.header_options.height"
              :qr-code="page.footer_qrcode"
              :gym="gym"
              :type="gymLabelTemplate.header_options.right.type"
            />
          </div>
        </div>

        <div class="label-row">
          <div class="label-grid">
            <gym-label-route
              v-for="(gymRoute, gymRouteIndex) in page.routes"
              :key="`gym-route-index-${gymRouteIndex}`"
              class="label-column"
              :class="`${gymLabelTemplate.label_direction} qr_code_${gymLabelTemplate.qr_code_position}`"
              :gym="gym"
              :gym-route="gymRouteToObject(gymRoute)"
              :gym-label-template="gymLabelTemplate"
            />
          </div>
        </div>

        <!-- Footer -->
        <div
          v-if="gymLabelTemplate && gymLabelTemplate.footer_options.display"
          class="footer"
          :style="footerStyle()"
        >
          <!-- Footer Left Part -->
          <div
            v-if="gymLabelTemplate.footer_options.left.display || gymLabelTemplate.footer_options.right.display"
            class="footer-side-part"
            :style="`width: ${gymLabelTemplate.footer_options.height}`"
          >
            <footer-header-side-part
              v-if="gymLabelTemplate.footer_options.left.display"
              :logo-height="gymLabelTemplate.footer_options.height"
              :qr-code="page.footer_qrcode"
              :gym="gym"
              :type="gymLabelTemplate.footer_options.left.type"
            />
          </div>

          <!-- Footer Center Part -->
          <div class="footer-center">
            <div
              v-if="page.footer_body"
              class="footer-center-top-part"
              :style="footerPartsStyle('center_top')"
              v-html="page.footer_body"
            />
            <div
              v-if="page.reference"
              :style="footerPartsStyle('center_bottom')"
              class="footer-reference"
              v-html="page.reference"
            />
          </div>

          <!-- Footer Right Part -->
          <div
            v-if="gymLabelTemplate.footer_options.left.display || gymLabelTemplate.footer_options.right.display"
            class="footer-side-part"
            :style="`width: ${gymLabelTemplate.footer_options.height}`"
          >
            <footer-header-side-part
              v-if="gymLabelTemplate.footer_options.right.display"
              :logo-height="gymLabelTemplate.footer_options.height"
              :qr-code="page.footer_qrcode"
              :gym="gym"
              :type="gymLabelTemplate.footer_options.right.type"
            />
          </div>
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
import FooterHeaderSidePart from '~/components/gymLabelTemplates/FooterHeaderSidePart.vue'

export default {
  components: { FooterHeaderSidePart, GymLabelRoute },
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
      sortBy: 'grade',
      sortDirection: 'asc',
      routesByPage: 7,
      pages: [],
      previewClass: '',

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
    this.construction_line = urlParams.get('construction_line') === 'true'
    this.reference = urlParams.get('reference')
    this.sectorId = urlParams.get('sector_id')
    this.routeIds = [...urlParams.getAll('route_ids[]')]
    this.previewRoutesSet = urlParams.get('preview_routes_set')
    this.groupBy = urlParams.get('group_by')
    this.sortBy = urlParams.get('sort_by')
    this.sortDirection = urlParams.get('sort_direction')
    this.routesByPage = urlParams.get('routes_by_page')

    const previews = []
    if (this.construction_line) { previews.push('construction-line') }
    if (this.preview) { previews.push('labels-document-preview') }
    this.previewClass = previews.join(' ')

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
      if (this.sortBy) { params.sort_by = this.sortBy }
      if (this.sortDirection) { params.sort_direction = this.sortDirection }
      if (this.routesByPage) { params.routes_by_page = this.routesByPage }
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
              this.initPageOrientation()
            } else {
              this.initPageOrientation()
              this.print()
            }
          } else {
            this.initPageOrientation()
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
      // Add fonts
      for (const font of this.gymLabelTemplate.fonts) {
        const newLink = document.createElement('link')
        newLink.href = `https://fonts.googleapis.com/css2?family=${font.query}`
        newLink.rel = 'stylesheet'
        document.head.appendChild(newLink)
      }

      // Add style
      const newStyle = document.createElement('style')
      newStyle.textContent = `
      .label-row .grade {
        font-family: ${this.gymLabelTemplate.font.name};
        font-size: ${this.gymLabelTemplate.font.size};
        line-height: ${this.gymLabelTemplate.font.line_height};
      }
      @page {
        margin: ${this.gymLabelTemplate.layout_options.page_margin} !important;
      }
      .label-row {
        align-items: ${this.gymLabelTemplate.layout_options.align_items || 'start'};
      }
      .label-grid {
        row-gap: ${this.gymLabelTemplate.layout_options.row_gap || '3mm'};
        column-gap: ${this.gymLabelTemplate.layout_options.column_gap || '3mm'};
      }
      .rectangular_horizontal {
        height: ${this.gymLabelTemplate.label_options.rectangular_horizontal.height || '27mm'};
      }
      .rectangular_horizontal .qrcode, .rectangular_vertical .qrcode {
        width: ${this.gymLabelTemplate.label_options.rectangular_horizontal.height || '27mm'};
      }
      .rectangular_vertical .qrcode {
        width: ${this.gymLabelTemplate.label_options.rectangular_vertical.bottom.height || '27mm'};
      }
      .rectangular_vertical .information {
        height: ${this.gymLabelTemplate.label_options.rectangular_vertical.top.height || '27mm'};
      }
      .rectangular_vertical .grade {
        height: ${this.gymLabelTemplate.label_options.rectangular_vertical.bottom.height || '27mm'};
      }
      .label-row .two_by_row {
        width: calc(1 / 2 * 100% - (1 - 1 / 2) * ${this.gymLabelTemplate.layout_options.column_gap});
      }
      .label-row .three_by_row {
        width: calc(1 / 3 * 100% - (1 - 1 / 3) * ${this.gymLabelTemplate.layout_options.column_gap});
      }
      .label-row .four_by_row {
        width: calc(1 / 4 * 100% - (1 - 1 / 4) * ${this.gymLabelTemplate.layout_options.column_gap});
      }
      .label-row .label-grid {
         column-gap: calc(${this.gymLabelTemplate.layout_options.column_gap} - 1px);
      }
      `
      if (this.gymLabelTemplate.layout_options.align_items === 'end') {
        newStyle.textContent += `
        .footer {
          margin-top: ${this.gymLabelTemplate.layout_options.row_gap};
        }
        `
      }
      if (this.gymLabelTemplate.layout_options.align_items === 'start') {
        newStyle.textContent += `
        .header {
          margin-bottom: ${this.gymLabelTemplate.layout_options.row_gap};
        }
        `
      }
      if (this.preview) {
        newStyle.textContent += `
        .preview.page {
          padding: ${this.gymLabelTemplate.layout_options.page_margin} !important;
        }`
      }
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
          const maxHeight = `${labelRow / (rows.length / colNumber[this.gymLabelTemplate.label_direction]) - 11}px`
          for (const row of page.querySelectorAll('.label-column')) {
            row.style.maxHeight = maxHeight
          }
        }
      }, 250)
    },

    initPageOrientation () {
      this.pageOrientation = this.gymLabelTemplate.page_direction
      this.pageFormat = this.gymLabelTemplate.page_format
      const newStyle = document.createElement('style')
      let pageHeight = null
      let pageWidth = null

      // Page height
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

      // Page width for preview
      if ((this.pageFormat === 'A3' && this.pageOrientation === 'landscape')) {
        pageWidth = '419mm'
      } else if (
        (this.pageFormat === 'A3' && this.pageOrientation === 'portrait') ||
        (this.pageFormat === 'A4' && this.pageOrientation === 'landscape')
      ) {
        pageWidth = '296mm'
      } else if (
        (this.pageFormat === 'A4' && this.pageOrientation === 'portrait') ||
        (this.pageFormat === 'A5' && this.pageOrientation === 'landscape')
      ) {
        pageWidth = '209mm'
      } else if (
        (this.pageFormat === 'A5' && this.pageOrientation === 'portrait')
      ) {
        pageWidth = '147mm'
      } else {
        pageWidth = '100vw'
      }

      const pageMarginBottom = this.gymLabelTemplate.layout_options.page_margin.split(' ')[2]
      if (this.preview) {
        newStyle.textContent = `
        .page {
          height: ${pageHeight};
          width: ${pageWidth} !important;
        }
        `
      } else {
        newStyle.textContent = `
        @page {
          size: ${this.pageFormat} ${this.pageOrientation};
        }
        .page {
          height: calc(${pageHeight} - (${pageMarginBottom} * 2 + 2mm));
        }
        `
      }
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
    },

    footerPartsStyle (part) {
      const style = this.gymLabelTemplate.footer_options[part]
      return `font-size: ${style.font_size}; color: ${style.color}; text-align: ${style.text_align}`
    },

    footerStyle () {
      let marginX
      if (this.gymLabelTemplate.footer_options.margin_x) {
        marginX = `padding-left: ${this.gymLabelTemplate.footer_options.margin_x}; padding-right: ${this.gymLabelTemplate.footer_options.margin_x};`
      }
      return `height: ${this.gymLabelTemplate.footer_options.height}; ${marginX}`
    },

    headerCenterStyle () {
      const style = this.gymLabelTemplate.header_options.center
      let marginX
      if (this.gymLabelTemplate.header_options.margin_x) {
        marginX = `padding-left: ${this.gymLabelTemplate.header_options.margin_x}; padding-right: ${this.gymLabelTemplate.header_options.margin_x};`
      }
      return `font-size: ${style.font_size}; color: ${style.color}; text-align: ${style.text_align}; ${marginX}`
    },

    headerStyle () {
      let marginX
      if (this.gymLabelTemplate.header_options.margin_x) {
        marginX = `padding-left: ${this.gymLabelTemplate.header_options.margin_x}; padding-right: ${this.gymLabelTemplate.header_options.margin_x};`
      }
      return `height: ${this.gymLabelTemplate.header_options.height}; ${marginX}`
    }
  }
}
</script>

<style lang="scss">
body {
  font-size: 14pt;
  font-family: sans-serif;
}
.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.labels-document-preview {
  padding: 0.5em;
  background-color: #f0f0f5;
  min-height: 100vh;
  overflow: auto;
}
.construction-line {
  .page-container {
    border-width: 1px;
    border-color: blue;
    border-style: solid;
  }
  .footer, .footer-reference {
    border-top-width: 1px;
    border-top-color: blue;
    border-top-style: solid;
  }
  .header {
    border-bottom-width: 1px;
    border-bottom-color: blue;
    border-bottom-style: solid;
  }
  .footer-side-part, .header-side-part {
    border-left-width: 1px;
    border-left-color: blue;
    border-right-width: 1px;
    border-right-color: blue;
    border-left-style: solid;
    border-right-style: solid;
  }
  .visual-part {
    border-right-width: 1px;
    border-right-color: blue;
    border-right-style: solid;
  }
  .information, .qrcode {
    border-left-width: 1px;
    border-left-color: blue;
    border-left-style: solid;
  }
}
.preview {
  &.page {
    background-color: white;
    margin-left: auto !important;
    margin-right: auto !important;
    border: 1px solid #c7c7c7;
  }
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
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .one_by_row {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
.footer, .header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  strong {
    font-weight: bold;
  }
  .footer-center, .header-center {
    flex-grow: 1;
  }
  .footer-center {
    .footer-center-top-part, .footer-reference {
      padding-left: 2mm;
      padding-right: 2mm;
    }
  }
  .header-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .logo {
    object-fit: contain;
    border-radius: 5px;
  }
  .footer-side-part, .header-side-part {
    box-sizing: border-box;
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
