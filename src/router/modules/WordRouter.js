const GlossaryView = () => import(/* webpackChunkName: "word-routes" */ '@/views/GlossaryView')
const WordNewView = () => import(/* webpackChunkName: "word-routes" */ '@/views/words/actions/WordNewView')
const WordEditView = () => import(/* webpackChunkName: "word-routes" */ '@/views/words/actions/WordEditView')
const WordView = () => import(/* webpackChunkName: "word-routes" */ '@/views/words/WordView')

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
