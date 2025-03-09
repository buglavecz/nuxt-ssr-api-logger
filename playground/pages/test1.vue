<script setup>
// const { data } = useAsyncData('users', () => $fetch('https://fake-json-api.mock.beeceptor.com/users'))
const { data } = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
const { data: data2 } = await useFetch('https://fake-json-api.mock.beeceptor.com/companies/1')
</script>

<template>
  <div>
    <nuxt-link to="/">index</nuxt-link>
    <br>
    <br>
    data:
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped>

</style>
