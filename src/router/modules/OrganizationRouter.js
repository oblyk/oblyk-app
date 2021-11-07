const OrganizationNewView = () => import(/* webpackChunkName: "OrganizationRouter-OrganizationNewView" */ '@/views/organizations/actions/OrganizationNewView')
const OrganizationEditView = () => import(/* webpackChunkName: "OrganizationRouter-OrganizationEditView" */ '@/views/organizations/actions/OrganizationEditView')
const OrganizationView = () => import(/* webpackChunkName: "OrganizationRouter-OrganizationView" */ '@/views/OrganizationView')
const OrganizationInfoView = () => import(/* webpackChunkName: "OrganizationRouter-OrganizationView" */ '@/views/organizations/OrganizationInfoView')

export default [
  {
    path: '/organizations/new',
    component: OrganizationNewView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/organizations/:organizationId/:organizationSlug/edit',
    component: OrganizationEditView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/organizations/:organizationId/:organizationSlug',
    component: OrganizationView,
    props: true,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: OrganizationInfoView,
        meta: { requiresAuth: true }
      }
    ]
  }
]
