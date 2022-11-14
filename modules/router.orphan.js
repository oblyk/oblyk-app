export default function () {
  this.extendRoutes(routes =>
    routes.forEach((route) => {
      if (route.children) {
        // Add child route in root routes
        route.children.forEach((childRoute) => {
          if (childRoute.meta.orphanRoute) {
            childRoute.path = `${route.path}/${childRoute.path}`
            routes.push(childRoute)
          }
        })

        // Delete orphan route form children
        route.children = route.children.filter((child) => { return child.meta.orphanRoute !== true })
      }
    })
  )
}
