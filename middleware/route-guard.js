
export default function ({ $cookies, redirect, route, app, $toast }) {
  if (route.query.token) {
    $cookies.set('slate-token', route.query.token, {
      expires: new Date(Date.now() + 86400000), // 24 hours
    })
    $cookies.set('user-details', route.query.user)
  } else if (!$cookies.get('slate-token')) {
  // $toast({
  //   type: 'error',
  //   text: 'You must be logged in to access this page',
  // })
      redirect('https://slate-staging-bnt8w.ondigitalocean.app/auth/login?viewer=true')
    }
  }