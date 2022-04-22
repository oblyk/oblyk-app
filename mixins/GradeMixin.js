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
      ],
      gradeByValue: [
        '1a', '1a+', '1b', '1b+', '1c', '1c+',
        '2a', '2a+', '2b', '2b+', '2c', '2c+',
        '3a', '3a+', '3b', '3b+', '3c', '3c+',
        '4a', '4a+', '4b', '4b+', '4c', '4c+',
        '5a', '5a+', '5b', '5b+', '5c', '5c+',
        '6a', '6a+', '6b', '6b+', '6c', '6c+',
        '7a', '7a+', '7b', '7b+', '7c', '7c+',
        '8a', '8a+', '8b', '8b+', '8c', '8c+',
        '9a', '9a+', '9b', '9b+', '9c', '9c+'
      ]
    }
  },

  computed: {
    gradeWithoutWeightings () {
      const grades = []
      for (const index in this.gradeByValue) {
        if (index % 2 !== 0) { continue }
        grades.push({ text: this.gradeByValue[index], value: parseInt(index) + 1 })
      }
      return grades
    }
  },

  methods: {
    gradeToHtml (gradeValue, gradeText) {
      return `<span class="color-grade-span" style="border-bottom-color: ${this.gradeValueToColor(gradeValue)};">${gradeText}</span>`
    },

    gradeValueToColor (value, alpha = 1) {
      if (alpha === 1) {
        return this.gradeColorByValue[value - 1]
      } else {
        return this.gradeColorByValue[value - 1].replace('rgb', 'rgba').replace(')', `,${alpha})`)
      }
    },

    gradeValueToText (value) {
      return this.gradeByValue[value - 1]
    }
  }
}
