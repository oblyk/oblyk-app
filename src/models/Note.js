export default class Note {
  constructor () {
    this.noteText = [
      'terrible',
      'ugly',
      'not_outstanding',
      'decent',
      'nice',
      'very_nice',
      'classic'
    ]
  }

  valueToText (value) {
    return this.noteText[value]
  }

  textToValue (value) {
    return this.noteText.indexOf(value)
  }
}
