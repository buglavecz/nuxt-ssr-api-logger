<script setup>
/*
let res = null
if (import.meta.server) {
  res = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
  // res2 = await fetch('https://fake-json-api.mock.beeceptor.com/users')
  // console.log(res)
  // console.log(res2)
}
*/

const { data } = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
</script>

<template>
  <div>
    <nuxt-link to="/">index</nuxt-link>
    <br>
    <br>

    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped>

</style>
