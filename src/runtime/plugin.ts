import { consola } from 'consola'
import { BatchInterceptor } from '@mswjs/interceptors'
import { ClientRequestInterceptor } from '@mswjs/interceptors/ClientRequest'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import { FetchInterceptor } from '@mswjs/interceptors/fetch'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { disable, forceShowInProduction } = useRuntimeConfig().public.ssrApiLogger
  if (disable || (process.env.NODE_ENV === 'production' && !forceShowInProduction))
    return

  const interceptor = new BatchInterceptor({
    name: 'api-call-logger',
    interceptors: [
      new XMLHttpRequestInterceptor(),
      new ClientRequestInterceptor(),
      new FetchInterceptor(),
    ],
  })
  interceptor.apply()

  let callCounter = 0
  consola.start('Start SSR...')
  interceptor.on('request', ({ request }) => {
    const url = new URL(request.url)
    const isNuxtRequest = /^\/__/.test(url.pathname)
    if (isNuxtRequest) return
    consola.info(`API request: ${request.url}, ${new Date().toISOString()}`)
    callCounter++
  })

  nuxtApp.hook('app:rendered', () => {
    interceptor.dispose()
    consola.info(`${callCounter} request(s)`)
    consola.start('End SSR')
  })
})
