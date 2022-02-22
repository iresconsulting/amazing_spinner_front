import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosInstance } from 'axios'

let $nuxtAxiosInstance: NuxtAxiosInstance
let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $nuxtAxiosInstance = axiosInstance
  $axios = $nuxtAxiosInstance.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    },
    baseURL: process.env.API_URL,
    timeout: 20000
  })
}

export { $axios }
