<script setup>
let res = null
if (import.meta.server) {
  res = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
  // res2 = await fetch('https://fake-json-api.mock.beeceptor.com/users')
  console.log(res)
  // console.log(res2)
}
</script>

<template>
  <div>
    index page
    <pre>{{ res }}</pre>
  </div>
</template>

<style scoped>

</style>
