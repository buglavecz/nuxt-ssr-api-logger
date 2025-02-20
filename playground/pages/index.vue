<script setup>
let res, res2 = null
if (import.meta.server) {
  res = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
  res2 = await fetch('https://fake-json-api.mock.beeceptor.com/users')
  console.log(res)
  console.log(res2)
}
</script>

<template>
  <div>
    index page
    <pre>{{ res }}</pre>
    <pre>{{ res2 }}</pre>
  </div>
</template>

<style scoped>

</style>
