<script setup>
const res = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
</script>

<template>
  <div>
    index page
    <pre>{{ res }}</pre>
  </div>
</template>

<style scoped>

</style>
