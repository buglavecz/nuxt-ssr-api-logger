import { defu } from 'defu'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  forceShowInProduction: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'ssrApiLogger',
    compatibility: {
      nuxt: '>=3.16.0',
    },
  },
  defaults: {
    forceShowInProduction: false,
  },
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const moduleOptions = defu(
      _nuxt.options.runtimeConfig.public.ssrApiLogger,
      _options,
    )
    _nuxt.options.runtimeConfig.public.ssrApiLogger = moduleOptions

    addPlugin({ src: resolve('./runtime/plugin'), mode: 'server' })
  },
})
