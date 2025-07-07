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
  consola.start('Start...')
  const startTime = Date.now()
  interceptor.on('request', ({ request }) => {
    const url = new URL(request.url)
    const isNuxtRequest = /^\/__/.test(url.pathname)
    if (isNuxtRequest) return

    const isoTime = new Date().toISOString()
    const formattedTime = isoTime.slice(11, 23)

    consola.info(`${formattedTime} ${request.method} ${request.url}`)
    callCounter++
  })

  nuxtApp.hook('app:rendered', () => {
    interceptor.dispose()
    if (callCounter) {
      const endTime = Date.now()
      const totalTime = endTime - startTime
      const avgTime = totalTime / callCounter
      consola.info(`${callCounter} request(s) made during SSR in ${totalTime}ms (avg: ${Math.round(avgTime)}ms/request)`)
    }
    else {
      consola.info('There was no request sent.')
    }
    consola.start('End')
  })
})
