<script setup>
const props = defineProps(['title'])
</script>

<template>
  <div class="d-inline-block">
    <h5>{{ title }}</h5>
    <hr class="border border-dark border-2 rounded-pill"/>
  </div>
</template>