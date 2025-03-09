<script setup>
// const { data } = useAsyncData('users', () => $fetch('https://fake-json-api.mock.beeceptor.com/users'))
const { data: data1 } = await useFetch('https://fake-json-api.mock.beeceptor.com/users')
const { data: data2 } = await useFetch('https://fake-json-api.mock.beeceptor.com/companies/1')
</script>

<template>
  <div>
    data 1:
    <pre>{{ data1 }}</pre>
    data 2:
    <pre>{{ data2 }}</pre>
  </div>
</template>
