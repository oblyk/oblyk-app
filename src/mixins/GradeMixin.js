export const GradeMixin = {
  data () {
    return {
      gradeColorByValue: [
        'rgb(255,85,220)', 'rgb(246,68,211)', 'rgb(238,51,201)', 'rgb(229,34,190)', 'rgb(221,17,180)', 'rgb(212,0,170)',
        'rgb(134,205,222)', 'rgb(119,198,218)', 'rgb(103,191,213)', 'rgb(87,184,209)', 'rgb(71,178,204)', 'rgb(55,170,200)',
        'rgb(255,221,84)', 'rgb(252,215,68)', 'rgb(249,208,51)', 'rgb(246,202,34)', 'rgb(243,195,17)', 'rgb(240,189,0)',
        'rgb(255,127,42)', 'rgb(246,119,34)', 'rgb(238,110,25)', 'rgb(229,102,17)', 'rgb(221,93,8)', 'rgb(212,85,0)',
        'rgb(170,212,0)', 'rgb(156,195,0)', 'rgb(143,178,0)', 'rgb(129,161,0)', 'rgb(115,144,0)', 'rgb(102,128,0)',
        'rgb(0,85,212)', 'rgb(0,75,186)', 'rgb(0,64,161)', 'rgb(0,55,136)', 'rgb(0,44,110)', 'rgb(0,34,85)',
        'rgb(171,55,200)', 'rgb(157,51,184)', 'rgb(144,46,168)', 'rgb(130,42,152)', 'rgb(117,37,136)', 'rgb(103,33,120)',
        'rgb(255,59,59)', 'rgb(255,42,42)', 'rgb(221,25,25)', 'rgb(204,17,17)', 'rgb(187,8,8)', 'rgb(170,0,0)',
        'rgb(128,128,128)', 'rgb(102,102,102)', 'rgb(77,77,77)', 'rgb(51,51,51)', 'rgb(25,25,25)', 'rgb(0,0,0)'
      ]
    }
  },

  methods: {
    gradeToHtml: function (gradeValue, gradeText) {
      return `<span class="color-grade-span" style="border-bottom-color: ${this.gradeValueToColor(gradeValue)};">${gradeText}</span>`
    },

    gradeValueToColor: function (value) {
      return this.gradeColorByValue[value]
    }
  }
}
