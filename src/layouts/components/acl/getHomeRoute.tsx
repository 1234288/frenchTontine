/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  else return '/french-tontine/dashboard' // '/dashboards/analytics'
}

export default getHomeRoute
