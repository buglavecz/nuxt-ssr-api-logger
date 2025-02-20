import { consola } from 'consola'
import { BatchInterceptor } from '@mswjs/interceptors'
import nodeInterceptors from '@mswjs/interceptors/lib/presets/node'
import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitroApp) => {
  const interceptor = new BatchInterceptor({
    name: 'api-call-logger',
    interceptors: nodeInterceptors,
  })
  interceptor.apply()

  consola.start('Start call...')
  interceptor.on('request', ({ url }) => {
    // console.log(request.method, request.url)
    // consola.info(`SSR API request: ${request.url}, ${new Date().toISOString()}`)
  })

  nitroApp.hooks.hook('render:response', () => {
    // consola.info('hello')
    interceptor.dispose()
  })
})
