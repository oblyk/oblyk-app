import GlossaryView from '@/views/GlossaryView'
import WordNewView from '@/views/words/actions/WordNewView'
import WordEditView from '@/views/words/actions/WordEditView'
import WordView from '@/views/words/WordView'

export default [
  {
    path: '/glossary',
    component: GlossaryView,
    meta: {
      title: 'glossary',
      showTitle: false
    }
  },
  {
    path: '/words/:wordId/:wordSlug/infos',
    component: WordView,
    meta: {
      objectName: 'word'
    }
  },
  {
    path: '/words/new',
    component: WordNewView,
    meta: {
      requiresAuth: true,
      title: 'newWord',
      showTitle: false
    }
  },
  {
    path: '/words/:wordId/:wordSlug/edit',
    component: WordEditView,
    meta: {
      requiresAuth: true,
      objectName: 'word'
    }
  }
]
