import GlossaryView from '@/views/GlossaryView'
import WordNewView from '@/views/words/actions/WordNewView'
import WordEditView from '@/views/words/actions/WordEditView'
import WordView from '@/views/words/WordView'

export default [
  {
    path: '/glossary',
    component: GlossaryView
  },
  {
    path: '/words/:wordId/:wordSlug/infos',
    component: WordView
  },
  {
    path: '/words/new',
    component: WordNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/words/:wordId/:wordSlug/edit',
    component: WordEditView,
    meta: {
      requiresAuth: true
    }
  }
]
