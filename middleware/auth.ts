import { $axios } from '~/utils/api'
import { ProxyRequestObject, ResponseObject } from 'Http'
import { nextTick } from 'vue/types/umd'

export default async function({ app, store, redirect, route }: any) {
  if (process.client) {
    const token = app.$cookies.get('accessToken')
    if (token) {
      try {
        const result: ResponseObject = await $axios.post('/auth/verify', {}, { headers: { Authorization: token }})
        if (Number(result.data.statusCode) !== 200) {
          redirect('/account')
        } else if (route.name === 'account') {
          redirect('/')
        } else {
          store.commit('auth/setUser', result.data.data)
        }
      } catch (e) {
        redirect('/account')
      }
    } else {
      if(route.name !== 'account') {
        redirect('/account')
      }
    }
  }
}
