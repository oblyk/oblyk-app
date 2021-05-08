const MessengerView = () => import(/* webpackChunkName: "messenger-routes" */ '@/views/messengers/MessengerView')
const MessengerConversationView = () => import(/* webpackChunkName: "messenger-routes" */ '@/views/messengers/MessengerConversationView')
const MessengerConversationNewView = () => import(/* webpackChunkName: "messenger-routes" */ '@/views/messengers/actions/MessengerConversationNewView')

export default [
  {
    path: '/messenger/new',
    component: MessengerConversationNewView,
    meta: {
      requiresAuth: true,
      title: 'newConversation',
      showTitle: true
    }
  },
  {
    path: '/me/:userSlug/messenger',
    component: MessengerView,
    meta: {
      requiresAuth: true,
      title: 'messenger',
      showTitle: true
    },
    children: [
      {
        path: ':conversationId',
        component: MessengerConversationView,
        props: true,
        meta: {
          requiresAuth: true,
          title: 'messenger',
          showTitle: true
        }
      }
    ]
  }
]
