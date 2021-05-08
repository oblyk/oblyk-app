const GlossaryView = () => import(/* webpackChunkName: "word-routes" */ '@/views/GlossaryView')
const WordNewView = () => import(/* webpackChunkName: "word-routes" */ '@/views/words/actions/WordNewView')
const WordEditView = () => import(/* webpackChunkName: "word-routes" */ '@/views/words/actions/WordEditView')
const WordView = () => import(/* webpackChunkName: "word-routes" */ '@/views/words/WordView')

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
