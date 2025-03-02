import { consola } from 'consola'
import { BatchInterceptor } from '@mswjs/interceptors'
import { ClientRequestInterceptor } from '@mswjs/interceptors/ClientRequest'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import { FetchInterceptor } from '@mswjs/interceptors/fetch'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const interceptor = new BatchInterceptor({
    name: 'api-call-logger',
    interceptors: [
      new XMLHttpRequestInterceptor(),
      new ClientRequestInterceptor(),
      new FetchInterceptor(),
    ],
  })
  interceptor.apply()

  consola.start('Start call...')
  interceptor.on('request', ({ request }) => {
    // console.log(request)
    const url = new URL(request.url)
    const isNuxtRequest = /^\/__/.test(url.pathname)
    if (isNuxtRequest)
    // return

      consola.info(`SSR API request: ${request.url}, ${new Date().toISOString()}`)
  })

  nuxtApp.hook('app:rendered', () => {
    interceptor.dispose()
  })
})
