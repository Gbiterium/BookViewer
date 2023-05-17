import qs from 'qs';
export default function ({ $axios, app, store, redirect, $toast }) {
  $axios.onRequest(config => {
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
    return config;
  });
  $axios.interceptors.request.use(
    (config) => {
      // const token = app.$cookies.get('publisher-token')
      const token = "Z1ZJOx2LUbwJyKsk4fpYkVlMTgkpxqNf9_y3hW63"
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // config.headers['Access-Control-Allow-Origin'] = '*'
      // config.headers['Allow'] = 'GET, HEAD, OPTIONS'
      return config
    },
    (error) => {
      Promise.reject(error)
    },
    $axios.onError((error) => {
      // store.commit('toggleRequestInProgress', false)
      // clearTimeout(networkTimeOut)
      // store.commit('toggleSlowNetwork', false)
  
      if (error.response && error.response.status === 401) {
        // store.dispatch('auth/logout')
        // redirect('/auth/login?redirect=true');
        if (process.client) {
          $toast({
            type: 'error',
            text: error.response.data.message,
          })
        }
  
  
        return Promise.reject(error)
      }
  
      if (error.response && error.response.status === 400) {
        if (process.client) {
          $toast({
            type: 'error',
            text: error.response.data.message,
          })
        }
  
        return Promise.reject(error)
      }
  
      if (error.response && error.response.status === 404) {
        if (process.client) {
          $toast({
            type: 'error',
            text: 'Not Found',
          })
        }
  
  
      } else if (error.response && error.response.data) {
        if (process.client) {
          $toast({
            type: 'error',
            text: (error.response.data.message) || 'Whoops Something Went Wrong',
          })
        }
  
      }
      else {
        if (process.client) {
          $toast({
            type: 'error',
            text: 'Whoops Something Went Wrong',
          })
        }
  
  
        return Promise.reject(error)
      }
  
      if (error.message) {
        if (process.client) {
          $toast({
            type: 'error',
            text: error.message,
          })
        }
  
        return Promise.reject(error)
      }
  
      if (process.client) {
        $toast({
          type: 'error',
          text: 'Whoops Something Went Wrong',
        })
      }
  
  
      return Promise.reject(error)
  
    })
  )
}
