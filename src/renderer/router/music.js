const routes = [{
  path: '/',
  name: 'discover',
  component: () => import('@/views/discover')
}, {
  path: '/playlist/:id',
  name: 'playlist',
  component: () => import('@/views/playlist')
}]

export default routes
