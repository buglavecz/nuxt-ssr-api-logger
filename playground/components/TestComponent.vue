<script setup lang="ts">
const { data } = await useFetch('https://fake-json-api.mock.beeceptor.com/companies/2')
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped>

</style>
