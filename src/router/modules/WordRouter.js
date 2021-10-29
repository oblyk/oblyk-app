const GlossaryView = () => import(/* webpackChunkName: "WordRouter-GlossaryView" */ '@/views/GlossaryView')
const WordNewView = () => import(/* webpackChunkName: "WordRouter-WordNewView" */ '@/views/words/actions/WordNewView')
const WordEditView = () => import(/* webpackChunkName: "WordRouter-WordEditView" */ '@/views/words/actions/WordEditView')
const WordView = () => import(/* webpackChunkName: "WordRouter-WordView" */ '@/views/words/WordView')

export default [
  {
    path: '/glossary',
    component: GlossaryView
  },
  {
    path: '/words/:wordId/:wordSlug',
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
