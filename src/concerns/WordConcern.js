import Word from '@/models/Word'

export const WordConcern = {
  data () {
    return {
      word: null,
      loadingWord: true
    }
  },

  created () {
    if (this.$route.params.wordId) this.getWord()
  },

  methods: {
    getWord: function () {
      this.loadingWord = true
      new Word()
        .find(this.$route.params.wordId)
        .then((resp) => {
          this.word = resp
        })
        .catch((err) => {
          console.error(err)
        }).finally(() => {
          this.loadingWord = false
        })
    }
  }
}
